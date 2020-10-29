/*[url/homework/[homeworkId]]*/
'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const textFieldSel = '.ck-content';
const submitBtn = '.ckeditor-submit';
const activeSubmissions = '.tab-content.section-homeworksubmissions.active';
const gradeFilesListSel = '.list-group-files';
const teacherSubmissionsTab = '#submissions-tab-link';
const studentSubmissionTab = '#submission-tab-link';
const submissionContainer = '.userinfo';
const remoteFilePathInput = 'input[type=file][class=dz-hidden-input]';
const commentBtn = '#comment-tab-link';
const selectorTabFeedbackForSubmission = '#feedback-tab-link';
const hometasksTabSel = 'button[data-testid="hometasks"]';
const selectorEvaluationProcent = '[data-testid="evaluation_procent"]';
const selectorEvaluationProcentStudentView = '.grade';
const selectorSubmitFeedbackBtn = '.ckeditor-submit.btn.btn-primary'
let fileUrl; 
const evaluation = 90;


async function submitSolutionForTheHometask() {
	const assignmentText = 'here is some text which I want to submit';
	await waitHelpers.waitAndSetValue(textFieldSel, assignmentText);
	await elementHelpers.clickAndWait(submitBtn);
}

async function studentEditsTextHomeworkAndSubmits() {
	await clickStudentSubmissionTab();
	await submitSolutionForTheHometask();
}

async function clickOpenTeacherSubmissionsTab() {
	await elementHelpers.click(teacherSubmissionsTab);
}

async function clickStudentSubmissionTab() {
	await elementHelpers.click(studentSubmissionTab);
}

// teacher helpers
async function isTaskSubmitted(studentname) {
	await clickOpenTeacherSubmissionsTab();
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

async function submitHomework() {
	await clickStudentSubmissionTab();
	await submitSolutionForTheHometask();
}

async function clickEvaluationTab() {
	await clickOpenTeacherSubmissionsTab();
	await clickOnFirstSubmission();
	await clickCommentBtn();
}

async function clickOnFirstSubmission() {
	await elementHelpers.click(submissionContainer);
}

async function clickCommentBtn() {
	await elementHelpers.clickAndWait(commentBtn);
}
async function clickTasksTab () {
	await elementHelpers.clickAndWait(hometasksTabSel)
	
}
async function clickOpenFeedbackTab () {
	await elementHelpers.clickAndWait(selectorTabFeedbackForSubmission)
}

async function submitFileFeedback(file) {
	await clickEvaluationTab();
	await driver.execute(function () {
		document.querySelector('input[type=file][class=dz-hidden-input]').style = {};
	});
	const remoteFilePath = await driver.uploadFile(file.path);
	await waitHelpers.waitAndSetValue(remoteFilePathInput, remoteFilePath);
	await waitHelpers.waitUntilElementIsVisible(activeSubmissions);
}

async function checkFileEvaluationStudent (file) {
	await isFileVisible(file);
	await elementHelpers.clickAndWait(`a*=${file.name}`);
	const studentFileUrl = await getCurrentTabUrl();
	expect(studentFileUrl.origin).to.equal(fileUrl.origin);
	expect(studentFileUrl.pathname).to.equal(fileUrl.pathname);
}

async function checkFileEvaluationTeacher (file) {
	if (process.env.CI) {
		console.warn('S3 is not available on CI. The files were never uploaded.');
		return;
	}
	await isFileVisible(file);
	const mainWindow = await driver.getWindowHandle();
	await elementHelpers.clickAndWait(`a*=${file.name}`);
	fileUrl = await getCurrentTabUrl();
	await driver.switchToWindow(mainWindow);

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

async function evaluateTheTask() {
	await waitHelpers.waitAndSetValue(selectorEvaluationProcent, evaluation);
	await waitHelpers.waitAndSetValue(textFieldSel, 'good')
	await elementHelpers.click(selectorSubmitFeedbackBtn);
}
async function getEvaluation() {
	return await elementHelpers.getElementText(selectorEvaluationProcentStudentView)
}
module.exports = {
	openSubmissionsTab: clickOpenTeacherSubmissionsTab,
	submitSolutionForTheHometask,
	studentEditsTextHomeworkAndSubmits,
	hasTheStudentSubmittedTheTask: isTaskSubmitted,
	submitHomework,
	submitFileFeedback,
	isFileVisible,
	getCurrentTabUrl,
	gotoTasksTab: clickTasksTab,
	clickEvaluationTab,
	clickCommentBtn,
	checkFileEvaluationStudent,
	checkFileEvaluationTeacher,
	clickOpenFeedbackTab,
	evaluateTheTask,
	getEvaluation,
	evaluation,
};
