'use strict';

const addPupilToTheCourse = require('../page-objects/addPupilToTheCourse');
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const createCourse = require('../page-objects/createCourse');
const Login = require('../shared-objects/loginData');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');

Given(/^teacher arrives on the Schul-Cloud page$/, function() {
	return elementHelpers.loadPage(Login.url, 10);
});
Given(/^teacher is logged in successfully$/, async function() {
	// await startPage.clickLoginBtn();
	await loginPage.performLogin(Login.defaultTeacherUsername,Login.defaultTeacherpassword);
});

When(/^teacher creates a course (.*) and adds student (.*)to this course$/,async function(courseName, studentName) {
		return createCourse.createCourseWithStudents(courseName, studentName);
	});

Then(/^teacher clicks the participants icon in the course (.*) and sees the added student (.*) there.$/, async function(courseName, studentName) {
	return addPupilToTheCourse.verify(courseName, studentName);
});
