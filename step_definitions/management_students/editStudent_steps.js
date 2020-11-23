'use strict';

const manageStudents = require('../../page-objects/pages/managementPages/ManageStudentsPage');
const studentEditPage = require('../../page-objects/pages/managementPages/ManageStudentEditDeletePage');
const mailCatcher = require('../../runtime/helpers/mailCatcher.js');

//WHEN
When(/^.* clicks Edit-student button$/, async function () {
	await manageStudents.clickEditStudentBtn();
});

When(/^.* clicks Edit-student with '([^']*)' button$/, async function (email) {
	await manageStudents.clickEditStudentByMailBtn(email);
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

//THEN
Then(/^.* student firstname '([^']*)' is visible on the list$/, async function (firstname) {
	await manageStudents.isStudentFirstnameOnTheList(firstname);
});

Then(/^.* clicks Send-links-to-students'-e-mail-addresses button$/, async function () {
	await manageStudents.clickSendConsentFormEmailsButton();
});

Then(/^.* student lastname '([^']*)' is visible on the list$/, async function (lastname) {
	await manageStudents.isStudentLastnameOnTheList(lastname);
});

Then(/^.* student email '([^']*)' is is visible on the list$/, async function (emailAddress) {
	await manageStudents.isStudentEmailOnTheList(emailAddress);
});

Then(/^.* student birthdate is '([^']*)'$/, async function (birthdate) {
	await studentEditPage.isStudentBirthdayCorrect(birthdate);
});

Then(/^email is sent to '([^']*)' students without a full declaration of consent$/, async function (studentEMail) {
	await mailCatcher.isEmailReceived(studentEMail, true);
});
