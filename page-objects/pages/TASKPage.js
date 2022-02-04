/*[url/homework/[homeworkId]]*/
'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const tableHelpers = require('../../runtime/helpers/tableHelpers');
const mod_extsprintf = require ('extsprintf');
const gradingRemarksFieldSel = '.ck-content';
const submitBtn = '.ckeditor-submit';
const activeSubmissions = '.tab-content.section-homeworksubmissions.active';
const gradeFilesListSel = '.list-group-files';
const teacherSubmissionsTab = '#submissions-tab-link';
const studentSubmissionTab = "//a[@id='submission-tab-link' and contains(.,  'Abgabe')]";
const remoteFilePathInput = 'input[type=file][class=dz-hidden-input]';
const commentBtn = '#comment-tab-link';
const commentGradingTabSel = '#feedback-tab-link';
const hometasksTabSel = 'button[data-testid="hometasks"]';
const taskRatingInput = '[data-testid="evaluation_procent"]';
const ratingViewSel = '.grade';
const remarkViewSel = '.ckcontent.comment';
const submissionsTable = '#submissions table';
const submissionRow = `${submissionsTable} tbody tr.userinfo`;
const openTasksTab = "//span[@data-testid = 'openTasks']";
const completedTasksTab = "//span[@data-testid = 'closedTasks']";
const draftTasksTab = "//span[@data-testid = 'draftTasks']";
const finishedTasksTab = "//span[@data-testid = 'finishedTasks']";
const taskGrading = "//a[div/div[@data-testid='taskTitle' and text() = '%s']]/section/div/div[@data-testid='taskGraded' and text() > '0']";
let fileUrl;

async function gotoTasksTab() {
	await elementHelpers.clickAndWait(hometasksTabSel);
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

async function getListOfSubmisions() {
	return elementHelpers.getListOfAllElements(submissionRow);
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
	await waitHelpers.waitAndSetValue(gradingRemarksFieldSel, gradingRemarks);
}

async function setTextSubmision(submissionText = 'here is some text which I want to submit') {
	await waitHelpers.waitAndSetValue(gradingRemarksFieldSel, submissionText);
}

async function gradeTask({ rating, gradingRemarks }) {
	if (rating) setRating(rating);
	if (gradingRemarks) setGradeRemarks(gradingRemarks);
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

async function isTaskSubmitted(studentname) {
	await clickTeacherSubmissionsTab();
	const listOfSubmisionStudentNames = await getListOfSubmisions();
	const isSubbmitedByStudent = listOfSubmisionStudentNames.some(
		async (element) =>
			(await element.getText()).includes(studentname) && (await element.$$('i.fa-check')).length == 1
	);
	await expect(isSubbmitedByStudent).to.equal(true);
}

async function clickOpenTasksTab(){
	await elementHelpers.clickAndWait(openTasksTab);
}

async function clickCompletedTasksTab(){
	await elementHelpers.clickAndWait(completedTasksTab);
}

async function clickFinishedTasksTab(){
	await elementHelpers.clickAndWait(finishedTasksTab);
}

async function clickDraftTasksTab(){
	await elementHelpers.clickAndWait(draftTasksTab);
}

async function isTaskGraded(taskName){
	await driver.pause(3000);
	const actualResult = await elementHelpers.getElementText(mod_extsprintf.sprintf(taskGrading, taskName));
	await expect(actualResult).to.equal('1');
	await driver.pause(3000);
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
	isTaskSubmitted,
	isFileVisible,
	checkFileEvaluationStudent,
	checkFileEvaluationTeacher,
	clickOpenTasksTab,
	clickCompletedTasksTab,
	clickDraftTasksTab,
	clickFinishedTasksTab,
	isTaskGraded,
};
