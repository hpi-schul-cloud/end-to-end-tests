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
When(/^the teacher goes to courses page$/, function() {
return createCourse.goToCourses()
});
Then(/^the teacher should see 2 buttons: import-course and create-course$/, function() {
	return createCourse.areSelectorsOnThePage();
});

When(/^teacher clicks create-a-course button$/, function() {
	return createCourse.clickCreateCourseBtn();
});

When(/^the teacher enters a (.*)$/, function(coursename) {
	return createCourse.setCourseName(coursename);
});
When(/^the teacher chooses a color of the course$/, function() {
	return createCourse.setColour();
});
When(/^the teacher clicks the create button$/, function() {
	return createCourse.goToNextSectionCreateCourse();
});
When(/^the teacher clicks to preview$/, function() {
return createCourse.goToNextSectionCreateCourse();
});
Then(/^the teacher sees the created course (.*)$/, async function(courseName) {
	return createCourse.verify(courseName);
});
Then(/^the teacher sees the created course$/, async function(courseName) {
	return createCourse.verify(courseName);
});
When(/^the teacher does not submit any course name and clicks weiter-button$/, async function() {
	return createCourse.goToNextSectionCreateCourse();

});
Then(/^the teacher cannot go to section 2$/, async function() {
	return createCourse.cannotProceedToStage(2);

});

