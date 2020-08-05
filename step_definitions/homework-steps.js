'use strict';
const path = require('path');

const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const copyCourse = require('../page-objects/copyCourse');
const createCourse = require('../page-objects/createCourse');
const homework = require('../page-objects/homework');
const hMWRKAddEditHomeworkPage = require('../page-objects/pages/HMWRKAddEditHomeworkPage.js');
const hMWRKHomeworkListPage = require('../page-objects/pages/HMWRKHomeworkListPage');
const courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');

/*BACKGROUND*/

Given(/^the teacher starts on the login page$/, function () {
	return elementHelpers.loadPage(Login.url, 20);
});

Given(/^the teacher is logged-in successfully$/, async function () {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(Login.defaultTeacherUsername, Login.defaultTeacherpassword);
});

Given(/^the teacher goes to the course page as a next step$/, function () {
	return elementHelpers.loadPage(courseData.urlCourses, 20);
});

/* CREATE A BASIC HOMEWORK */

When(/^the teacher creates one course with (.*) and$/, function (coursename) {
	return createCourse.createCourse(coursename);
});

When(
	/^teacher clicks "create a new home task" in the course (.*) with (.*)$/,
	function (coursename, taskname) {
		return hMWRKAddEditHomeworkPage.addBasicHometask(coursename, taskname);
	}
);

Then(/^the hometask with (.*) is to be found at the task pannel$/, function (
	taskname
) {
	return hMWRKHomeworkListPage.verify(taskname);
});

/* PRIVATE */

Given(
	/^the teacher creates one course with (.*) and student with (.*)$/,
	function (coursename, studentname) {
		return createCourse.createCourseWithStudents(coursename, studentname);
	}
);

When(
	/^teacher creates a private hometask in the course (.*) with (.*)$/,
	function (coursename, taskname) {
		return homework.addPrivateHometask(coursename, taskname);
	}
);
When(
	/^student with (.*), (.*) of this course (.*) goes to hometasks$/,
	function (username, password, coursename) {
		return homework.studentLogsInAndGoesToTasksOfTheCourse(
			username,
			password,
			coursename
		);
	}
);
Then(/^the student will not see this task with (.*)$/, function (taskname) {
	return homework.privateTaskVerify(taskname);
});

/* SUBMISSION */
When(/^the student finds (.*)$/, function (taskname) {
	return homework.userFindsTheTask(taskname);
});

When(/^the student edits a text hometask and submits it$/, function () {
	return homework.studentEditsTextHomeworkAndSubmits();
});
Then(
	/^the teacher can see the submission in course (.*) of task (.*) done by student (.*) and$/,
	function (coursename, taskname, studentname) {
		return homework.teacherLogsInAndCanSeeTheTextSubmission(
			coursename,
			taskname,
			studentname
		);
	}
);

/* File homework submission*/
Given(/^the Teacher creates one course with (.*) and pupil with:$/, function (
	coursename
) {
	return copyCourse.create(coursename);
});
When(/^Teacher creates a homework for the course (.*)$/, function (coursename) {
	return homework.clickCreateNewTaskInTheCourse(coursename);
});
When(
	/^the teacher puts in data (.*) and some text description of the task$/,
	function (taskname) {
		return homework.addBasicHometask(taskname);
	}
);
When(
	/^the user goes to the course (.*) where the hometask (.*) must be submitted$/,
	function (coursename, taskname) {
		return homework.uploadAHomework();
	}
);
Then(/^the students can upload a file as a solution$/, function () {
	return homework.uploadAHomework();
});

(function () {
	const courseName = 'file feedback';
	const taskName = 'Art homework';
	const file = {
		path: path.join(__dirname, '../shared-objects/fileUpldFolder/upload.txt'),
		name: 'upload.txt',
	};
	const student = { login: 'paula.meyer@schul-cloud.org', password: 'Schulcloud1!' };

	Given(/^the teacher has posed a homework$/, function () {
		return homework.addBasicHometask(courseName, taskName);
	});

	Given(/^the student has submitted that homework$/, function () {
		return homework.submitHomework(taskName, student);
	});

	When(/^the teacher uploads file feedback$/, function () {
		return homework.submitFileFeedback(taskName, file);
	});

	Then(/^both the teacher and student can see and download the feedback$/, function () {
		return homework.testFileUploadSuccess(taskName, file, student);
	});
})();
