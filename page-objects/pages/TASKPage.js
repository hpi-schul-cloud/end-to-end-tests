/*[url/homework/[homeworkId]]*/
'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const tableHelpers = require('../../runtime/helpers/tableHelpers');
const gradingRemarksFieldSel = '.ck-content';
const submitBtn = '.ckeditor-submit'; 
const activeSubmissions = '.tab-content.section-homeworksubmissions.active';
const gradeFilesListSel = '.list-group-files';
const teacherSubmissionsTab = '#submissions-tab-link';
const studentSubmissionTab = '#submission-tab-link';
const remoteFilePathInput = 'input[type=file][class=dz-hidden-input]';
const commentBtn = '#comment-tab-link';
const commentGradingTabSel = '#feedback-tab-link';
const hometasksTabSel = 'button[data-testid="hometasks"]';
const taskRatingInput = '[data-testid="evaluation_procent"]';
const ratingViewSel = '.grade';
const remarkViewSel = '.ckcontent.comment';
const submissionsTable = '#submissions table';
const submissionRow = `${submissionsTable} tbody tr.userinfo`;
let fileUrl; 
const evaluation = 90;

async function setTextSubmision(submissionText = "here is some text which I want to submit") {
	await waitHelpers.waitAndSetValue(gradingRemarksFieldSel, submissionText);
}

async function clickSaveAndSendSubmissionBtn() {
	await elementHelpers.clickAndWait(submitBtn);
}

async function clickSaveAndSendGradingBtn() {
	await elementHelpers.clickAndWait(submitBtn);
}

//teacher
async function clickTeacherSubmissionsTab() {
	await elementHelpers.clickAndWait(teacherSubmissionsTab);
}

//student
async function clickStudentSubmissionTab() {
	await elementHelpers.clickAndWait(studentSubmissionTab);
}

async function isTaskSubmitted(studentname) {
	await clickTeacherSubmissionsTab();
	const listOfSubmisionStudentNames = await getListOfSubmisions();
	const isSubbmitedByStudent = listOfSubmisionStudentNames.some(
		async (element) =>
            (await element.getText()).includes(studentname) && 
            (await element.$$('i.fa-check')).length == 1
	);
	await expect(isSubbmitedByStudent).to.equal(true);
}

async function getListOfSubmisions() {
	return elementHelpers.getListOfAllElements(submissionRow);
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
async function gotoTasksTab () {
	await elementHelpers.clickAndWait(hometasksTabSel)
	
}
async function clickOnCommentGradingTab () {
	await elementHelpers.clickAndWait(commentGradingTabSel)
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
	await waitHelpers.waitUntilPageLoads(1500);
}

async function isFileVisible(file) {
	const gradeFilesList = await waitHelpers.waitUntilElementIsVisible(gradeFilesListSel);
	expect(await gradeFilesList.getText()).to.contain(file.name);
}

async function isTaskRating(rating) {
	const actualRating = await elementHelpers.getElementText(ratingViewSel);
	const expectedRating = rating + '%'
	const msg = `Task rating ${expectedRating} is not correct \n`;
	const resultMsg = 'Actual rating: ' + actualRating;
	await expect(actualRating, msg + resultMsg).to.equal(expectedRating)
}

async function isTaskRemark(remark) {
	const actualRemark = await elementHelpers.getElementText(remarkViewSel);
	const msg = `Task remark: '${remark}' is not correct \n`;
	const resultMsg = `Actual remark: ${actualRemark}`;
	await expect(actualRemark, msg + resultMsg).to.equal(remark);
}

async function getCurrentTabUrl() {
	const handles = await driver.getWindowHandles();
	await driver.switchToWindow(handles[handles.length - 1]);
	return new URL(await driver.getUrl());
}

async function gradeTask({rating, gradingRemarks}) {
	if (rating) setRating(rating);
	if (gradingRemarks) setGradeRemarks(gradingRemarks);
}

async function setRating(rating) {
	await waitHelpers.waitAndSetValue(taskRatingInput, rating);
}

async function setGradeRemarks(gradingRemarks) {
	await waitHelpers.waitAndSetValue(gradingRemarksFieldSel, gradingRemarks)
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
	submitFileFeedback,
	gradeTask,
	setTextSubmision,
	getCurrentTabUrl,
	checkFileEvaluationStudent,
	checkFileEvaluationTeacher,
	isTaskRating,
	isTaskRemark,
	isTaskSubmitted,
	isFileVisible,
	evaluation,
};
