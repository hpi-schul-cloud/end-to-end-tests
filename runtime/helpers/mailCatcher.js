'use strict';
const axios = require('axios');
let mailCatcherAPI = 'http://localhost:1080/messages';
const waitHelpers = require('./waitHelpers.js');
const message = 'http://localhost:1080/messages/1.plain';

async function receiveEmails(url) {
	let res = await axios.get(url);
	let data = res.data;
	return data;
}

async function deleteAllEmails() {
	let res = await axios.delete(mailCatcherAPI);
	return res.status;
}

async function isEmailReceived(msg, deleteEmails) {
	await waitHelpers.waitUntilEmailIsSent();
	let email = await receiveEmails(mailCatcherAPI);
	let recipientEmails = [];

	for (let i = 0; i < email.length; i++) {
		recipientEmails += email[i]['recipients'];
	}
	expect(recipientEmails, 'Received Emails').to.include(msg);
	if (deleteEmails) await deleteAllEmails();
}

async function getEmailPin() {
	await waitHelpers.waitUntilEmailIsSent();
	let text = await receiveEmails(message);

	const pin = await text.match(/(?!\s|digit-)([0-9]{4})(?=-digit|\.|\?|\s)/gm);
	await deleteAllEmails();
	return pin[0];
}

async function isPasswordSent() {
	await waitHelpers.waitUntilEmailIsSent();
	let text = await receiveEmails(message);
	const msg = 'Email does not include password';
	await deleteAllEmails();
	return expect(text, msg).to.include('passwort');
}

async function getEmailLink() {
	let text = await receiveEmails(message);

	const link = await text.match(
		/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
	);
	await deleteAllEmails();
	return link[0];
}

module.exports = {
	isEmailReceived,
	isPasswordSent,
	getEmailLink,
	deleteAllEmails,
	getEmailPin,
};
