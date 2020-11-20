'use strict';
const axios = require('axios');
let mailCatcherAPI = 'http://localhost:1080/messages';
const waitHelpers = require('./waitHelpers.js');

async function receiveEmails() {
	let res = await axios.get(mailCatcherAPI)
		.then(() => res.data)
		.catch(() => [])
}

async function deleteAllEmails() {
	let res = await axios.delete(mailCatcherAPI);
	return res.status;
}

async function isEmailReceived(msg, expectedResult) {
	await deleteAllEmails();
	await waitHelpers.waitUntilEmailIsSent();
	let email = await receiveEmails();
	let recipientEmails = [];

	for (let i = 0; i < email.length; i++) {
		recipientEmails += email[i]['recipients'];
	}
	expectedResult
		? expect(recipientEmails, 'Received Emails').to.include(msg)
		: expect(recipientEmails, 'Received Emails').to.not.include(msg);

	await deleteAllEmails();
}

module.exports = {
	isEmailReceived,
};
