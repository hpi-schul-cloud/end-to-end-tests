const elementHelpers = require("../runtime/helpers/elementHelpers.js");
const Login = require("../shared-objects/loginData");
const loginPage = require("../page-objects/pages/loginPage");
const startPage = require("../page-objects/pages/startPage");
const addCourse = require("../page-objects/pages/coursePages/CRSSAddCoursePage");
const courseList = require("../page-objects/pages/coursePages/CRSSCourseListPage");

Given(/^.*arrives on the Schul-Cloud Page$/, function () {
	return elementHelpers.loadPage(Login.url, 20);
});
Given(/^.*with email (.*) and (.*) is logged in successfully$/, async function (
	username,
	password
) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(username, password);
});
When(/^.*goes to courses page$/, function () {
	return courseList.goToCourses();
});
Then(/^.*buttons: Import-course, Create-new-course are visible$/, function () {
	return courseList.importAndCreateCourseBtnsAreVisible();
});

Then(
	/^.*buttons: Create-new-course, Go-to-course-list-page are visible$/,
	async function () {
		await addCourse.finalButtonsAreVisible();
	}
);

When(/^.*clicks Create-new-course button$/, function () {
	return courseList.clickCreateCourseBtn();
});

When(/^.*enters a (.*)$/, function (courseName) {
	return addCourse.setCourseName(courseName);
});
When(/^.*chooses a color (.*) of the course$/, function (courseColour) {
	return addCourse.setColour(courseColour);
});
When(/^.*clicks Create-button$/, function () {
	return addCourse.goToNextSection();
});
When(/^.*clicks to preview$/, function () {
	return addCourse.goToNextSection();
});

Then(/^.*course with name (.*) is visible on the list$/, async function (courseName) {
	return courseList.isCourseOnList(courseName);
});

Then(/^.*course with name (.*) is displayed correctly on the list$/, async function (courseName) {
	await courseList.courseDisplayedCorrectly(courseName);
});
When(
	/^.*clicks Next-section button$/,
	async function () {
		return addCourse.goToNextSection();
	}
);
Then(/^.*the (.*) section can not be opened$/, async function (sectionNumber) {
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

Then(/^.* (.*) section is opened$/, async function (sectionNumber) {
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

Then(
	/^.*color of the course is (\S*) .*$/,
	async function (courseColour) {
		await courseList.isCorrectCourseColour(courseColour);
	}
);
