'use strict';
const axios = require('axios');
let mailCatcherAPI = 'http://localhost:1080/messages';

async function receiveEmails() {
	if (process.env.CI) {
		mailCatcherAPI = process.env.MAILCATCH_URL;
	}

	let res = await axios.get(mailCatcherAPI);
	let data = res.data;
	return data;
}

async function deleteAllEmails() {
	let res = await axios.delete(mailCatcherAPI);
	return res.status;
}

module.exports = {
	receiveEmails,
	deleteAllEmails,
};
