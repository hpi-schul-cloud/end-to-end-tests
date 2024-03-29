/*[url/homework/[homeworkId]]*/
'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const tableHelpers = require('../../runtime/helpers/tableHelpers');
const TASKListPage = require('./TASKListPage');
const mod_extsprintf = require ('extsprintf');
const submissionTextFieldSel = '.ck-content';
const remarksFieldSel ="//p[@data-placeholder = 'Bewertungskommentar']";
const submitBtn = '.ckeditor-submit';
const activeSubmissions = '.tab-content.section-homeworksubmissions.active';
const gradeFilesListSel = '.list-group-files';
const teacherSubmissionsTab = '#submissions-tab-link';
const studentSubmissionTab = "//a[@id='submission-tab-link' and contains(.,  'Abgabe')]";
const remoteFilePathInput = 'input[type=file][class=dz-hidden-input]';
const commentBtn = '#comment-tab-link';
const commentGradingTabSel = '#feedback-tab-link';
const createTaskAndTopicBtn = "div[data-testid='add-content-button']";
const taskRatingInput = '[data-testid="evaluation_procent"]';
const ratingViewSel = '.grade';
const remarkViewSel = '.ckcontent.comment';
const submissionsTable = '#submissions table';
const submissionRow = `${submissionsTable} tbody tr.userinfo`;
const createTaskBtn = '//a[@data-testid="fab_button_add_task"]'

let fileUrl;

const taskActionMenuButton = {
	finished: "//span[@data-testid = 'finishedTasks']",
	open: "//span[@data-testid = 'openTasks']",
	completed:"//span[@data-testid = 'closedTasks']",
	draft: "//span[@data-testid = 'draftTasks']",
};

function getTaskActionMenuBtnSelector(buttonAction) {
	let btnSel = "";
	const action = buttonAction.toLowerCase();
	switch (action) {
		case 'finished':
			btnSel = taskActionMenuButton.finished;
			break;
		case 'open':
			btnSel = taskActionMenuButton.open;
			break;
		case 'completed':
			btnSel = taskActionMenuButton.completed;
			break;
		case 'draft':
			btnSel = taskActionMenuButton.draft;
			break;
		default:
			console.error(`This action button: ${buttonAction} does not exist on the list of possible choices`);
			break;
	}
	return btnSel;
}

async function gotoTasksTab() {
	await elementHelpers.clickAndWait(createTaskAndTopicBtn)
	await elementHelpers.clickAndWait(createTaskBtn)
}

async function clickSaveAndSendSubmissionBtn() {
	await elementHelpers.clickAndWait(submitBtn);
}

async function clickSaveAndSendGradingBtn() {
	await elementHelpers.clickAndWait(submitBtn);
}

async function clickTeacherSubmissionsTab() {
	await elementHelpers.clickAndWait(teacherSubmissionsTab);
}

async function clickStudentSubmissionTab() {
	await elementHelpers.clickAndWait(studentSubmissionTab);
}

async function clickEvaluationTab() {
	await clickTeacherSubmissionsTab();
	await clickOnFirstSubmission();
	await clickCommentBtn();
}

async function clickOnStudentSubmissionContains(studentLastName) {
	const listOfSubmissions = await elementHelpers.getListOfAllElements(submissionRow);
	const studentIndex = await tableHelpers.getIndexOfRowContainsText(submissionsTable, studentLastName);
	const studentSubmission = listOfSubmissions[studentIndex];
	await elementHelpers.clickAndWait(studentSubmission);
}

async function clickOnFirstSubmission() {
	await elementHelpers.clickAndWait(submissionRow);
	await waitHelpers.waitUntilPageLoads(1500);
}

async function clickCommentBtn() {
	await elementHelpers.clickAndWait(commentBtn);
}

async function clickOnCommentGradingTab() {
	await elementHelpers.clickAndWait(commentGradingTabSel);
}

async function getCurrentTabUrl() {
	const handles = await driver.getWindowHandles();
	await driver.switchToWindow(handles[handles.length - 1]);
	return new URL(await driver.getUrl());
}

async function setRating(rating) {
	await waitHelpers.waitAndSetValue(taskRatingInput, rating);
}

async function setGradeRemarks(gradingRemarks) {
	await waitHelpers.waitAndSetValue(remarksFieldSel, gradingRemarks);
}

async function setTextSubmision(submissionText = 'here is some text which I want to submit') {
	await waitHelpers.waitAndSetValue(submissionTextFieldSel, submissionText);
}

async function gradeTask({ rating, gradingRemarks }) {
	if (rating) await setRating(rating);
	if (gradingRemarks) await setGradeRemarks(gradingRemarks);
}

async function isTaskRemark(remark) {
	const actualRemark = await elementHelpers.getElementText(remarkViewSel);
	const msg = `Task remark: '${remark}' is not correct \n`;
	const resultMsg = `Actual remark: ${actualRemark}`;
	await expect(actualRemark, msg + resultMsg).to.equal(remark);
}

async function isTaskRating(rating) {
	const actualRating = await elementHelpers.getElementText(ratingViewSel);
	const expectedRating = rating + '%';
	const msg = `Task rating ${expectedRating} is not correct \n`;
	const resultMsg = 'Actual rating: ' + actualRating;
	await expect(actualRating, msg + resultMsg).to.equal(expectedRating);
}

async function isFileVisible(file) {
	const gradeFilesList = await waitHelpers.waitUntilElementIsVisible(gradeFilesListSel);
	expect(await gradeFilesList.getText()).to.contain(file.name);
}

async function checkFileEvaluationTeacher(file) {
	if (process.env.CI) {
		console.warn('S3 is not available on CI. The files were never uploaded.');
		return;
	}
	await isFileVisible(file);
	const mainWindow = await driver.getWindowHandle();
	await elementHelpers.clickAndWait(`a*=${file.name}`);
	fileUrl = await getCurrentTabUrl();
	await driver.switchToWindow(mainWindow);
	await waitHelpers.waitUntilPageLoads(1500);
}

async function submitFileFeedback(file) {
	await clickEvaluationTab();
	await driver.execute(function () {
		document.querySelector('input[type=file][class=dz-hidden-input]').style = {};
	});
	const remoteFilePath = await driver.uploadFile(file.path);
	await waitHelpers.waitAndSetValue(remoteFilePathInput, remoteFilePath);
	await waitHelpers.waitUntilElementIsVisible(activeSubmissions);
	await waitHelpers.waitUntilPageLoads(1500);
}

async function checkFileEvaluationStudent(file) {
	await isFileVisible(file);
	await elementHelpers.clickAndWait(`a*=${file.name}`);
	const studentFileUrl = await getCurrentTabUrl();
	expect(studentFileUrl.origin).to.equal(fileUrl.origin);
	expect(studentFileUrl.pathname).to.equal(fileUrl.pathname);
}

async function clickOnTaskOverviewMenuOptions(button){
	await elementHelpers.clickAndWait(getTaskActionMenuBtnSelector(button));
}

module.exports = {
	gotoTasksTab,
	clickTeacherSubmissionsTab,
	clickStudentSubmissionTab,
	clickSaveAndSendSubmissionBtn,
	clickSaveAndSendGradingBtn,
	clickOnStudentSubmissionContains,
	clickOnCommentGradingTab,
	clickEvaluationTab,
	clickCommentBtn,
	getCurrentTabUrl,
	setTextSubmision,
	submitFileFeedback,
	gradeTask,
	isTaskRating,
	isTaskRemark,
	isFileVisible,
	checkFileEvaluationStudent,
	checkFileEvaluationTeacher,
	clickOnTaskOverviewMenuOptions,
};
