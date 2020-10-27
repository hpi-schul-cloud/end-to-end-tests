'use strict';
const axios = require('axios');
let mailCatcherAPI = 'http://localhost:1080/messages';
const waitHelpers = require('./waitHelpers.js');

async function receiveEmails() {
	let res = await axios.get(mailCatcherAPI);
	let data = res.data;
	return data;
}

async function deleteAllEmails() {
	let res = await axios.delete(mailCatcherAPI);
	return res.status;
}

async function isEmailReceived(msg) {
	await waitHelpers.waitUntilEmailIsSent();
	let email = await receiveEmails();

	let recipientEmails = [];

	for (let i = 0; i < email.length; i++) {
		recipientEmails += email[i]['recipients'];
	}

	expect(recipientEmails, 'Received Emails').to.include(msg);

	await deleteAllEmails();
}

module.exports = {
	receiveEmails,
	deleteAllEmails,
	isEmailReceived,
};
