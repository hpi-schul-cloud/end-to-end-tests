'use strict';

const manageStudent = require('../../page-objects/pages/managementPages/ManageStudentPage');

When(/^.* clicks Delete-user button$/, async function () {
	await manageStudent.clickDeleteBtn();
});

When(/^.* clicks Delete-user button inside popup$/, async function () {
	await manageStudent.clickDeleteInModal();
});

