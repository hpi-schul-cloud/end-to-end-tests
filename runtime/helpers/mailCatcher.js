'use strict';
const axios = require('axios');
let mailCatcherAPI = 'http://localhost:1080/messages';
const waitHelpers = require('./waitHelpers.js');

async function receiveEmails() {
	let res = await axios.get(mailCatcherAPI);
	return res.data;
}

async function deleteAllEmails() {
	let res = await axios.delete(mailCatcherAPI);
	return res.status;
}

async function isEmailReceived(userEmail, expectedResult) {
	await deleteAllEmails();
	await waitHelpers.waitUntilEmailIsSent();
	let email = await receiveEmails();
	let recipientEmails = [];

	for (let i = 0; i < email.length; i++) {
		recipientEmails += email[i]['recipients'];
	}
	expectedResult
		? expect(recipientEmails).to.include(userEmail)
		: expect(recipientEmails).to.not.include(userEmail);

	await deleteAllEmails();
}

module.exports = {
	isEmailReceived,
};
