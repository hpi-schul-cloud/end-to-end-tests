/*[url/homework/[homeworkId]]*/
'use strict';
const { CLIENT } = require("../../shared-objects/servers");
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const courseListPage = require('../../page-objects/pages/coursePages/CRSSCourseListPage');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const startPage = require('../../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin');
const loginPage = require('../../page-objects/pages/generalPagesBeforeLogin/LoginPage');
const logoutPage = require('../../page-objects/pages/generalPagesBeforeLogin/LogoutPage');


const submissionTab = "#submission-tab-link";
const areThereAnyTasks = '#homeworks > ol > div > li';
const urlHomework = `${CLIENT.URL}/homework`;


module.exports = {
    goToHomeworkListPage: async function () {
        await elementHelpers.loadPage(urlHomework, 20);
    },

    // student helpers
    userFindsTheTask: async function (taskname) {
        let areThereAnyTasks = await driver.$$(areThereAnyTasks);
        await expect(areThereAnyTasks.length).not.to.equal(0);
        for (var i = 0; i <= areThereAnyTasks.length; i++) {
            let taskSelector = await driver.$('#homeworks > ol > div > li:nth-child(' + i + ') .h5.title');
            let tasknameOnPage = await taskSelector.getText();
            if (tasknameOnPage == taskname) {
                await taskSelector.click();
                await driver.pause(1000);
            }
        }
    },

    switchToSubmissionTab: async function () {
        await waitHelpers.waitAndClick(submissionTab);
    },

    submitSolutionForTheHometask: async function () {
        await driver.pause(global.SHORT_WAIT_MILLIS);
        const textField = await driver.$('.ck-content');
        const assignmentText = 'here is some text which I want to submit';
        textField.setValue(assignmentText);
        const container = await driver.$('#submission');
        const submitBtn = await container.$('button[type="submit"]');
        await waitHelpers.waitAndClick('.ckeditor-submit')
        await driver.pause(1500);
    },


    studentEditsTextHomeworkAndSubmits: async function () {
        await this.switchToSubmissionTab();
        await this.submitSolutionForTheHometask();
    },
    // teacher helpers
    hasTheStudentSubmittedTheTask: async function (studentname) {
        let submissionTab = "#submissions-tab-link";
        await waitHelpers.waitAndClick(submissionTab);
        let submitted_by_box = await driver.$('#submissions .groupNames > span');
        let submitted_by_name = await submitted_by_box.getText();
        await expect(submitted_by_name).to.contain(studentname);
    },

    teacherLogsInAndCanSeeTheTextSubmission: async function (coursename, taskname, studentname) {
        await startPage.clickLoginBtn();
        await loginPage.performLogin(loginPage.defaultLoginData.defaultTeacherUsername, loginPage.defaultLoginData.defaultTeacherpassword);
        await loginPage.firstLoginAdminOrTeacher();
        await courseListPage.goToCourses();
        await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
        await this.gotoTasksTab();
        await this.userFindsTheTask(taskname);
        await this.hasTheStudentSubmittedTheTask(studentname);
    },

    gotoTasksTab: async function () {
        let hometasksTab = await driver.$('button[data-testid="hometasks"]');
        await hometasksTab.click();
        await driver.pause(1000);
    },

    submitHomework: async function (taskName, student) {
        await this.goToHomeworkListPage();
        await waitHelpers.waitAndClick(`[aria-label*="${taskName}"] > span`);
        await this.switchToSubmissionTab();
        await this.submitSolutionForTheHometask();
    },

    teacherShowGradeTabForFirstSubmission: async function () {
        await waitHelpers.waitAndClick('#submissions-tab-link');
        await waitHelpers.waitAndClick('tbody.usersubmission');
        await waitHelpers.waitAndClick('a*=Bewertung');
    },

    submitFileFeedback: async function (taskName, file) { // back to teacher
        await logoutPage.goToLogoutPage();
        await startPage.clickLoginBtn();
        await loginPage.performLogin(loginPage.defaultLoginData.defaultTeacherUsername, loginPage.defaultLoginData.defaultTeacherpassword);
        await this.goToHomeworkListPage();
        await waitHelpers.waitAndClick(`[aria-label*="${taskName}"] > span`);

        await this.teacherShowGradeTabForFirstSubmission();

        // upload the file
        await driver.execute(function () { // Need to make the input visible, otherwise the webdriver can not upload any files
            document.querySelector('input[type=file][class=dz-hidden-input]').style = {};
        });

        const remoteFilePath = await driver.uploadFile(file.path);
        await (await driver.$('input[type=file][class=dz-hidden-input]')).setValue(remoteFilePath);
        await driver.pause(3000);

        // The upload causes a page reload, which causes the current tab to change.
        await (await driver.$('.tab-content.section-homeworksubmissions.active')).waitForDisplayed();
    },

    testFileUploadSuccess: async function (taskName, file, student) { // navigate to grade tab
        await this.teacherShowGradeTabForFirstSubmission();

        if (process.env.CI) {
            console.warn('S3 is not available on CI. The files were never uploaded.');
            return;
        }
        await this.canSeeFile(file);
        const mainWindow = await driver.getWindowHandle();
        await waitHelpers.waitAndClick(`a*=${
            file.name
            }`);

        await driver.pause(1000);
        const fileUrl = await this.getCurrentTabUrl();
        await driver.switchToWindow(mainWindow);

        // ensure the student sees the file
        await logoutPage.goToLogoutPage();
        await loginPage.performLogin(student.login, student.password);
        await this.goToHomeworkListPage();
        await waitHelpers.waitAndClick(`*=${taskName}`);
        await waitHelpers.waitAndClick('a*=Bewertung');

        await this.canSeeFile(file);

        // ensure the student can download the file
        await waitHelpers.waitAndClick(`a*=${
            file.name
            }`);
        await driver.pause(1000);
        const studentFileUrl = await this.getCurrentTabUrl();

        // After all the redirect, the localstack filepath should be the same (ignoring the auth-arguments in the query)
        expect(studentFileUrl.origin).to.equal(fileUrl.origin);
        expect(studentFileUrl.pathname).to.equal(fileUrl.pathname);
    },

    canSeeFile: async function (file) {
        const gradeFilesList = await driver.$('.list-group-files');
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
