'use strict';

const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');
const studentAdministration = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage');
const studentEditPage = require('../page-objects/pages/administrationPages/ADMNSTRTNEditDeleteStudentPage');

When(/^.* goes to students administration$/, function () {
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
When(/^.*manually submits consent for user with e-mail '([^']*)', thus generates a random password for him$/, function (
	email
) {
	return studentAdministration.submitConsent(email);
});

/**  Edit a student */
When(/^.* clicks Edit-student button$/, async function () {
	await studentAdministration.clickEditStudentBtn();
});

When(/^.* clicks Delete-user button$/, async function () {
	await studentEditPage.clickDeleteUserBtn();
});

When(/^.* clicks Delete button$/, async function () {
	await studentEditPage.clickDeleteBtn();
});

When(/^.* clicks edit student Cancel button$/, async function () {
	await studentEditPage.clickCancelButton();
});

When(/^.* clicks edit student Cancel button inside popup$/, async function () {
	await studentEditPage.clickCancelInModal();
});

When(/^.* clicks edit student Discard-change button inside popup$/, async function () {
	await studentEditPage.clickDiscardChangesInModal();
});

When(/^.* changes student firstname to '([^']*)'$/, async function (firstName) {
	await studentEditPage.setStudentFirstName(firstName);
});

When(/^.* changes student lastname to '([^']*)'$/, async function (lastName) {
	await studentEditPage.setStudentLastName(lastName);
});

When(/^.* changes student email to '([^']*)'$/, async function (email) {
	await studentEditPage.setStudentEmail(email);
});

When(/^.* changes student birthdate to '([^']*)'$/, async function (birthdate) {
	await studentEditPage.setStudentBirthday(birthdate);
});

Then(/^.* student firstname '([^']*)' is visible on the list$/, async function (firstname) {
	await studentAdministration.isStudentFirstnameOnTheList(firstname);
});
Then(/^.* student lastname '([^']*)' is visible on the list$/, async function (lastname) {
	await studentAdministration.isStudentLastnameOnTheList(lastname);
});
Then(/^.* student email '([^']*)' is is visible on the list$/, async function (emailAddress) {
	await studentAdministration.isStudentEmailOnTheList(emailAddress);
});

Then(/^.* student birthdate is '([^']*)'$/, async function (birthdate) {
	await studentEditPage.isStudentBirthdayCorrect(birthdate);
});
