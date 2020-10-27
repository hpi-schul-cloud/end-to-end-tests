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
	await mailCatcher.isEmailReceived('<waldemar.wunderlich@schul-cloud.org>');
});
