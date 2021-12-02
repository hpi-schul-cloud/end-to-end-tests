'use strict';

const manageTeachers = require('../../page-objects/pages/managementPages/ManageTeachersPage');

//WHEN
When(/^.* clicks Edit-teacher with '([^']*)' button$/, async function (email) {
	await manageTeachers.clickEditTeacherByMailBtn(email);
});

When(/^.* changes teacher firstname to '([^']*)'$/, async function (firstName) {
	await manageTeachers.setTeacherFirstName(firstName);
});

When(/^.* changes teacher lastname to '([^']*)'$/, async function (lastName) {
	await manageTeachers.setTeacherLastName(lastName);
});

When(/^.* changes teacher email to '([^']*)'$/, async function (email) {
	await manageTeachers.setTeacherEmail(email);
});

//THEN
Then(/^.* teacher firstname '([^']*)' is visible on the list$/, async function (firstname) {
	await manageTeachers.isTeacherFirstnameOnTheList(firstname);
});

Then(/^.* teacher lastname '([^']*)' is visible on the list$/, async function (lastname) {
	await manageTeachers.isTeacherLastnameOnTheList(lastname);
});

Then(/^.* teacher email '([^']*)' is visible on the list$/, async function (emailAddress) {
	await manageTeachers.isTeacherEmailOnTheList(emailAddress);
});
