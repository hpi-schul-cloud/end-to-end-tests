'use strict';

const administerStudentsPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage.js');
const mailCatcher = require('../runtime/helpers/mailCatcher.js');
const waitHelpers = require('../runtime/helpers/waitHelpers.js');

When(/^. goes to students administration$/, async function () {
	return administerStudentsPage.clickAdministrateStudents();
});

Then(/^.* clicks the send links to pupil email address button$/, async function () {
	await administerStudentsPage.clickSendConsentFormEmailsButton();
});

Then(/^the email is sent to all students that have not accepted$/, async function () {
	// Timeout because email sending takes a bit
	await waitHelpers.waitUntilEmailIsSent();
	let email = await mailCatcher.receiveEmails();
	const msg = '<waldemar.wunderlich@schul-cloud.org>';
	let recipientEmails = [];
	for (let i = 0; i < email.length; i++) {
		recipientEmails += email[i]['recipients'];
	}
	expect(recipientEmails, 'Received Emails').to.include(msg);

	await mailCatcher.deleteAllEmails();
});
