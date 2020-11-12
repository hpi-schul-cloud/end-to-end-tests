'use strict';

const administerStudentsPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage.js');
const mailCatcher = require('../runtime/helpers/mailCatcher.js');

When(/^. goes to students administration$/, async function () {
	return administerStudentsPage.goToAdministrateStudents();
});

Then(/^.* clicks Send-links-to-students'-e-mail-addresses button$/, async function () {
	await administerStudentsPage.clickSendConsentFormEmailsButton();
});

Then(/^email is sent to '([^']*)' students without a full declaration of consent$/, async function (studentEMail) {
	await mailCatcher.isEmailReceived(studentEMail);
});
