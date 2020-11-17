'use strict';

const manageStudentsPage = require('../../page-objects/pages/managementPages/ManageStudentsPage.js');
const navigationLeftPanel = require('../../page-objects/pages/NavigationLeftPage');

//WHEN
When(/^.* goes to students management$/, async function () {
	return navigationLeftPanel.clickNavItemManageStudents();
});

When(/^.*set student firstname '([^']*)', lastname '([^']*)', email '([^']*)'$/, function (
	firstname,
	secondname,
	email
) {
	return manageStudentsPage.createNewPupil(firstname, secondname, email);
});

When(/^.*manually submits consent for user with e-mail '([^']*)', thus generates a random password for him$/, function (
	email
) {
	return manageStudentsPage.submitConsent(email);
});

//THEN
Then(/^.*student with email '([^']*)' is visible on the list$/, function (email) {
	return manageStudentsPage.isStudentEmailOnTheList(email);
});
