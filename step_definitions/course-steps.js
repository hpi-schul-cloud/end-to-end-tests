'use strict';
const addCourse = require('../page-objects/pages/coursePages/CRSSAddCoursePage');
const courseListPage = require('../page-objects/pages/coursePages/CRSSCourseListPage');
const CRSSEditCopyCoursePage = require('../page-objects/pages/coursePages/CRSSEditCopyCoursePage');
const CRSSGeneralCoursePage = require('../page-objects/pages/coursePages/CRSSGeneralCoursePage');

When(/^.*goes to courses page$/, function () {
	return courseListPage.goToCourses();
});
Then(/^.*buttons: Import-course, Create-new-course are visible$/, function () {
	return courseListPage.areImportAndCreateCourseBtnsVisible();
});

Then(/^.*buttons: Create-new-course, Go-to-course-list-page are visible$/, async function () {
	await addCourse.areFinalButtonsVisible();
});

When(/^.*clicks Create-new-course button$/, function () {
	return courseListPage.clickCreateCourseBtn();
});

When(/^.*chooses himself as a Course teacher$/, async function () {
	return addCourse.setCurrentUserAsTeacher();
});

When(/^.*enters course name '(.*)' into new course form$/, function (courseName) {
	return addCourse.setCourseName(courseName);
});
When(/^.*chooses course colour (.*)$/, function (courseColour) {
	return addCourse.setColour(courseColour);
});
When(/^.*clicks Create-button$/, function () {
	return addCourse.goToNextSection();
});
When(/^.*clicks to preview$/, function () {
	return addCourse.goToNextSection();
});

Then(/^.*course with name '(.*)' is visible on the list$/, async function (courseName) {
	return courseListPage.isCourseVisible(courseName, courseListPage.section.activeCourses, true);
});

Then(/^.*course with name '(.*)' is not visible on the list$/, async function (courseName) {
	return courseListPage.isCourseVisible(courseName, courseListPage.section.activeCourses, false);
});

Then(/^.*course with name (.*) is displayed correctly on the list$/, async function (courseName) {
	await courseListPage.isCourseDisplayedCorrectlyInSection(courseName, courseListPage.section.activeCourses);
});
When(/^.*clicks Next-section button$/, async function () {
	return addCourse.goToNextSection();
});
Then(/^.*the ([0-9]) section can not be opened$/, async function (sectionNumber) {
	await addCourse.isSectionNotDisplayed(sectionNumber);
});

Then(/^.*his name is entered by default in teachers' field$/, async function () {
	await addCourse.isTeachersNameSetByDefault();
});
Then(/^.*course name has not been entered$/, async function () {
	await addCourse.isCourseNameNotEntered();
});

Then(/^.*time span is already set$/, async function () {
	await addCourse.isTimeSpanSet();
});
Then(/^.*supply teacher is not set$/, async function () {
	await addCourse.isTeacherSubstituteNotSet();
});

Then(/^.* ([0-9]) section is opened$/, async function (sectionNumber) {
	await addCourse.isSectionDisplayed(sectionNumber);
});
Then(/^.*no class is set$/, async function () {
	await addCourse.isClassNotSet();
});
Then(/^.*no student is set$/, async function () {
	await addCourse.isStudentNotSet();
});
When(/^.*clicks Create-course-and-continue button'$/, async function () {
	await addCourse.clickCreateCourseAndContinueBtn();
});

Then(/^.*clicks Go-to-course-list$/, async function () {
	await addCourse.clickGoToCourseListBtn();
});

Then(/^.*color of the course (.*) is (\S*).*$/, async function (courseName, courseColour) {
	await courseListPage.isCourseColour(courseName, courseColour, courseListPage.section.activeCourses);
});



Then(/^.*clicks on Course edit$/, async function () {
	await CRSSGeneralCoursePage.clickEditCourse();
});

Then(/^.*changes name of Course (\S*)$/, async function (changeName) {
	await CRSSEditCopyCoursePage.setCourseName(changeName);
});

When(/^.*enters Course description (.*)$/, async function (description) {
	await CRSSEditCopyCoursePage.setCourseDescription(description);
});

Then(/^.*clicks on save changes button$/, async function () {
	await CRSSEditCopyCoursePage.clickSubmitButton();
});

Then(/^.*course name (.*) with description correctly displayed (.*)$/, async function (courseName,expectedDescription) {
	await courseListPage.isCourseDescription(courseName, expectedDescription, courseListPage.section.activeCourses);
});

Then(/^.*course name (.*) with color correctly displayed (.*)$/, async function (courseName, colorCourse) {
	await courseListPage.isCourseColour(courseName, colorCourse, courseListPage.section.activeCourses);
});

Then(/^.*clicks on delete course button$/, async function () {
	await CRSSEditCopyCoursePage.clickDeleteButton();
});

Then(/^.*clicks on delete course button confirmation$/, async function () {
	await CRSSEditCopyCoursePage.clickConfirmDeleteButton();
});
