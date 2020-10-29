/*[url/homework/[homeworkId]]*/
'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const courseListPage = require('../../page-objects/pages/coursePages/CRSSCourseListPage');
const navigationTopPage = require('../pages/NavigationTopPage');
const startPage = require('../../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin');
const loginPage = require('../../page-objects/pages/generalPagesBeforeLogin/LoginPage');
const HMWRKHomeworkListPage = require('./HMWRKHomeworkListPage');
const CRSSGeneralCoursePage = require('./coursePages/CRSSGeneralCoursePage');

const textFieldSel = '.ck-content';
const submitBtn = '.ckeditor-submit';
const activeSubmissions = '.tab-content.section-homeworksubmissions.active';
const gradeFilesListSel = '.list-group-files';
const teacherSubmissionsTab = '#submissions-tab-link';
const studentSubmissionTab = '#submission-tab-link';
const submissionContainer = '.table .usersubmission';
const remoteFilePathInput = 'input[type=file][class=dz-hidden-input]';
const commentBtn = "a#comment-tab-link.tab-link";
const dashboardTitleListSel = '.dashboard-title';
// const homeworkTimeout = 'span[data-testid="homework-due-date"]';
// const homeworkNameSel = 'span[data-testid="homework-name"]';
// const homeworkCompleted = 'span[data-testid="homework-submitted"]';
// const homeworkGraded = 'span[data-testid="homework-graded"]';
// const courseNameSel = 'span[data-testid="homework-course-name"]';

const element = {
	homeworkName: 'span[data-testid="homework-name"]',
	courseName: 'span[data-testid="homework-course-name"]',
	homeworkTimeout: 'span[data-testid="homework-due-date"]',
	homeworkCompleted: 'span[data-testid="homework-submitted"]',
	homeworkGraded: 'span[data-testid="homework-graded"]',
};

async function submitSolutionForTheHometask() {
	const assignmentText = 'here is some text which I want to submit';
	await waitHelpers.waitAndSetValue(textFieldSel, assignmentText);
	await elementHelpers.clickAndWait(submitBtn);
}

async function studentEditsTextHomeworkAndSubmits() {
	await openStudentSubmissionTab();
	await submitSolutionForTheHometask();
}

async function openTeacherSubmissionsTab() {
	await elementHelpers.click(teacherSubmissionsTab);
}

async function openStudentSubmissionTab() {
	await elementHelpers.click(studentSubmissionTab);
}

// teacher helpers
async function hasTheStudentSubmittedTheTask(studentname) {
	await openTeacherSubmissionsTab();
	const listOfSubmisionStudentNames = await getListOfSubmisions();
	const isSubbmitedByStudent = listOfSubmisionStudentNames.some(
		async (element) =>
			(await element.getText()).includes(studentname) &&
			(await element.$$('i.fa-check')).length == 1
	);
	await expect(isSubbmitedByStudent).to.equal(true);
}

async function getListOfSubmisionStudentNames() {
	return elementHelpers.getTextFromAllElements(submissionContainer);
}

async function getListOfSubmisions() {
	return elementHelpers.getListOfAllElements(submissionContainer);
}

async function teacherLogsInAndCanSeeTheTextSubmission(coursename, taskname, studentname) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(
		loginPage.users.teachers.klaraFallUsername,
		loginPage.users.teachers.klaraFallPassword
	);
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await CRSSGeneralCoursePage.openHomeworksTab();
	await HMWRKHomeworkListPage.clickOnTask(taskname, 'Task open');
	await hasTheStudentSubmittedTheTask(studentname);
}

async function submitHomework(taskName) {
	await HMWRKHomeworkListPage.goToHomeworkListPage();
	await HMWRKHomeworkListPage.clickOnTask(taskName, 'Task open');
	await openStudentSubmissionTab();
	await submitSolutionForTheHometask();
}

async function teacherShowGradeTabForFirstSubmission() {
	await openTeacherSubmissionsTab();
	await clickOnFirstSubmission();
	await clickCommentBtn();
}

async function clickOnFirstSubmission() {
	await elementHelpers.click(submissionContainer);
}

async function clickCommentBtn() {
	await elementHelpers.click(commentBtn);
}

async function submitFileFeedback(taskName, file) {
	await navigationTopPage.performLogout();
	await startPage.clickLoginBtn();
	await loginPage.performLogin(loginPage.users.teachers.klaraFallUsername, loginPage.users.teachers.klaraFallPassword);
	await HMWRKHomeworkListPage.goToHomeworkListPage();
	await HMWRKHomeworkListPage.clickOnTask(taskName, 'Task open');
	await teacherShowGradeTabForFirstSubmission();
	await driver.execute(function () {
		document.querySelector('input[type=file][class=dz-hidden-input]').style = {};
	});
	const remoteFilePath = await driver.uploadFile(file.path);
	await waitHelpers.waitAndSetValue(remoteFilePathInput, remoteFilePath);
	await waitHelpers.waitUntilElementIsVisible(activeSubmissions);
}

async function testFileUploadSuccess(taskName, file, student) {
	await teacherShowGradeTabForFirstSubmission();
	if (process.env.CI) {
		console.warn('S3 is not available on CI. The files were never uploaded.');
		return;
	}
	await isFileVisible(file);
	const mainWindow = await driver.getWindowHandle();
	await elementHelpers.click(`a*=${file.name}`);
	await driver.pause(1000);
	const fileUrl = await getCurrentTabUrl();
	await driver.switchToWindow(mainWindow);
	await navigationTopPage.performLogout();
	await loginPage.performLogin(student.login, student.password);
	await HMWRKHomeworkListPage.goToHomeworkListPage();
	await elementHelpers.click(`*=${taskName}`);
	await clickCommentBtn();
	await isFileVisible(file);
	await elementHelpers.click(`a*=${file.name}`);
	await driver.pause(1000);
	const studentFileUrl = await getCurrentTabUrl();
	expect(studentFileUrl.origin).to.equal(fileUrl.origin);
	expect(studentFileUrl.pathname).to.equal(fileUrl.pathname);
}

async function isFileVisible(file) {
	const gradeFilesList = await waitHelpers.waitUntilElementIsVisible(gradeFilesListSel);
	expect(await gradeFilesList.getText()).to.contain(file.name);
}

async function getCurrentTabUrl() {
	const handles = await driver.getWindowHandles();
	await driver.switchToWindow(handles[handles.length - 1]);
	return new URL(await driver.getUrl());
}

async function isPrivateTasksAndDraftsListVisible(listName) {
	const dashboardTitlesList = await elementHelpers.getTextFromAllElements(dashboardTitleListSel)
	const msg = 'Title with name [' + listName + '] is not visible on the list \n';
	const resultMsg = ', List of titles: ' + dashboardTitlesList;
	return expect(dashboardTitlesList, msg + resultMsg).to.include(listName);
}

async function isCourseNameOnPrivateHomeworkVisible(homeworkName, courseName) {
	const homeworkIndex = await getIndexOfHomeworkFromList(homeworkName);
	const homeworkCourseElementList = await elementHelpers.getListOfAllElements(element.courseName)
	const courseNameText = await elementHelpers.getElementText(homeworkCourseElementList[homeworkIndex]);
	const msg = 'Course with name [' + courseName + '] is not visible on the private homework \n';
	const resultMsg = 'List of course titles: ' + homeworkCourseElementList;
	return expect(courseNameText, msg + resultMsg).to.include(courseName);
}

async function getIndexOfHomeworkFromList(homeworkName) {
	const homeworkTextElementList = await elementHelpers.getListOfAllElements(element.homeworkName)
	const homeworkTextValueList = await elementHelpers.getTextListFromListOfElements(homeworkTextElementList);
	const index = homeworkTextValueList.indexOf(homeworkName);
	return index;
}

async function isPrivateHomeworkNameVisible(homeworkName) {
	const homeworkNameList = await elementHelpers.getTextFromAllElements(element.homeworkName)
	const msg = 'Homework with name [' + homeworkName + '] is not visible on the list \n';
	const resultMsg = 'List of Homework titles: ' + homeworkNameList;
	return expect(homeworkNameList, msg + resultMsg).to.include(homeworkName);
}

async function isTimeoutVisible(homeworkName) {
	const homeworkIndex = await getIndexOfHomeworkFromList(homeworkName);
	const homeworkTimeoutElementList = await elementHelpers.getListOfAllElements(element.homeworkTimeout);
	return waitHelpers.waitUntilElementIsPresent(homeworkTimeoutElementList[homeworkIndex]);
}

async function isElementOfHomeworkVisible(elementName, homeworkName, selector, expectedValue) {
	const defaultString = `Element with name: ${elementName}`;
	let elementOfHomework = true;
	const homeworkIndex = await getIndexOfHomeworkFromList(homeworkName);
	const elementsOfHomeworksList = await elementHelpers.getListOfAllElements(selector);
	elementsOfHomeworksList.length === 0 ? elementOfHomework = false : await waitHelpers.waitUntilElementIsPresent(elementsOfHomeworksList[homeworkIndex]);

	const msg = expectedValue
		? `${defaultString} should be visible on the homework`
		: `${defaultString} should not be visible on the homework`;

	expectedValue
		? expect(elementOfHomework, msg).to.be.true
		: expect(elementOfHomework, msg).to.be.false;

}

module.exports = {
	openSubmissionsTab: openTeacherSubmissionsTab,
	submitSolutionForTheHometask,
	studentEditsTextHomeworkAndSubmits,
	hasTheStudentSubmittedTheTask,
	teacherLogsInAndCanSeeTheTextSubmission,
	submitHomework,
	teacherShowGradeTabForFirstSubmission,
	submitFileFeedback,
	testFileUploadSuccess,
	isFileVisible,
	getCurrentTabUrl,
	isPrivateTasksAndDraftsListVisible,
	isCourseNameOnPrivateHomeworkVisible,
	isPrivateHomeworkNameVisible,
	isElementOfHomeworkVisible,
	isTimeoutVisible,
	element,

};
