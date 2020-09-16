'use strict';
const addCourse = require("../page-objects/pages/coursePages/CRSSAddCoursePage");
const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");

When(/^.*goes to courses page$/, function () {
	return courseListPage.goToCourses();
});
Then(/^.*buttons: Import-course, Create-new-course are visible$/, function () {
	return courseListPage.importAndCreateCourseBtnsAreVisible();
});

Then(
	/^.*buttons: Create-new-course, Go-to-course-list-page are visible$/,
	async function () {
		await addCourse.finalButtonsAreVisible();
	}
);

When(/^.*clicks Create-new-course button$/, function () {
	return courseListPage.clickCreateCourseBtn();
});

When(/^.*enters course name (.*) into new course form$/, function (courseName) {
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

Then(/^.*course with name (.*) is visible on the list$/, async function (
	courseName
) {
	return courseListPage.isCourseOnList(courseName);
});

Then(
	/^.*course with name (.*) is displayed correctly on the list$/,
	async function (courseName) {
		await courseListPage.courseIsDisplayedCorrectly(courseName);
	}
);
When(/^.*clicks Next-section button$/, async function () {
	return addCourse.goToNextSection();
});
Then(/^.*the ([0-9]) section can not be opened$/, async function (
	sectionNumber
) {
	await addCourse.sectionIsNotDisplayed(sectionNumber);
});
Then(
	/^.*his name is entered by default in teachers' field$/,
	async function () {
		await addCourse.teachersNameisSetByDefault();
	}
);
Then(/^.*course name has not been entered$/, async function () {
	await addCourse.courseNameIsNotEntered();
});

Then(/^.*time span is already set$/, async function () {
	await addCourse.timeSpanIsSet();
});
Then(/^.*supply teacher is not set$/, async function () {
	await addCourse.noTeacherSubstituteIsSet();
});

Then(/^.* ([0-9]) section is opened$/, async function (sectionNumber) {
	await addCourse.sectionIsDisplayed(sectionNumber);
});
Then(/^.*no class is set$/, async function () {
	await addCourse.noClassIsSet();
});
Then(/^.*no student is set$/, async function () {
	await addCourse.noStudentIsSet();
});
When(/^.*clicks Create-course-and-continue button'$/, async function () {
	await addCourse.clickCreateCourseAndContinueBtn();
});

Then(/^.*clicks Go-to-course-list$/, async function () {
	await addCourse.clickGoToCourseListBtn();
});

Then(/^.*color of the course is (\S*).*$/, async function (courseColour) {
	await courseListPage.isCorrectCourseColour(courseColour);
});
