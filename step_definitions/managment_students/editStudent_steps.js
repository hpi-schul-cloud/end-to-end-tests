'use strict';

const manageStudents = require('../../page-objects/pages/managmentPages/ManageStudentsPage');
const studentEditPage = require('../../page-objects/pages/managmentPages/ManageStudentEditDeletePage');

//WHEN
When(/^.* clicks Edit-student button$/, async function () {
	await manageStudents.clickEditStudentBtn();
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
Then(/^.* student lastname '([^']*)' is visible on the list$/, async function (lastname) {
	await manageStudents.isStudentLastnameOnTheList(lastname);
});
Then(/^.* student email '([^']*)' is is visible on the list$/, async function (emailAddress) {
	await manageStudents.isStudentEmailOnTheList(emailAddress);
});

Then(/^.* student birthdate is '([^']*)'$/, async function (birthdate) {
	await studentEditPage.isStudentBirthdayCorrect(birthdate);
});