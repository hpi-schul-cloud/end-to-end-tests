'use strict';

const createCourse = require('../page-objects/createCourse');
const teacherLogin = require('../page-objects/teacherLogin');
const loginData = require('../shared-objects/loginData');
const shared = { loginData };
const Login = require('../shared-objects/loginData');

Given(/^The teacher arrives on the Schul-Cloud page$/, function() {
	return helpers.loadPage(shared.loginData.url, 10);
});
Given(/^the teacher is logged in successfully$/, function() {
	return teacherLogin.performLogin(Login.defaultTeacherUsername, Login.defaultTeacherpassword);});
When(/^the teacher goes to add-courses page$/, function() {
return createCourse.goToAddCourses()
});
When(/^the teacher enters a (.*)$/, function(coursename) {
	return createCourse.setCourseName(coursename);
});
Then(/^the teacher chooses a color of the course$/, function() {
	return createCourse.setColour();
});
Then(/^the teacher clicks the create button$/, function() {
	return createCourse.goToNextSectionCreateCourse();
});
Then(/^the teacher clicks to preview$/, function() {
return createCourse.goToNextSectionCreateCourse();
});
Then(/^the teacher sees the created course (.*)$/, async function(courseName) {
	return createCourse.verify(courseName);
});
