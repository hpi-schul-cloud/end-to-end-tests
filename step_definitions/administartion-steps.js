'use strict';

let administration = require('../page-objects/administration');
//let teacherLogin = require('../page-objects/teacherLogin');
const elementHelpers = require('../runtime/helpers/elementHelpers.js')
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const loginData = require('../shared-objects/loginData');
const Admin = require('../shared-objects/administrationData');

Given(/^this admin logs in successfully$/, async function () {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(loginData.defaultAdminUsername, loginData.defaultAdminPassword)
});

When(/^admin goes to administration$/, function () {
	//return helpers.loadPage(loginData.urlAdministration, 20);

	let url = Admin.urlAdministration;
	return elementHelpers.loadPage(url, 20);
});

When(/^an admin puts in (.*) and (.*) and (.*) of the new pupil$/, function (firstname, secondname, email) {
	return administration.createNewPupil(firstname, secondname, email)
});
Then(/^the admin should see new pupil with email (.*) among his pupils$/, function (email) {
	return administration.verify(email);
});
Then(/^.* manually submits a consent (.*)$/, function (e_mail) {
	return administration.submitConsent(e_mail);
});
Then(/^new pupil can log in$/, function () {
	return administration.newPupilLogsIn();
});
Then(/^new pupil accepts data protection policy and sets new password for the profile$/, function () {
	return administration.pupilAcceptsDataProtection();
});

Then(/^save created password$/, function () {
	//To do
});
Then(/^student logs in with (.*) and created password$/, function () {
	//To do
});