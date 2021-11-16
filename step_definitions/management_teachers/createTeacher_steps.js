'use strict';

const navigationLeftPanel = require('../../page-objects/pages/NavigationLeftPage');
const manageTeachersPage = require('../../page-objects/pages/managementPages/ManageTeacherPage.js');

//WHEN
When(/^.* goes to teachers management$/, function () {
	return navigationLeftPanel.clickNavItemManageTeachers();
});

When(/^.* goes to teacher creation form$/, async function () {
	return manageTeachersPage.goToCreateForm();
});

When(
	/^.*set teacher firstname '([^']*)', lastname '([^']*)', email '([^']*)'$/,
	function (firstname, secondname, email) {
		return manageTeachersPage.createNewTeacher(firstname, secondname, email, null, false);
	}
);

//THEN
Then(/^.*teacher with email '([^']*)' is visible on the list$/, function (email) {
	return manageTeachersPage.isTeacherVisible(email, true);
});
