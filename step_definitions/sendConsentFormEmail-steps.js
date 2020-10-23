'use strict';

const { expect } = require('chai');
const administerStudentsPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage.js');
const mailCatcher = require('../runtime/helpers/mailCatcher.js');
const waitHelpers = require('../runtime/helpers/waitHelpers.js');

When(/^. goes to students administration$/, async function () {
	return administerStudentsPage.clickAdministrateStudents();
});

When(/^.* clicks the send links to pupil email address button$/, async function () {
	await administerStudentsPage.clickSendConsentFormEmailsButton();
});

Then(/^the email is sent to all students that have not accepted$/, async function () {
	// Timeout because email sending takes a bit
	await waitHelpers.waitUntilEmailIsSent();
	let email = await mailCatcher.receiveEmails();
	const msg = '<waldemar.wunderlich@schul-cloud.org>';
	let recipientEmails = [];
	let timestamps = [];
	let timeNow = new Date();

	for (let i = 0; i < email.length; i++) {
		recipientEmails.push(email[i]['recipients']);
		timestamps.push(email[i]['created_at'].substring(0, 16));
	}

	let isoDate = timeNow.toISOString().substring(0, 16);

	expect(timestamps, 'Timestamp').to.include(isoDate);

	await mailCatcher.deleteAllEmails();
	// Add test case if email was send at HH:MM:59 and time now is HH:MM+1 or HH+1:MM+1
	//console.log(expect(recipientEmails, 'Received Emails').to.include(msg));
});
