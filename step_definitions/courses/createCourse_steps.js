'use strict';

const courseListPage = require('../../page-objects/pages/coursePages/CRSSCourseListPage');
const addCoursePage = require('../../page-objects/pages/coursePages/CRSSAddCoursePage');
const roomsOverviewPage = require('../../page-objects/pages/RoomsOverviewPage');
const leftNavigationBar = require('../../page-objects/pages/NavigationLeftPage');

//WHEN
When(/^.* creates course with name '([^']*)'$/, function (coursename) {
	return addCoursePage.createCourse(coursename);
});

When(/^.* creates course with name '([^']*)' and student '([^']*)'$/, function (coursename, studentNameList) {
	return addCoursePage.createCourseWithStudent(coursename, studentNameList);
});

When(/^.* goes to rooms-overview$/, function () {
	return leftNavigationBar.loadNavItemRoomsOverview();
	/* follow-up: change to: return roomsOverviewPage.goToRoomsOverview()*/ 
});


When(/^.* clicks Create-new-course button$/, function () {
	return courseListPage.clickCreateCourseBtn();
});

When(/^.* clicks Next-section button$/, async function () {
	await addCoursePage.goToNextSection();
});

When(/^.* clicks Go-to-course-list button$/, async function () {
	await addCoursePage.clickGoToCourseListBtn();
});

When(/^.* clicks on members icon in course with name '([^']*)'$/, async function (courseName) {
	await courseListPage.clickPupilIconInCourseInSection(courseName, courseListPage.section.activeCourses);
});

When(/^.* chooses course with name '([^']*)'$/, function (courseName) {
	return roomsOverviewPage.clickOnTheElementWithName(courseName);
});

When(/^.* chooses himself as a Course teacher$/, async function () {
	return addCoursePage.setCurrentUserAsTeacher();
});

When(/^.* enters course name '([^']*)' into new course form$/, function (courseName) {
	return addCoursePage.setCourseName(courseName);
});

When(/^.* chooses course colour '([^']*)'$/, function (courseColour) {
	return addCoursePage.setColour(courseColour);
});

When(/^.* closes member modal window$/, async function () {
	await courseListPage.closeMemberModal();
});

//THEN
Then(/^.* buttons: Create-new-course, Go-to-course-list-page are visible$/, async function () {
	await addCoursePage.areFinalButtonsVisible();
});

Then(/^.* buttons: Import-course, Create-new-course are visible$/, function () {
	return courseListPage.areImportAndCreateCourseBtnsVisible();
});

Then(/^.* course with name '([^']*)' is visible on the list$/, async function (courseName) {
	return  roomsOverviewPage.isCourseNameDisplayedOnTheList(courseName, true);
});

Then(/^.* course with name '([^']*)' is not visible on the list$/, async function (courseName) {
	return roomsOverviewPage.isCourseNameDisplayedOnTheList(courseName, false);
});

Then(/^.* course with name '([^']*)' contains number of members '([^']*)'$/, async function (courseName, membersCount) {
	await courseListPage.goToCourses();
	await courseListPage.isCountOfCourseMembers(courseName, membersCount, courseListPage.section.activeCourses);
});

Then(/^.* course members are visible on the list '([^']*)'$/, async function (listOfStudentNames) {
	await courseListPage.areMembersOnTheListInCourseForSection(listOfStudentNames);
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

Then(/^.* '([^']*)' section can not be opened$/, async function (sectionNumber) {
	await addCoursePage.isSectionNotDisplayed(sectionNumber);
});

Then(/^.* '([^']*)' section is opened$/, async function (sectionNumber) {
	await addCoursePage.isSectionDisplayed(sectionNumber);
});

Then(/^.* color of the course with name '([^']*)' is '([^\']*)' [^\']*$/, async function (courseName, courseColour) {
	await roomsOverviewPage.isCourseColour(courseName, courseColour);
});

Then(/^.* his.hers name is entered by default in teachers' field$/, async function () {
	await addCoursePage.isTeachersNameSetByDefault();
});
