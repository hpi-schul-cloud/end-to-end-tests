'use strict';

const manageClassesPage = require('../../page-objects/pages/managementPages/ManageClassesPage');

Then(/^.* should see that teacher name '([^']*)' is not assigned anymore$/, async function (teacherName) {
	await manageClassesPage.isTeacherAssigned(teacherName);
});
