'use strict';

const manageTeachers = require('../../page-objects/pages/managementPages/ManageTeachersPage');

//WHEN
When(/^.* clicks Edit-teacher with '([^']*)' button$/, async function (email) {
	await manageTeachers.clickEditTeacherByMailBtn(email);
});