'use strict';
const axios = require('axios');
let mailCatcherAPI = "http://localhost:1080/messages;

async function receiveEmails() {
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
