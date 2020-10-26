'use strict';
const path = require('path');
const addEditTaskPage = require('../page-objects/pages/TASKAddEditTaskPage.js');
const taskListPage = require('../page-objects/pages/TASKListPage');
const taskPage = require('../page-objects/pages/TASKPage');
const addCoursePage = require("../page-objects/pages/coursePages/CRSSAddCoursePage");
const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");
const generalCoursePage = require('../page-objects/pages/coursePages/CRSSGeneralCoursePage');
const courseHomeworksPage = require("../page-objects/pages/coursePages/CRSSCourseHomeworksPage");
const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');
const navigationTopPage = require('../page-objects/pages/NavigationTopPage');


When(/^.* clicks create-a-new-task-button in the course (.*)$/, async function (coursename) {

    await courseListPage.goToCourses();
    await  courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
    await taskPage.gotoTasksTab();
    await taskListPage.clickCreateTaskButtonInTheCourse()
});


When(/^.* clicks on "enable group submission" checkbox$/, function () {
    return addEditTaskPage.clickTeamSubmissionsCheckbox();
});
When(/^.* sets accomplish time for the task$/, function () {
    return addEditTaskPage.setAccomplishTime();
});


When(/^.* clicks submit-task-button$/, function () {
    return addEditTaskPage.clickSubmitHomeworkBtn();
});

Then(/^the hometask with (.*) is to be found at the task pannel$/, async function (taskname) {
    await taskListPage.sortHometasks(); // last edited
    let tasks =  await  taskListPage.getTaskNames();
    expect(tasks).to.include(taskname);
});


When(/^.* clicks on "private task" checkbox$/, async function () {
    await addEditTaskPage.clickPrivateHomeworkCheckbox();
});

When(/^.* goes to the tasks section$/, async function () {
    await navigationLeftPage.clickNavItemTasks();
});

Then(/^the task (.*) should be visible for .*$/,async  function (taskname) {
    await navigationLeftPage.clickNavItemTasks();
    let tasksOnPage = await taskListPage.getTaskNames();
    expect(tasksOnPage).to.include(taskname)
});

Then(/^the task (.*) should not be visible for .*$/, async function (taskname) {
    await navigationLeftPage.clickNavItemTasks();
    let tasksOnPage = await taskListPage.getTaskNames();
    expect(tasksOnPage).not.to.include(taskname)
});

/* SUBMISSION */
When(/^the student finds (.*)$/, function (taskname) {
    return taskListPage.clickOnTaskFromList(taskname);
});

When(/^student with (.*), (.*) of this course (.*) goes to hometasks$/, function (username, password, coursename) {
    return courseListPage.studentLogsInAndGoesToTasksOfTheCourse(username, password, coursename, courseListPage.section.activeCourses);
});

When(/^the student edits a text hometask and submits it$/, function () {
    return taskPage.studentEditsTextHomeworkAndSubmits();
});
Then(/^the teacher can see the submission in course (.*) of task (.*) done by student (.*) and$/, function (coursename, taskname, studentname) {
    return taskPage.teacherLogsInAndCanSeeTheTextSubmission(coursename, taskname, studentname);
});

/* File task submission*/

Given(/^the Teacher creates one course with (.*) and pupil with:$/, function (coursename) {
    return copyCourse.create(coursename);
});
When(/^Teacher creates a task for the course (.*)$/, function (coursename) {
	return courseHomeworksPage.clickAddNewTaskInCourse(coursename);
});

When(/^the user goes to the course (.*) where the task (.*) must be submitted$/, function (coursename, taskname) {
    return addEditTaskPage.uploadHomework();
});
Then(/^the students can upload a file as a solution$/, function () {
    return addEditTaskPage.uploadHomework();
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

Given(/^.* submits solution for the task$/, function () {
    return taskPage.submitHomework(taskName, student);
});

When(/^the teacher uploads file feedback$/, function () {
    return taskPage.submitFileFeedback(taskName, file);
});

Then(/^both the teacher and student can see and download the feedback$/, function () {
    return taskPage.testFileUploadSuccess(taskName, file, student);
});
When(/^.* clicks on task with name (.*)$/, async function (taskName) {
    await taskListPage.sortHometasks();
    await taskListPage.clickOnTask(taskName, 'Task open');
});

When(/^.* goes to evaluation tab$/, async function () {
    await taskPage.goToEvaluationTab()
});

When(/^.* can see the file evaluation$/, async function () {
    await taskPage.checkFileEvaluationTeacher(file)
});
When(/^.* goes to task evaluation$/, async function () {
    await taskPage.clickCommentBtn()
});
When(/^file evaluation is visible for .*$/, async function () {
    await taskPage.checkFileEvaluationStudent(file)
});
})();
