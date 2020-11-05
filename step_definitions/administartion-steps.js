'use strict';

const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');
const studentAdministration = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage');
const studentEditPage = require('../page-objects/pages/administrationPages/ADMNSTRTNEditDeleteStudentPage');

let firstname, lastname, emailAddress;

When(/^admin goes to students administration$/, function () {
	return ADMNSTRTNAdministrationOverviewPage.goToAdministrateStudents();
});

When(/^.*set student firstname '([^']*)', lastname '([^']*)', email '([^']*)'$/, function (
	firstname,
	secondname,
	email
) {
	return studentAdministration.createNewPupil(firstname, secondname, email);
});

Then(/^.*student with email '([^']*)' is visible on the list$/, function (email) {
	return studentAdministration.isStudentEmailOnTheList(email);
});
Then(/^.*manually submits consent for user with e-mail '([^']*)', thus generates a random password for him$/, function (
	email
) {
	return studentAdministration.submitConsent(email);
});

/**  Edit a student */
Then(/^.* clicks edit-student button$/, async function () {
	await studentAdministration.clickEditStudentBtn();
});

Then(/^.* clicks cancel button$/, async function () {
	await studentEditPage.clickCancelButton();
});

Then(/^.* clicks cancel inside popup$/, async function () {
	await studentEditPage.clickCancelInModal();
});

Then(/^.* clicks discard change inside popup$/, async function () {
	await studentEditPage.clickDiscardChangesInModal();
});

When(/^.* changes student firstname to '([^']*)'$/, async function (firstName) {
	firstname = firstName;
	await studentEditPage.setStudentFirstName(firstName);
});

Then(/^.* changes student lastname to '([^']*)'$/, async function (lastName) {
	lastname = lastName;
	await studentEditPage.setStudentLastName(lastName);
});

Then(/^.* changes student email to '([^']*)'$/, async function (email) {
	emailAddress = email;
	await studentEditPage.setStudentEmail(email);
});

Then(/^.* changes student birthdate to '([^']*)'$/, async function (birthdate) {
	await studentEditPage.setStudentBirthday(birthdate);
});

When(/^.* validates that firstname is edited firstname$/, async function () {
	await studentAdministration.isStudentFirstnameOnTheList(firstname);
});
When(/^.* validates that lastname is edited lastname$/, async function () {
	await studentAdministration.isStudentLastnameOnTheList(lastname);
});
When(/^.* validates that email is edited email$/, async function () {
	await studentAdministration.isStudentEmailOnTheList(emailAddress);
});

Then(/^.* validates that edited birthdate is '([^']*)'$/, async function (birthdate) {
	await studentEditPage.isStudentBirthdayCorrect(birthdate);
});
