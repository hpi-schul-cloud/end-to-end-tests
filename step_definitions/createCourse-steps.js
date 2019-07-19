'use strict';

let createCourse = require('../page-objects/createCourse');
let teacherLogin = require('../page-objects/teacherLogin');
let TeacherLoginSteps = require('../step_definitions/teacherLogin-steps');
let loginData = require('../shared-objects/loginData');
let courseData = require('../shared-objects/courseData');
let shared = { loginData };
let page = { teacherLogin };
let courseCount;

Given(/^The teacher arrives on the Schul-Cloud page$/, function() {
  return helpers.loadPage(shared.loginData.url, 10);
});
Given(/^the teacher is logged in successfully$/, function() {
  let username = loginData.deafultTeacherUsername;
  let password = loginData.defaultTeacherpassword;
  return createCourse.performteacherLogin(username, password);
});

When('the teacher goes to courses page', function() {
  return helpers.loadPage(courseData.url, 20);
});

Then(/^the teacher sees existing courses$/, async function() {
  return (courseCount = await createCourse.count());
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
  return helpers.loadPage(courseData.url, 10);
});

Then(/^the teacher sees the created course$/, async function() {
  let after = await createCourse.count();
  let result = after - courseCount;
  expect(result).to.equal(1);
});
