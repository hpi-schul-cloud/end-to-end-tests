'use strict';

const navigationLeftPanel = require('../../page-objects/pages/NavigationLeftPage');
const manageCourses = require('../../page-objects/pages/managementPages/ManageCoursesPage');
const manageClassesPage = require('../../page-objects/pages/managementPages/ManageClassesPage');
const editCopyCoursePage = require('../../page-objects/pages/coursePages/CRSSEditCopyCoursePage');

//WHEN
When(/^.* goes to course management$/, function () {
	return navigationLeftPanel.clickNavItemManageCourses();
});

When(/^.* adds another teacher with '([^']*)' to course$/, async function (teacherUsername) {
	await manageCourses.setTeacher(teacherUsername);
});

When(/^.* clicks Edit-course with '([^']*)' button$/, async function (courseName) {
	await manageCourses.clickEditCourseByNameBtn(courseName);
});

//THEN
Then(/^.* course with '([^']*)' has teachers with name '([^']*)'$/, async function (courseName, teacherName) {
	return manageCourses.areTeacherNamesVisible(courseName, teacherName);
});

Then(/^.* class with '([^']*)' has no teachers$/, async function (className) {
	return manageClassesPage.areTeacherNamesEmpty(className);
});

Then(/^.* can not see deleted teacher with name '([^']*)' on the list of teachers$/, async function (teacherName) {
	return editCopyCoursePage.isTeacherVisible(teacherName, false);
});

Then(/^.* should see that teacher name '([^']*)' is not assigned anymore$/, async function (teacherName) {
	await manageClassesPage.isTeacherAssigned(teacherName);
});
