'use strict';


const addPupilToTheCourse = require('../page-objects/addPupilToTheCourse');
const teacherLogin = require('../page-objects/teacherLogin');
const createCourse = require('../page-objects/createCourse');
const Login = require('../shared-objects/loginData');

Given(/^teacher arrives on the Schul-Cloud page$/, function () {
	return helpers.loadPage(Login.url, 10);
});
Given(/^teacher is logged in successfully$/, function () {
	return teacherLogin.performLogin(Login.defaultTeacherUsername, Login.defaultTeacherpassword);
});

Given('teacher goes to courses page', function () {
	return createCourse.goToCourses();
});
When(/^teacher creates a course (.*) and adds student (.*)to this course$/, async function (courseName, studentName) {
	return createCourse.createCourseWithStudents(courseName, studentName);
});

Then(/^teacher clicks the participants icon in the course (.*) and sees the added student (.*) there.$/, async function (courseName, studentName) {
	return addPupilToTheCourse.verify(courseName, studentName);
});
