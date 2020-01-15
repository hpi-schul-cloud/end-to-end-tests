'use strict';

const createCourse = require('../page-objects/createCourse');
const teacherLogin = require('../page-objects/teacherLogin');
const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const shared = { loginData };
const Login = require('../shared-objects/loginData');

Given(/^The teacher arrives on the Schul-Cloud page$/, function() {
  return helpers.loadPage(shared.loginData.url, 10);
});

Given(/^the teacher is logged in successfully$/, function() {
  return teacherLogin.performLogin(Login.defaultTeacherUsername, Login.defaultTeacherpassword);});

When('the teacher goes to courses page', function() {
  let url = courseData.urlCourses;
  return helpers.loadPage(url, 20);
});

Then(/^the teacher sees existing courses$/, async function() {
  return createCourse.countBefore();
});

Then(/^the teacher clicks the btn$/, function() {
  return createCourse.clickAdd();
});

Then(/^the teacher enters a (.*)$/, function(courseName) {
  return createCourse.inputCourseName(courseName);
});
Then(/^the teacher chooses a color of the course$/, function() {
  return createCourse.chooseColor();
});
Then(/^the teacher clicks the create button$/, function() {
  return createCourse.performCreateCourse();
  
});
Then(/^the teacher clicks to preview$/, function() {
  let url = courseData.urlCourses;
  return helpers.loadPage(url, 10);
});

Then(/^the teacher sees the created course$/, async function() {
  return createCourse.verify();
});
