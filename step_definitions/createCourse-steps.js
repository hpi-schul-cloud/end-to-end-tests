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
Then(/^.*should see 2 buttons: import-course and create-course$/, function () {
	return courseList.areSelectorsOnThePage();
});

When(/^.*clicks create-a-course button$/, function () {
	return courseList.clickCreateCourseBtn();
});

When(/^.*enters a (.*)$/, function (courseName) {
	return addCourse.setCourseName(courseName);
});
When(/^.*chooses a color (.*) of the course$/, function (courseColour) {
	return addCourse.setColour(courseColour);
});
When(/^.*clicks the create button$/, function () {
	return addCourse.goToNextSection();
});
When(/^.*clicks to preview$/, function () {
	return addCourse.goToNextSection();
});
Then(/^.*sees the created course (.*)$/, async function (courseName) {
	return courseList.verify(courseName);
});
Then(/^.*sees the created course$/, async function (courseName) {
	return courseList.verify(courseName);
});
When(
	/^.*does not submit any course name and clicks weiter-button$/,
	async function () {
		return addCourse.goToNextSection();
	}
);
Then(/^.*cannot go to section (.*)$/, async function (sectionNmber) {
	await addCourse.sectionIsNotDisplayed(sectionNmber);
});
Then(
	/^.*name of the teacher who is creating is already filled in the teacher's field$/,
	async function () {
		await addCourse.teachersNameisSetByDefault();
	}
);
Then(/^.*time span is  already set$/, async function () {
	await addCourse.timeSpanIsSet();
});
Then(/^.*supply teacher is not set$/, async function () {
	await addCourse.noTeacherSubstituteIsSet();
});

Then(/^.*second screen is shown$/, async function () {
	await addCourse.sectionIsDisplayed(2);
});
Then(/^.*no class is set$/, async function () {
	await addCourse.noClassIsSet();
});
Then(/^.*no students are set$/, async function () {
	await addCourse.noStudentIsSet();
});
When(/^.*clicks 'Kurs anlegen und Weiter'$/, async function () {
	await addCourse.clickCreateCourseAndNextBtn();
});

Then(
	/^.*btns "Einen weiteren Kurs anlegen" and "Zur Kursübersicht" are visible$/,
	async function () {
		await addCourse.buttonsAreVisible();
	}
);
Then(/^.*third screen is shown$/, async function () {
	await addCourse.sectionIsDisplayed(3);
});
Then(/^.*clicks zur-uebersicht-btn$/, async function () {
	await addCourse.goToCourseListPage();
});
Then(/^.*name (.*) is displayed correctly$/, async function (courseName) {
	await courseList.courseNameDisplayedCorrectly(courseName);
});
Then(
	/^.*color of the course is the color (.*) that was selected during the creation process$/,
	async function (courseColour) {
		await courseList.verifyColour(courseColour);
	}
);
