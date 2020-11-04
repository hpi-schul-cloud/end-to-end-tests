'use strict';

const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');
const studentAdministration = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage');
const studentEditPage = require('../page-objects/pages/administrationPages/ADMNSTRTNEditDeleteStudentPage');

let firstname, lastname, emailAddress;

When(/^admin goes to students administration$/, function () {
	return ADMNSTRTNAdministrationOverviewPage.clickAdministrateStudents();
});

When(/^.*set student firstname '([^']*)', lastname '([^']*)', email '([^']*)'$/, function (
	firstname,
	secondname,
	email
) {
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

/**  Edit a student */
Then(/^.* clicks edit-student-button$/, async function () {
	await studentAdministration.clickEditStudentBtn();
});

Then(/^new page with page title Schüler bearbeiten opens$/, async function () {
	await studentEditPage.getPageTitle();
});

Then(/^.* clicks Abbrechen button to open popup$/, async function () {
	await studentEditPage.clickCancelButton();
});

Then(/^.* clicks Abbrechen inside popup$/, async function () {
	await studentEditPage.chooseOptionInCancelModal(false);
});

Then(/^.* clicks Änderung verwerfen inside popup$/, async function () {
	await studentEditPage.chooseOptionInCancelModal(true);
});

Then(/^.*returns to administration page$/, async function () {
	await studentAdministration.getPageTitle('Administration: Schüler');
});

When(/^.* changes firstname to '([^']*)'$/, async function (firstName) {
	firstname = firstName;
	await studentEditPage.setStudentFirstName(firstName);
});

Then(/^.* changes lastname to '([^']*)'$/, async function (lastName) {
	lastname = lastName;
	await studentEditPage.setStudentLastName(lastName);
});

Then(/^.* changes email to '([^']*)'$/, async function (email) {
	emailAddress = email;
	await studentEditPage.setStudentEmail(email);
});

Then(/^.* changes birthdate to '([^']*)'$/, async function (birthdate) {
	await studentEditPage.setStudentBirthday(birthdate);
});

When(/^.* validates that changes have been saved$/, async function () {
	await studentAdministration.isStudentEmailOnTheList(emailAddress);
	await studentAdministration.isStudentFirstnameOnTheList(firstname);
	await studentAdministration.isStudentLastnameOnTheList(lastname);
});

Then(/^birthdate is '([^']*)'$/, async function (birthdate) {
	await studentEditPage.isStudentBirthdayCorrect(birthdate);
});
