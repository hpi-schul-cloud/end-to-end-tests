/*[url/homework/[homeworkId]]*/
'use strict';
const { CLIENT } = require("../../shared-objects/servers");
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const courseListPage = require('../../page-objects/pages/coursePages/CRSSCourseListPage');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const startPage = require('../../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin');
const loginPage = require('../../page-objects/pages/generalPagesBeforeLogin/LoginPage');
const logoutPage = require('../../page-objects/pages/generalPagesBeforeLogin/LogoutPage');
const HMWRKHomeworkListPage = require("./HMWRKHomeworkListPage");

const submissionTab = "#submission-tab-link";

const urlHomework = `${CLIENT.URL}/homework`;
const textFieldSel = '.ck-content';
const submitBtn = '.ckeditor-submit';
const submitted_by_boxSel = '#submissions .groupNames > span';
const hometasksTabSel = 'button[data-testid="hometasks"]';
const activeSubmissions = '.tab-content.section-homeworksubmissions.active';
const gradeFilesListSel = '.list-group-files';


module.exports = {
    goToHomeworkListPage: async function () {
        await elementHelpers.loadPage(urlHomework, 20);
    },

    switchToSubmissionTab: async function () {
        await elementHelpers.click(submissionTab);
    },

    submitSolutionForTheHometask: async function () {
        await driver.pause(global.SHORT_WAIT_MILLIS);
        const textField = await driver.$(textFieldSel);
        const assignmentText = 'here is some text which I want to submit';
        textField.setValue(assignmentText);
        await elementHelpers.click(submitBtn)
        await driver.pause(1500);
    },


    studentEditsTextHomeworkAndSubmits: async function () {
        await this.switchToSubmissionTab();
        await this.submitSolutionForTheHometask();
    },
    // teacher helpers
    hasTheStudentSubmittedTheTask: async function (studentname) {
        let submissionTab = "#submissions-tab-link";
        await elementHelpers.click(submissionTab);
        let submitted_by_box = await driver.$(submitted_by_boxSel);
        let submitted_by_name = await submitted_by_box.getText();
        await expect(submitted_by_name).to.contain(studentname);
    },

    teacherLogsInAndCanSeeTheTextSubmission: async function (coursename, taskname, studentname) {
        await startPage.clickLoginBtn();
        await loginPage.performLogin(loginPage.users.teachers.klaraFallUsername, loginPage.users.teachers.klaraFallPassword);
        await loginPage.firstLoginAdminOrTeacher();
        await courseListPage.goToCourses();
        await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
        await this.gotoTasksTab();
        await HMWRKHomeworkListPage.userFindsTheTask(taskname);
        await this.hasTheStudentSubmittedTheTask(studentname);
    },

    gotoTasksTab: async function () {
        let hometasksTab = await driver.$(hometasksTabSel);
        await hometasksTab.click();
        await driver.pause(1000);
    },

    submitHomework: async function (taskName, student) {
        await this.goToHomeworkListPage();
        await elementHelpers.click(`[aria-label*="${taskName}"] > span`);
        await this.switchToSubmissionTab();
        await this.submitSolutionForTheHometask();
    },

    teacherShowGradeTabForFirstSubmission: async function () {
        await elementHelpers.click('#submissions-tab-link');
        await elementHelpers.click('tbody.usersubmission');
        await elementHelpers.click('a*=Bewertung');
    },

    submitFileFeedback: async function (taskName, file) { // back to teacher
        await logoutPage.goToLogoutPage();
        await startPage.clickLoginBtn();
        await loginPage.performLogin(loginPage.users.teachers.klaraFallUsername, loginPage.users.teachers.klaraFallPassword);
        await this.goToHomeworkListPage();
        await elementHelpers.click(`[aria-label*="${taskName}"] > span`);

        await this.teacherShowGradeTabForFirstSubmission();

        // upload the file
        await driver.execute(function () { // Need to make the input visible, otherwise the webdriver can not upload any files
            document.querySelector('input[type=file][class=dz-hidden-input]').style = {};
        });

        const remoteFilePath = await driver.uploadFile(file.path);
        await (await driver.$('input[type=file][class=dz-hidden-input]')).setValue(remoteFilePath);
        await driver.pause(3000);

        // The upload causes a page reload, which causes the current tab to change.
        await (await driver.$(activeSubmissions)).waitForDisplayed();
    },

    testFileUploadSuccess: async function (taskName, file, student) { // navigate to grade tab
        await this.teacherShowGradeTabForFirstSubmission();

        if (process.env.CI) {
            console.warn('S3 is not available on CI. The files were never uploaded.');
            return;
        }
        await this.canSeeFile(file);
        const mainWindow = await driver.getWindowHandle();
        await elementHelpers.click(`a*=${file.name
            }`);

        await driver.pause(1000);
        const fileUrl = await this.getCurrentTabUrl();
        await driver.switchToWindow(mainWindow);

        // ensure the student sees the file
        await logoutPage.goToLogoutPage();
        await loginPage.performLogin(student.login, student.password);
        await this.goToHomeworkListPage();
        await elementHelpers.click(`*=${taskName}`);
        await elementHelpers.click('a*=Bewertung');

        await this.canSeeFile(file);

        // ensure the student can download the file
        await elementHelpers.click(`a*=${file.name
            }`);
        await driver.pause(1000);
        const studentFileUrl = await this.getCurrentTabUrl();

        // After all the redirect, the localstack filepath should be the same (ignoring the auth-arguments in the query)
        expect(studentFileUrl.origin).to.equal(fileUrl.origin);
        expect(studentFileUrl.pathname).to.equal(fileUrl.pathname);
    },

    canSeeFile: async function (file) {
        const gradeFilesList = await waitHelpers.waitUntilElementIsPresent(gradeFilesListSel);
        await gradeFilesList.waitForDisplayed();
        expect(await gradeFilesList.getText()).to.contain(file.name);
    },

    getCurrentTabUrl: async function () {
        const handles = await driver.getWindowHandles();
        // switch to newest tab
        await driver.switchToWindow(handles[handles.length - 1]);

        return new URL(await driver.getUrl());
    }
}
