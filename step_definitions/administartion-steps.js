'use strict';

const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');
const studentAdministration = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage');

When(/^admin goes to students administration$/, function () {
	return ADMNSTRTNAdministrationOverviewPage.clickAdministrateStudents();
});

When(/^.*set student firstname '([^']*)', lastname '([^']*)', email '([^']*)'$/, function (firstname,secondname,email) {
	return studentAdministration.createNewPupil(firstname, secondname, email);
});

Then(/^the admin should see new pupil with email '([^']*)' among his pupils$/, function (email) {
	return studentAdministration.isStudentEmailOnTheList(email);
});
Then(/^.* manually submits a consent '([^']*)'$/, function (email) {
	return studentAdministration.submitConsent(email);
});
Then(/^new pupil '([^']*)' can log in with default password$/, async function (email) {
	await studentAdministration.studentLogsInWithDefaultPassword(email);
});
