/*[url/homework/[homeworkId]]*/
'use strict';
const waitHelpers = require('../runtime/helpers/waitHelpers.js');
const courseData = require('../shared-objects/courseData');
const copyCourse = require('../page-objects/copyCourse');
const firstLogin = require('../shared_steps/firstLogin.js');
const createCourse = require('../page-objects/createCourse');
const courseListPage = require('../page-objects/pages/coursePages/CRSSCourseListPage');

module.exports = {

    // student helpers
    userFindsTheTask: async function (taskname) {
        let areThereAnyTasks = await driver.$$('#homeworks > ol > div > li');
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
        let submissionTab = "#submission-tab-link";
        await waitHelpers.waitAndClick(submissionTab);
    },

    submitSolutionForTheHometask: async function () {
        await driver.switchToFrame(0);
        let iframeBody = await driver.$('body');
        let assignmentText = 'here is some text which I want to submit';
        await iframeBody.setValue(assignmentText);
        await driver.switchToParentFrame();
        let container = await driver.$('#submission');
        let submitBtn = await container.$('button[type="submit"]');
        await waitHelpers.waitAndClick(submitBtn);
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
        await this.teacherLogsIn();
        await firstLogin.firstLoginTeacher();
        await createCourse.goToCourses();
        await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
        await this.gotoTasksTab();
        await this.userFindsTheTask(taskname);
        await this.hasTheStudentSubmittedTheTask(studentname);
    },

    evaluateSubmission: async function () {
        let submittedTasks = await driver.$('.usersubmission');
        await submittedTasks.click();
        let evaluationTab = await driver.$('#comment-tab-link');
        await evaluationTab.click();
        let evaluation = await driver.$(courseData.elem.evaluationInProcent);
        await evaluation.setValue(95);
        await driver.switchToFrame(0);
        let body = await driver.$('body');
        let comment = 'sehr gut!';
        await body.setValue(comment);
        await driver.switchToParentFrame();
    },
}
