'use strict';
const addCoursePage = require('../page-objects/pages/coursePages/CRSSAddCoursePage');
const courseListPage = require('../page-objects/pages/coursePages/CRSSCourseListPage');
const CRSSEditCopyCoursePage = require('../page-objects/pages/coursePages/CRSSEditCopyCoursePage');
const CRSSGeneralCoursePage = require('../page-objects/pages/coursePages/CRSSGeneralCoursePage');

When(/^.* creates course with name '([^']*)'$/, function (coursename) {
	return addCoursePage.createCourse(coursename);
});

When(/^.* creates course with name '([^']*)' and student '([^']*)'$/, function (coursename, studentNameList) {
	return addCoursePage.createCourseWithStudent(coursename, studentNameList);
});

When(/^.* goes to courses page$/, function () {
	return courseListPage.goToCourses();
});

When(/^.* chooses course with name '([^']*)'$/, function (courseName) {
	return courseListPage.clickOnCourseInSection(courseName, courseListPage.section.activeCourses);
});

When(/^.* clicks on members icon in course with name '([^']*)'$/, async function (courseName) {
	await courseListPage.clickPupilIconInCourseInSection(courseName, courseListPage.section.activeCourses);
});

When(/^.* closes member modal window$/, async function () {
	await courseListPage.closeMemberModal();
});

When(/^.* chooses himself as a Course teacher$/, async function () {
	return addCoursePage.setCurrentUserAsTeacher();
});

When(/^.* enters course name '([^']*)' into new course form$/, function (courseName) {
	return addCoursePage.setCourseName(courseName);
});

When(/^.* enters Course description '([^']*)'$/, async function (description) {
	await CRSSEditCopyCoursePage.setNewCourseDescription(description);
});

When(/^.* chooses course colour '([^']*)'$/, function (courseColour) {
	return addCoursePage.setColour(courseColour);
});

When(/^.* clicks Next-section button$/, async function () {
	return addCoursePage.goToNextSection();
});

When(/^.* clicks Create-new-course button$/, function () {
	return courseListPage.clickCreateCourseBtn();
});

When(/^.* clicks Create-course-and-continue button'$/, async function () {
	await addCoursePage.clickCreateCourseAndContinueBtn();
});

When(/^.* clicks Go-to-course-list button$/, async function () {
	await addCoursePage.clickGoToCourseListBtn();
});

When(/^.* clicks on Edit-course button$/, async function () {
	await CRSSGeneralCoursePage.clickEditCourse();
});

When(/^.* clicks on Save-changes in course button$/, async function () {
	await CRSSEditCopyCoursePage.clickSubmitButton();
});

When(/^.* clicks on Delete-course button$/, async function () {
	await CRSSEditCopyCoursePage.clickDeleteButton();
});

When(/^.* clicks on Delete-course-submit button$/, async function () {
	await CRSSEditCopyCoursePage.clickConfirmDeleteButton();
});

When(/^.* changes name of Course '([^']*)'$/, async function (changeName) {
	await CRSSEditCopyCoursePage.setNewCourseName(changeName);
});

Then(/^.* course with name '([^']*)' is visible on the list$/, async function (courseName) {
	return courseListPage.isCourseVisible(courseName, courseListPage.section.activeCourses, true);
});

Then(/^.* course with name '([^']*)' is not visible on the list$/, async function (courseName) {
	return courseListPage.isCourseVisible(courseName, courseListPage.section.activeCourses, false);
});

Then(/^.* course with name '([^']*)' is displayed correctly on the list$/, async function (courseName) {
	await courseListPage.isCourseDisplayedCorrectlyInSection(courseName, courseListPage.section.activeCourses);
});

Then(/^.* '([^']*)' section can not be opened$/, async function (sectionNumber) {
	await addCoursePage.isSectionNotDisplayed(sectionNumber);
});

Then(/^.* '([^']*)' section is opened$/, async function (sectionNumber) {
	await addCoursePage.isSectionDisplayed(sectionNumber);
});

Then(/^.* his.hers name is entered by default in teachers' field$/, async function () {
	await addCoursePage.isTeachersNameSetByDefault();
});

Then(/^.* course name is not set$/, async function () {
	await addCoursePage.isCourseNameNotSet();
});

Then(/^.* time span is already set$/, async function () {
	await addCoursePage.isTimeSpanSet();
});

Then(/^.* supply teacher is not set$/, async function () {
	await addCoursePage.isTeacherSubstituteNotSet();
});

Then(/^.* no class is set$/, async function () {
	await addCoursePage.isClassNotSet();
});

Then(/^.* no student is set$/, async function () {
	await addCoursePage.isStudentNotSet();
});

Then(/^.* color of the course with name '([^']*)' is '([^\']*)' [^\']*$/, async function (courseName, courseColour) {
	await courseListPage.isCourseColour(courseName, courseColour, courseListPage.section.activeCourses);
});

Then(/^.* course name '([^']*)' with description correctly displayed '([^']*)'$/, async function (
	courseName,
	expectedDescription
) {
	await courseListPage.isCourseDescription(courseName, expectedDescription, courseListPage.section.activeCourses);
});

Then(/^.* course name '([^']*)' with color correctly displayed '([^']*)'$/, async function (courseName, colorCourse) {
	await courseListPage.isCourseColour(courseName, colorCourse, courseListPage.section.activeCourses);
});

Then(/^.* course members are visible on the list '([^']*)'$/, async function (listOfStudentNames) {
	await courseListPage.areMembersOnTheListInCourseForSection(listOfStudentNames);
});

Then(/^.* course with name '([^']*)' contains number of members '([^']*)'$/, async function (courseName, membersCount) {
	await courseListPage.goToCourses();
	await courseListPage.isCountOfCourseMembers(courseName, membersCount, courseListPage.section.activeCourses);
});

Then(/^.* amount of courses with name '([^']*)' is '([^']*)'$/, async function (courseName, coursesCount) {
	return courseListPage.isCountOfCoursesWithNameOnList(courseName,coursesCount,courseListPage.section.activeCourses);
});

Then(/^.* buttons: Import-course, Create-new-course are visible$/, function () {
	return courseListPage.areImportAndCreateCourseBtnsVisible();
});

Then(/^.* buttons: Create-new-course, Go-to-course-list-page are visible$/, async function () {
	await addCoursePage.areFinalButtonsVisible();
});
