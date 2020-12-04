'use strict';

const CRSSEditCopyCoursePage = require('../../page-objects/pages/coursePages/CRSSEditCopyCoursePage');
const CRSSGeneralCoursePage = require('../../page-objects/pages/coursePages/CRSSGeneralCoursePage');
const courseListPage = require('../../page-objects/pages/coursePages/CRSSCourseListPage');

//WHEN
When(/^.* clicks on Edit-course button$/, async function () {
	await CRSSGeneralCoursePage.clickEditCourse();
});

When(/^.* clicks on Save-changes in course button$/, async function () {
	await CRSSEditCopyCoursePage.clickSubmitButton();
});

When(/^.* changes name of Course '([^']*)'$/, async function (changeName) {
	await CRSSEditCopyCoursePage.setNewCourseName(changeName);
});

When(/^.* changes course description '([^']*)'$/, async function (description) {
	await CRSSEditCopyCoursePage.setNewCourseDescription(description);
});

//THEN
Then(/^.* course name '([^']*)' with description correctly displayed '([^']*)'$/, async function (
	courseName,
	expectedDescription
) {
	await courseListPage.isCourseDescription(courseName, expectedDescription, courseListPage.section.activeCourses);
});

Then(/^.* course name '([^']*)' with color correctly displayed '([^']*)'$/, async function (courseName, colourCourse) {
	await courseListPage.isCourseColour(courseName, colourCourse, courseListPage.section.activeCourses);
});
