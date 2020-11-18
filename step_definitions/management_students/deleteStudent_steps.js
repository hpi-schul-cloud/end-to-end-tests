'use strict';

const studentEditPage = require('../../page-objects/pages/managementPages/ManageStudentEditDeletePage');

When(/^.* clicks Delete-user button$/, async function () {
	await studentEditPage.clickDeleteBtn();
});

When(/^.* clicks Delete-user button inside popup$/, async function () {
	await studentEditPage.clickDeleteInModal();
});

