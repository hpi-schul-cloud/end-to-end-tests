'use strict';

const manageStudentsPage = require('../../page-objects/pages/managementPages/ManageStudentsPage.js');
const navigationLeftPanel = require('../../page-objects/pages/NavigationLeftPage');
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const mailCatcher = require('../../runtime/helpers/mailCatcher.js');
const registrationPage = require('../../page-objects/pages/generalPagesBeforeLogin/RegistrationPage');
const loginPage = require('../../page-objects/pages/generalPagesBeforeLogin/LoginPage');
let pin, password;

//WHEN
When(/^.* goes to students management$/, async function () {
	return navigationLeftPanel.clickNavItemManageStudents();
});

When(
	/^.*set student firstname '([^']*)', lastname '([^']*)', email '([^']*)', birthday '([^']*)'$/,
	function (firstname, secondname, email, birthday) {
		return manageStudentsPage.createNewPupil(firstname, secondname, email, birthday, true);
	}
);

When(
	/^.*manually submits consent for user with e-mail '([^']*)', thus generates a random password for him$/,
	function (email) {
		return manageStudentsPage.submitConsent(email);
	}
);

When(/^.* goes to student creation form$/, async function () {
	return manageStudentsPage.goToCreateForm();
});

When(
	/^.*set student firstname '([^']*)', lastname '([^']*)', email '([^']*)'$/,
	function (firstname, secondname, email) {
		return manageStudentsPage.createNewPupil(firstname, secondname, email, null, false);
	}
);

//THEN
Then(/^.*student with email '([^']*)' is visible on the list$/, function (email) {
	//return manageStudentsPage.isStudentEmailOnTheList(email);
	return manageStudentsPage.isStudentVisible(email, true);
});

Then(/^.* user with email '([^']*)' is not visible on the list$/, async function (email) {
	return manageStudentsPage.isStudentVisible(email, false);
});

Then(/^all emails are deleted$/, async function () {
	await mailCatcher.deleteAllEmails();
});

Then(/^.* receives email '([^']*)' with registration link$/, async function (email) {
	return mailCatcher.isEmailReceived(`<${email}>`, false, true);
});

Then(/^student clicks on registration link$/, async function () {
	const url = await mailCatcher.getEmailLink();
	try {
		return await elementHelpers.loadPage(url);
	} catch (e) {
		return `${e} + url was ${url}`;
	}
});

Then(/^student goes to next section$/, async function () {
	return registrationPage.goToAgeSelection();
});

Then(/^student selects under 16 checkbox$/, async function () {
	return registrationPage.clickUnder16Btn();
});

Then(
	/^parents set parent firstname '([^']*)', lastname '([^']*)', email '([^']*)'$/,
	async function (parentFirstName, parentLastName, parentEmail) {
		return registrationPage.addParentData(parentFirstName, parentLastName, parentEmail);
	}
);

Then(/^parents accept all$/, async function () {
	return registrationPage.acceptConsent(true);
});

Then(/^student accepts all$/, async function () {
	return registrationPage.acceptConsent(false);
});

Then(/^.* click on send pin code$/, async function () {
	return registrationPage.clickRequestPin();
});

Then(/^.* email receives 4 digit pin code$/, async function () {
	pin = await mailCatcher.getEmailPin();
	return pin;
});

Then(/^.* fills in pin and submits$/, async function () {
	return registrationPage.addPin(pin);
});

Then(/^login data is received$/, async function () {
	return registrationPage.getTitleText();
});

Then(/^student selects over 16 checkbox$/, async function () {
	return registrationPage.clickOver16Btn();
});

Then(/^login password is copied$/, async function () {
	password = await registrationPage.getGeneratedPassword();
});

Then(/^.* clicks login button$/, async function () {
	return registrationPage.clickLoginButton();
});

Then(/^.* performs first login with generated password and email '([^']*)'$/, async function (studentEmail) {
	return loginPage.performLogin(studentEmail, password);
});
