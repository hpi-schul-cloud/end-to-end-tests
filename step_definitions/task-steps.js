'use strict';
const path = require('path');
const addEditTaskPage = require('../page-objects/pages/TASKAddEditTaskPage.js');
const taskListPage = require('../page-objects/pages/TASKListPage');
const taskPage = require('../page-objects/pages/TASKPage');
const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");
const dashboardPage = require('../page-objects/pages/DashboardPage');
const dateTimeHelpers = require('../runtime/helpers/dateTimeHelpers.js');
const file = {
    path: path.join(__dirname, '../shared-objects/fileUpldFolder/upload.txt'),
    name: 'upload.txt'
};

When(/^.* clicks Create-a-task button in the course '(.*)'$/, async function (coursename) {
    await courseListPage.goToCourses();
    await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
    await taskPage.gotoTasksTab();
    await taskListPage.clickCreateTaskButtonInTheCourse()
});

When(/^.* clicks on Enable-group-submission checkbox$/, async function () {
    await addEditTaskPage.clickTeamSubmissionsCheckbox();
});

When(/^.* sets Task-processing-end-date: today .1 day, 11:00$/, async function () {
    var endDate = await dateTimeHelpers.getCurrentFormattedDateWithOffset({days: +1, format: "dd/MM/yyyy"}) + " 11:00";
    await addEditTaskPage.setTaskProcessingEndDate(endDate);
});

When(/^.* sets Task-visibility-start-date: today, 00:00$/, async function () {
    var startDate = await dateTimeHelpers.getCurrentFormattedDateWithOffset({format: "dd/MM/yyyy"}) + " 00:00";
    await addEditTaskPage.setTaskVisibilityStartDate(startDate);
});

When(/^.* clicks on Private-task checkbox$/, async function () {
    await addEditTaskPage.clickPrivateTaskCheckbox();
});

When(/^.* clicks on Student-submissions-visible-to-each-other checkbox$/, async function () {
    await addEditTaskPage.clickPublicSubmissionsCheckbox();
});

Then(/^.* grades task with rate '([^']*)'% and remarks '([^']*)'$/, async function (rating, gradingRemarks) {
    await taskPage.gradeTask({rating: rating, gradingRemarks: gradingRemarks});
});

Then(/^.* clicks on Comment tab$/, async function () {
    await taskPage.clickCommentBtn();
});

Given(/^.* clicks on Submissions tab$/, async function () {
    await taskPage.clickTeacherSubmissionsTab();
});

Given(/^.* clicks on Submission tab$/, async function () {
    await taskPage.clickStudentSubmissionTab();
});

Given(/^.* clicks Save-and-send grading button$/, async function () {
    await taskPage.clickSaveAndSendGradingBtn();
});

Given(/^.* clicks Save-and-send submission button$/, async function () {
    await taskPage.clickSaveAndSendSubmissionBtn();
});

Given(/^.* clicks student submission contains '([^']*)'$/, async function (text) {
    await taskPage.clickOnStudentSubmissionContains(text);
});

When(/^.* teacher uploads file feedback$/, async function () {
    await taskPage.submitFileFeedback(file);
});

When(/^.* clicks on task with name '(.*)'$/, async function (taskName) {
    await taskListPage.sortTasksLastEdited();
    await taskListPage.clickOnTask(taskName, 'Task open');
});

When(/^.* clicks on Comment-Grading tab$/, async function () {
    await taskPage.clickOnCommentGradingTab();
});

Given(/^.* sets submission text '(.*)'$/, async function (submissionText) {
    await taskPage.setTextSubmision(submissionText);
});

When(/^.* goes to evaluation tab$/, async function () {
    await taskPage.clickEvaluationTab();
});

When(/^.* can see the file evaluation$/, async function () {
    await taskPage.checkFileEvaluationTeacher(file)
});

When(/^.* file evaluation is visible$/, async function () {
    await taskPage.checkFileEvaluationStudent(file)
});

Then(/^.*task rating is '([^']*)'%$/, async function (rating) {
    await taskPage.isTaskRating(rating);
});

Then(/^.*task remark is '([^']*)'$/, async function (remark) {
    await taskPage.isTaskRemark(remark);
});

Then(/^.*task with name '([^']*)' is not visible on the list$/, async function (taskName) {
	await taskListPage.isTaskVisible(taskName, false);
});
Then(/^.*task with name '([^']*)' is visible on the list$/, async function (taskName) {
    await taskListPage.isTaskVisible(taskName, true);
});




