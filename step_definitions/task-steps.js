'use strict';
const path = require('path');
const addEditHomeworkPage = require('../page-objects/pages/HMWRKAddEditHomeworkPage.js');
const taskListPage = require('../page-objects/pages/HMWRKHomeworkListPage');
const taskPage = require('../page-objects/pages/HMWRKHomeworkPage');
const addCoursePage = require("../page-objects/pages/coursePages/CRSSAddCoursePage");
const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");
const generalCoursePage = require('../page-objects/pages/coursePages/CRSSGeneralCoursePage');
const courseHomeworksPage = require("../page-objects/pages/coursePages/CRSSCourseHomeworksPage");
const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');
const navigationTopPage = require('../page-objects/pages/NavigationTopPage');
/* Given */
Given('teacher creates one course with name {string}', async function (string) {
    return addCoursePage.createCourse(string);
});

/*  @createTaskForStudents */    

When('teacher clicks create-a-new-task-button in the course {string}', function (string) {
    return courseHomeworksPage.clickAddNewTaskInCourse(string);
});

When(/^.* pastes name (.*) of the task$/, function (taskname) {
    return addEditHomeworkPage.setTaskName(taskname);
});
When(/^.* clicks on "enable group submission" checkbox$/, function () {
    return addEditHomeworkPage.clickTeamSubmissionsCheckbox();
});
When(/^.* sets accomplish time for the task$/, function () {
    return addEditHomeworkPage.setAccomplishTime();
});

When(/^.* pastes text (.*) of the task$/, function (taskText) {
    return addEditHomeworkPage.setHomeworkText(taskText)
});
When(/^.* clicks submit-task-button$/, function () {
    return addEditHomeworkPage.clickSubmitHomeworkBtn();
});
Then(/^the hometask with (.*) is to be found at the task pannel$/, function (taskname) {
    return taskListPage.goToHomeworkListAndCheckTaskIfExist(taskname);
});

/* createPrivateTask */

When(/^.* clicks edit-the-course-button in the course (.*)$/, async function (coursename) {
    await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
    await  generalCoursePage.clickEditCourse();
});

Given(/^.* adds a student with name (.*) to the course$/, function (studentname) {
    return addCoursePage.selectStudent(studentname);
});

When(/^teacher creates a private hometask in the course (.*) with (.*)$/, async function (coursename, taskname) {
    await addEditHomeworkPage.addPrivateHometask(coursename, taskname);
    await taskListPage.goToPrivateHomeworkArea();
    const msg = 'Task with name: "' + taskname + '" should be visible on the list.' + '\n' + 'Actual list of tasks: ';
    expect(await taskListPage.isTaskVisible(taskname), msg + await taskListPage.getAllTasks() + "'").to.equal(true);
    await navigationTopPage.performLogout();
});

Then(/^the student will not see this task with (.*)$/, async function (taskname) {
    await taskListPage.goToPrivateHomeworkArea();
    const msg = 'Task with name: "' + taskname + '" should not be visible on the list.' + '\n' + 'Actual list of tasks: ';
    expect(await taskListPage.isTaskVisible(taskname), msg + await taskListPage.getAllTasks() + "'").to.equal(false);
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
When(/^the teacher puts in data (.*) and some text description of the task$/, function (taskname) {
    return addEditHomeworkPage.addBasicHometask(taskname);
});
When(/^the user goes to the course (.*) where the task (.*) must be submitted$/, function (coursename, taskname) {
    return addEditHomeworkPage.uploadHomework();
});
Then(/^the students can upload a file as a solution$/, function () {
    return addEditHomeworkPage.uploadHomework();
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
})

Given(/^the teacher has posed a task$/, function () {
    return addEditHomeworkPage.addBasicHometask(courseName, taskName);
 });

Given(/^the student has submitted that task$/, function () {
    return taskPage.submitHomework(taskName, student);
});

When(/^the teacher uploads file feedback$/, function () {
    return taskPage.submitFileFeedback(taskName, file);
});

Then(/^both the teacher and student can see and download the feedback$/, function () {
    return taskPage.testFileUploadSuccess(taskName, file, student);
});

