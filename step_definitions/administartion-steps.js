'use strict';

const createStudent = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage.js');
const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const loginData = require('../shared-objects/loginData');
const navigationTopPage = require('../page-objects/pages/NavigationTopPage');


Given(/^this admin logs in successfully$/, async function () {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(loginData.defaultAdminUsername, loginData.defaultAdminPassword)
});

When(/^admin goes to student administration$/, function () {

	return createStudent.goToAdministrateStudents();

});

When(/^an admin puts in (.*) and (.*) and (.*) of the new pupil$/, function (firstname, secondname, email) {
	return createStudent.createNewPupil(firstname, secondname, email);
});
Then(/^the admin should see new pupil with email (.*) among his pupils$/, function (email) {
	return createStudent.verifyStudentWasCreated(email);
});
Then(/^.* manually submits a consent (.*)$/, async function (e_mail) {
	await createStudent.asAdminSubmitConsentForAStudentAndGetDefaultPsswrd(e_mail);	
});

Then(/^new pupil (.*) can log in$/, async function (email) {
	let defaultPassword = createStudent.oldPassword;
	await startPage.clickLoginBtn();
	await loginPage.performLogin(email, defaultPassword)
});
Then(/^new pupil accepts data protection policy and sets new password for the profile$/, function () {
	return loginPage.firstLoginStudent(newPassword);
});

Then(/^save created password$/, function () {
	//To do
});
Then(/^student logs in with (.*) and created password$/, function () {
	//To do
});
