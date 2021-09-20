'use strict';

const manageStudents = require('../../page-objects/pages/managementPages/ManageStudentsPage');
const manageStudent = require('../../page-objects/pages/managementPages/ManageStudentPage');
const mailCatcher = require('../../runtime/helpers/mailCatcher.js');
const { waitUntilPageLoads } = require('../../runtime/helpers/waitHelpers');

//WHEN
When(/^.* clicks Edit-student button$/, async function () {
	await manageStudents.clickEditStudentBtn();
});

Then(/^.* clicks Send-links-to-students'-e-mail-addresses button$/, async function () {
	await waitUntilPageLoads();
	await manageStudents.clickSendConsentFormEmailsButton();
});

When(/^.* clicks Edit-student with '([^']*)' button$/, async function (email) {
	await manageStudents.clickEditStudentByMailBtn(email);
});

When(/^.* changes student firstname to '([^']*)'$/, async function (firstName) {
	await manageStudent.setStudentFirstName(firstName);
});

When(/^.* changes student lastname to '([^']*)'$/, async function (lastName) {
	await manageStudent.setStudentLastName(lastName);
});

When(/^.* changes student email to '([^']*)'$/, async function (email) {
	await manageStudent.setStudentEmail(email);
});

When(/^.* changes student birthdate to '([^']*)'$/, async function (birthdate) {
	await manageStudent.setStudentBirthday(birthdate);
});

//THEN
Then(/^.* student firstname '([^']*)' is visible on the list$/, async function (firstname) {
	await manageStudents.isStudentFirstnameOnTheList(firstname);
});

Then(/^.* student lastname '([^']*)' is visible on the list$/, async function (lastname) {
	await manageStudents.isStudentLastnameOnTheList(lastname);
});

Then(/^.* student email '([^']*)' is is visible on the list$/, async function (emailAddress) {
	await manageStudents.isStudentEmailOnTheList(emailAddress);
});

Then(/^.* student birthdate is '([^']*)'$/, async function (birthdate) {
	await manageStudent.isStudentBirthdayCorrect(birthdate);
});

Then(/^email is sent to '([^']*)' students without a full declaration of consent$/, async function (studentEMail) {
	await mailCatcher.isEmailReceived(studentEMail, true, true);
});
