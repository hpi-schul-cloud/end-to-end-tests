'use strict';
const path = require('path');
const addEditTaskPage = require('../page-objects/pages/TASKAddEditTaskPage.js');
const taskListPage = require('../page-objects/pages/TASKListPage');
const taskPage = require('../page-objects/pages/TASKPage');
const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");
const courseHomeworksPage = require("../page-objects/pages/coursePages/CRSSCourseHomeworksPage");
const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');



When(/^.* clicks Create-a-new-task-button in the course '(.*)'$/, async function (coursename) {

    await courseListPage.goToCourses();
    await  courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
    await taskPage.gotoTasksTab();
    await taskListPage.clickCreateTaskButtonInTheCourse()
});

When(/^.* clicks on Enable-group-submission checkbox$/, async function () {
    await addEditTaskPage.clickTeamSubmissionsCheckbox();
});

When(/^.* sets accomplish time for the task$/, async function () {
    await addEditTaskPage.setAccomplishTime();
});

When(/^.* clicks submit-task-button$/, async function () {
    await addEditTaskPage.clickSubmitHomeworkBtn();
});

When(/^.* clicks on Private-task checkbox$/, async function () {
    await addEditTaskPage.clickPrivateHomeworkCheckbox();
});

Then(/^task with name '([^']*)' is not visible on the list$/, async function (taskname) {

    let tasksOnPage = await taskListPage.getTaskNames();
    expect(tasksOnPage).not.to.include(taskname)
});
Then(/^task with name '([^']*)' is visible on the list$/, async function (taskname) {

    let tasksOnPage = await taskListPage.getTaskNames();
    expect(tasksOnPage).to.include(taskname)
});

Then(/^the students can upload a file as a solution$/, async function () {
    await addEditTaskPage.uploadHomework();
});

Then(/^.* evaluates the task$/, async function () {
    await taskPage.clickEvaluationTab()
    await taskPage.evaluateTheTask()
});

Then(/^.*should see the evaluation$/, async function () {
    await taskPage.clickOpenFeedbackTab();
    const actualEvaluation = await taskPage.getEvaluation();
    const expectedValueString = taskPage.evaluation + '%'
    await expect(actualEvaluation).to.equal(expectedValueString)
});

(function () {
    const courseName = 'file feedback';
    const taskName = 'Art task';
    const file = {
        path: path.join(__dirname, '../shared-objects/fileUpldFolder/upload.txt'),
        name: 'upload.txt'
    };
    const student = {
        login: 'paula.meyer@schul-cloud.org',
        password: 'Schulcloud1!'
    };

Given(/^.* submits solution for the task$/, async function () {
    await taskPage.submitHomework();
});

When(/^the teacher uploads file feedback$/, async function () {
    await taskPage.submitFileFeedback(file);
});
 
When(/^.* clicks on task with name '(.*)'$/, async function (taskName) {
    await taskListPage.sortHometasks();
    await taskListPage.clickOnTask(taskName, 'Task open');
});

When(/^.* goes to evaluation tab$/, async function () {
    await taskPage.clickEvaluationTab();
});

When(/^.* can see the file evaluation$/, async function () {
    await taskPage.checkFileEvaluationTeacher(file)
});
When(/^.* goes to task evaluation$/, async function () {
    await taskPage.clickOpenFeedbackTab();
});
When(/^.* file evaluation is visible$/, async function () {
    await taskPage.checkFileEvaluationStudent(file)
});
})();
