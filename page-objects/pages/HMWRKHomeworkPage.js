/*[url/homework/[homeworkId]]*/
'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const courseListPage = require('../../page-objects/pages/coursePages/CRSSCourseListPage');
const navigationTopPage = require('../pages/NavigationTopPage');
const startPage = require('../../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin');
const loginPage = require('../../page-objects/pages/generalPagesBeforeLogin/LoginPage');
const HMWRKHomeworkListPage = require('./HMWRKHomeworkListPage');

const submissionTab = '#submission-tab-link';
const textFieldSel = '.ck-content';
const submitBtn = '.ckeditor-submit';
const submitted_by_boxSel = '#submissions .groupNames > span';
const hometasksTabSel = 'button[data-testid="hometasks"]';
const activeSubmissions = '.tab-content.section-homeworksubmissions.active';
const gradeFilesListSel = '.list-group-files';

async function clickOnSubmissionTab() {
    await elementHelpers.click(submissionTab);
}
async function submitSolutionForTheHometask() {
    await driver.pause(global.SHORT_WAIT_MILLIS);
    const textField = await driver.$(textFieldSel);
    const assignmentText = 'here is some text which I want to submit';
    textField.setValue(assignmentText);
    await elementHelpers.click(submitBtn);
    await driver.pause(1500);
}
async function studentEditsTextHomeworkAndSubmits() {
    await clickOnSubmissionTab();
    await submitSolutionForTheHometask();
}
// teacher helpers
async function hasTheStudentSubmittedTheTask(studentname) {
    let submissionTab = '#submissions-tab-link';
    await elementHelpers.click(submissionTab);
    let submitted_by_box = await driver.$(submitted_by_boxSel);
    let submitted_by_name = await submitted_by_box.getText();
    await expect(submitted_by_name).to.contain(studentname);
}

async function teacherLogsInAndCanSeeTheTextSubmission(coursename, taskname, studentname) {
    await startPage.clickLoginBtn();
    await loginPage.performLogin(
        loginPage.users.teachers.klaraFallUsername,
        loginPage.users.teachers.klaraFallPassword
    );
    await loginPage.performLoginActions({ shouldAcceptDataProtection: true, shouldSetOwnPassword: false });
    await courseListPage.goToCourses();
    await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
    await gotoTasksTab();
    await HMWRKHomeworkListPage.clickOnTaskFromList(taskname);
    await hasTheStudentSubmittedTheTask(studentname);
}

async function gotoTasksTab() {
    let hometasksTab = await driver.$(hometasksTabSel);
    await hometasksTab.click();
    await driver.pause(1000);
}

async function submitHomework(taskName, student) {
    await HMWRKHomeworkListPage.goToHomeworkListPage();
    await elementHelpers.click(`[aria-label*="${taskName}"] > span`);
    await clickOnSubmissionTab();
    await submitSolutionForTheHometask();
}

async function teacherShowGradeTabForFirstSubmission() {
    await elementHelpers.click('#submissions-tab-link');
    await elementHelpers.click('tbody.usersubmission');
    await elementHelpers.click('a*=Bewertung');
}

async function submitFileFeedback(taskName, file) {
    // back to teacher
    await navigationTopPage.performLogout();
    await startPage.clickLoginBtn();
    await loginPage.performLogin(
        loginPage.users.teachers.klaraFallUsername,
        loginPage.users.teachers.klaraFallPassword
    );
    await HMWRKHomeworkListPage.goToHomeworkListPage();
    await elementHelpers.click(`[aria-label*="${taskName}"] > span`);

    await teacherShowGradeTabForFirstSubmission();

    // upload the file
    await driver.execute(function () {
        // Need to make the input visible, otherwise the webdriver can not upload any files
        document.querySelector('input[type=file][class=dz-hidden-input]').style = {};
    });

    const remoteFilePath = await driver.uploadFile(file.path);
    await (await driver.$('input[type=file][class=dz-hidden-input]')).setValue(remoteFilePath);
    await driver.pause(3000);

    // The upload causes a page reload, which causes the current tab to change.
    await (await driver.$(activeSubmissions)).waitForDisplayed();
}

async function testFileUploadSuccess(taskName, file, student) {
    // navigate to grade tab
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

    // ensure the student sees the file
    await navigationTopPage.performLogout();
    await loginPage.performLogin(student.login, student.password);
    await HMWRKHomeworkListPage.goToHomeworkListPage();
    await elementHelpers.click(`*=${taskName}`);
    await elementHelpers.click('a*=Bewertung');

    await isFileVisible(file);

    // ensure the student can download the file
    await elementHelpers.click(`a*=${file.name}`);
    await driver.pause(1000);
    const studentFileUrl = await getCurrentTabUrl();

    // After all the redirect, the localstack filepath should be the same (ignoring the auth-arguments in the query)
    expect(studentFileUrl.origin).to.equal(fileUrl.origin);
    expect(studentFileUrl.pathname).to.equal(fileUrl.pathname);
}

async function isFileVisible(file) {
    const gradeFilesList = await waitHelpers.waitUntilElementIsPresent(gradeFilesListSel);
    await gradeFilesList.waitForDisplayed();
    expect(await gradeFilesList.getText()).to.contain(file.name);
}

async function getCurrentTabUrl() {
    const handles = await driver.getWindowHandles();
    // switch to newest tab
    await driver.switchToWindow(handles[handles.length - 1]);

    return new URL(await driver.getUrl());
}

module.exports = {
	clickOnSubmissionTab,
	submitSolutionForTheHometask,
	studentEditsTextHomeworkAndSubmits,
	hasTheStudentSubmittedTheTask,
	teacherLogsInAndCanSeeTheTextSubmission,
	gotoTasksTab,
	submitHomework,
	teacherShowGradeTabForFirstSubmission,
	submitFileFeedback,
	testFileUploadSuccess,
	isFileVisible,
	getCurrentTabUrl,
};
