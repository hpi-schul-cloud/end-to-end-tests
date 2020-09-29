'use strict';
const path = require('path');
const addEditHomeworkPage = require('../page-objects/pages/HMWRKAddEditHomeworkPage.js');
const homeworkListPage = require('../page-objects/pages/HMWRKHomeworkListPage');
const homeworkPage = require('../page-objects/pages/HMWRKHomeworkPage');
const addCoursePage = require("../page-objects/pages/coursePages/CRSSAddCoursePage");
const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");
const courseHomeworksPage = require("../page-objects/pages/coursePages/CRSSCourseHomeworksPage");
const logoutPage = require('../page-objects/pages/generalPagesBeforeLogin/LogoutPage.js');
const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');

/* CREATE A BASIC HOMEWORK */

When(/^the teacher creates one course with (.*) and$/, function (coursename) {
    return addCoursePage.createCourse(coursename);
});

When(/^teacher clicks "create a new home task" in the course (.*) with (.*)$/, function (coursename, taskname) {
    return addEditHomeworkPage.addBasicHometask(coursename, taskname);
});

Then(/^the hometask with (.*) is to be found at the task pannel$/, function (taskname) {
    return homeworkListPage.verify(taskname);
});

/* PRIVATE */

Given(/^the teacher creates one course with (.*) and student with (.*)$/, function (coursename, studentname) {
    return addCoursePage.createCourseWithStudents(coursename, studentname);
});

When(/^teacher creates a private hometask in the course (.*) with (.*)$/, async function (coursename, taskname) {
    await addEditHomeworkPage.addPrivateHometask(coursename, taskname);
    await homeworkListPage.goToPrivateHomeworkArea();
    expect(await homeworkListPage.isTaskVisible(taskname)).to.equal(true);
    await logoutPage.goToLogoutPage();
});

Then(/^the student will not see this task with (.*)$/, async function (taskname) {
    await homeworkListPage.goToPrivateHomeworkArea();
    expect(await homeworkListPage.isTaskVisible(taskname)).to.equal(false);
});

/* SUBMISSION */
When(/^the student finds (.*)$/, function (taskname) {
    return homeworkListPage.userFindsTheTask(taskname);
});

When(/^student with (.*), (.*) of this course (.*) goes to hometasks$/, function (username, password, coursename) {
    return courseListPage.studentLogsInAndGoesToTasksOfTheCourse(username, password, coursename);
});

When(/^the student edits a text hometask and submits it$/, function () {
    return homeworkPage.studentEditsTextHomeworkAndSubmits();
});
Then(/^the teacher can see the submission in course (.*) of task (.*) done by student (.*) and$/, function (coursename, taskname, studentname) {
    return homeworkPage.teacherLogsInAndCanSeeTheTextSubmission(coursename, taskname, studentname);
});

/* File homework submission*/
Given(/^the Teacher creates one course with (.*) and pupil with:$/, function (coursename) {
    return copyCourse.create(coursename);
});
When(/^Teacher creates a homework for the course (.*)$/, function (coursename) {
	return courseHomeworksPage.clickAddNewTaskInCourse(coursename);
});
When(/^the teacher puts in data (.*) and some text description of the task$/, function (taskname) {
    return addEditHomeworkPage.addBasicHometask(taskname);
});
When(/^the user goes to the course (.*) where the hometask (.*) must be submitted$/, function (coursename, taskname) {
    return addEditHomeworkPage.uploadHomework();
});
Then(/^the students can upload a file as a solution$/, function () {
    return addEditHomeworkPage.uploadHomework();
});

(function () {
    const courseName = 'file feedback';
    const taskName = 'Art homework';
    const file = {
        path: path.join(__dirname, '../shared-objects/fileUpldFolder/upload.txt'),
        name: 'upload.txt'
    };
    const student = {
        login: 'paula.meyer@schul-cloud.org',
        password: 'Schulcloud1!'
    };

    Given(/^the teacher has posed a homework$/, function () {
        return addEditHomeworkPage.addBasicHometask(courseName, taskName);
    });

    Given(/^the student has submitted that homework$/, function () {
        return homeworkPage.submitHomework(taskName, student);
    });

    When(/^the teacher uploads file feedback$/, function () {
        return homeworkPage.submitFileFeedback(taskName, file);
    });

    Then(/^both the teacher and student can see and download the feedback$/, function () {
        return homeworkPage.testFileUploadSuccess(taskName, file, student);
    });
})();
