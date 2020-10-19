'use strict';
const path = require('path');
const addEditHomeworkPage = require('../page-objects/pages/HMWRKAddEditHomeworkPage.js');
const homeworkListPage = require('../page-objects/pages/HMWRKHomeworkListPage');
const homeworkPage = require('../page-objects/pages/HMWRKHomeworkPage');
const addCoursePage = require('../page-objects/pages/coursePages/CRSSAddCoursePage');
const courseListPage = require('../page-objects/pages/coursePages/CRSSCourseListPage');
const courseHomeworksPage = require('../page-objects/pages/coursePages/CRSSCourseHomeworksPage');
const navigationTopPage = require('../page-objects/pages/NavigationTopPage');

/* CREATE A BASIC HOMEWORK */

When(/^.* creates one course with name (.*)$/, function (coursename) {
	return addCoursePage.createCourse(coursename);
});

When(/^.* clicks "create a new home task" in course (.*) with (.*)$/, function (coursename, taskname) {
	return addEditHomeworkPage.addBasicHometask(coursename, taskname);
});

Then(/^.* hometask with (.*) is to be found at task pannel$/, function (taskname) {
	return homeworkListPage.goToHomeworkListAndCheckTaskIfExist(taskname);
});

/* PRIVATE */

Given(/^.* creates one course with (.*) and student with (.*)$/, function (coursename, studentname) {
	return addCoursePage.createCourseWithStudents(coursename, studentname);
});

When(/^.* creates a private hometask in course (.*) with (.*)$/, async function (coursename, taskname) {
	await addEditHomeworkPage.addPrivateHometask(coursename, taskname);
	await homeworkListPage.goToPrivateHomeworkArea();
	await homeworkListPage.isTaskVisible(taskname);
	await navigationTopPage.performLogout();
});

Then(/^.* will not see this task with (.*)$/, async function (taskname) {
	await homeworkListPage.goToPrivateHomeworkArea();
	await homeworkListPage.isTaskNotVisible(taskname);
});

/* SUBMISSION */
When(/^.* finds (.*)$/, function (taskname) {
	return homeworkListPage.clickOnTaskButton(taskname, 'Task open');
});

When(/^.* with (.*), (.*) of this course (.*) goes to hometasks$/, function (username, password, coursename) {
	return courseListPage.studentLogsInAndGoesToTasksOfTheCourse(
		username,
		password,
		coursename,
		courseListPage.section.activeCourses
	);
});

When(/^.* edits a text hometask and submits it$/, function () {
	return homeworkPage.studentEditsTextHomeworkAndSubmits();
});
Then(/^.* can see submission in course (.*) of task (.*) done by student (.*) and$/, function (
	coursename,
	taskname,
	studentname
) {
	return homeworkPage.teacherLogsInAndCanSeeTheTextSubmission(coursename, taskname, studentname);
});

/* File homework submission*/
When(/^.* creates a homework for course (.*)$/, function (coursename) {
	return courseHomeworksPage.clickAddNewTaskInCourse(coursename);
});
When(/^.* puts in data (.*) and some text description of task$/, function (taskname) {
	return addEditHomeworkPage.addBasicHometask(taskname);
});
When(/^.* goes to course (.*) where hometask (.*) must be submitted$/, function (coursename, taskname) {
	return addEditHomeworkPage.uploadHomework();
});
Then(/^.* can upload a file as a solution$/, function () {
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

    Given(/^.* posed a homework$/, function () {
        return addEditHomeworkPage.addBasicHometask(courseName, taskName);
	});
	
	Given(/^.* submitted that homework$/, function () {
        return homeworkPage.submitHomework(taskName, student);
	});
	
	When(/^.* uploads file feedback$/, function () {
        return homeworkPage.submitFileFeedback(taskName, file);
	});
	
	Then(/^teacher and student can see and download feedback$/, function () {
        return homeworkPage.testFileUploadSuccess(taskName, file, student);
    });
})();
