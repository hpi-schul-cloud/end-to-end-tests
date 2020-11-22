'use strict';

const courseListPage = require('../../page-objects/pages/coursePages/CRSSCourseListPage');

When(/^.*enters course name '([^']*)' into search field$/, async function (courseName) {
	return courseListPage.setCourseNameIntoSearchInputField(courseName);
});

Then(/^.* amount of courses with name '([^']*)' is '([^']*)'$/, async function (courseName, coursesCount) {
	return courseListPage.isCountOfCoursesWithNameOnList(courseName,coursesCount,courseListPage.section.activeCourses);
});