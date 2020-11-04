'use strict';

const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');
const studentAdministration = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage');

When(/^admin goes to students administration$/, function () {
	return ADMNSTRTNAdministrationOverviewPage.goToAdministrateStudents();
});

When(/^.*set student firstname '([^']*)', lastname '([^']*)', email '([^']*)'$/, function (firstname, lastname, email) {
	return studentAdministration.createNewPupil(firstname, lastname, email);
});

Then(/^.*student with email '([^']*)' is visible on the list$/, function (email) {
	return studentAdministration.isStudentEmailOnTheList(email);
});

Then(/^.*manually submits consent for user with e-mail '([^']*)', thus generates a random password for him$/, function (email) {
	return studentAdministration.submitConsent(email);
});
