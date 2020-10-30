'use strict';
const path = require('path');
const addEditHomeworkPage = require('../page-objects/pages/HMWRKAddEditHomeworkPage.js');
const homeworkListPage = require('../page-objects/pages/HMWRKHomeworkListPage');
const homeworkPage = require('../page-objects/pages/HMWRKHomeworkPage');
const courseListPage = require('../page-objects/pages/coursePages/CRSSCourseListPage');
const courseHomeworksPage = require('../page-objects/pages/coursePages/CRSSCourseHomeworksPage');
const navigationTopPage = require('../page-objects/pages/NavigationTopPage');

/* CREATE A BASIC HOMEWORK */
When(/^.* clicks "create a new home task" in course '([^']*)' with '([^']*)'$/, function (coursename, taskname) {
	return addEditHomeworkPage.addHomework(coursename, taskname, false);
});

Then(/^.* hometask with '([^']*)' is to be found at task pannel$/, function (taskname) {
	return homeworkListPage.goToHomeworkListAndCheckTaskIfExist(taskname);
});

/* PRIVATE */
When(/^.* creates a private homework in course '([^']*)' with '([^']*)'$/, async function (coursename, taskname) {
	await addEditHomeworkPage.addHomework(coursename, taskname, true);
});

Then(/^.* '([^']*)' homework with name '([^']*)'$/, async function (expectedValue, taskName) {
	await homeworkListPage.goToPrivateHomeworkArea();
	await homeworkListPage.isTaskVisible(expectedValue, taskName);
});

/* SUBMISSION */
When(/^.* finds task with name '([^']*)'$/, async function (taskname) {
	await homeworkListPage.clickOnTask(taskname, "Task open");
});

When(/^.* with '([^']*)', '([^']*)' of this course '([^']*)' goes to hometasks$/, function (username, password, coursename) {
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

When(/^.* clicks action button '([^']*)' on task with name '([^']*)'$/, async function (button, taskname) {
	return homeworkListPage.clickOnTask(taskname, button);
});

Then(/^.* can see submission in course '([^']*)' of task '([^']*)' done by student '([^']*)'$/, function (coursename, taskname, studentname) {
	return homeworkPage.teacherLogsInAndCanSeeTheTextSubmission(coursename, taskname, studentname);
});

/* File homework submission*/
When(/^.* creates a homework for course '([^']*)'$/, function (coursename) {
	return courseHomeworksPage.clickAddNewTaskInCourse(coursename);
});

When(/^.* puts in data '([^']*)' and some text description of task$/, function (taskname) {
	return addEditHomeworkPage.addHomework(taskname, false);
});

When(/^.* goes to course '([^']*)' where hometask '([^']*)' must be submitted$/, function (coursename, taskname) {
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
		name: 'upload.txt',
	};
	const student = {
		login: 'paula.meyer@schul-cloud.org',
		password: 'Schulcloud1!',
	};

	Given(/^.* posed a homework$/, function () {
		return addEditHomeworkPage.addHomework(courseName, taskName, false);
	});

	Given(/^.* submitted that homework$/, function () {
		return homeworkPage.submitHomework(taskName);
	});

	When(/^.* uploads file feedback$/, function () {
		return homeworkPage.submitFileFeedback(taskName, file);
	});

	Then(/^teacher and student can see and download feedback$/, function () {
		return homeworkPage.testFileUploadSuccess(taskName, file, student);
	});
})();
Then(/^.* see created private homework with name '([^']*)'$/, async function (homeworkName) {
	await homeworkPage.isPrivateHomeworkNameVisible(homeworkName);
});
Then(/^.* see created private homework with name '([^']*)' and course name '([^']*)'$/, async function (homeworkName, courseName) {
	await homeworkPage.isCourseNameOnPrivateHomeworkVisible(homeworkName, courseName);
});
Then(/^.* see created private homework with name '([^']*)' and timeout$/, async function (homeworkName) {
	await homeworkPage.isElementOfHomeworkVisible("Timeout", homeworkName, homeworkPage.element.homeworkTimeout, true);
});
When(/^.* see '([^']*)' list on dashboard$/, function (listName) {
	return homeworkPage.isPrivateTasksAndDraftsListVisible(listName);
});
Then(/^.* not see number of completed homework on homework with name '([^']*)'$/, async function (homeworkName) {
	await homeworkPage.isElementOfHomeworkVisible("Completed", homeworkName, homeworkPage.element.homeworkCompleted, false);
});
Then(/^.* not see number of graded on homework with name '([^']*)'$/, async function (homeworkName) {
	await homeworkPage.isElementOfHomeworkVisible("Graded", homeworkName, homeworkPage.element.homeworkGraded, false);
});
