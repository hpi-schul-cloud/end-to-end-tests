'use strict';
/* Kurs kopieren */
let teacherLogin = require('../page-objects/teacherLogin');
let createCourse = require('../page-objects/createCourse');

let copyCourse = require('../page-objects/copyCourse');
let courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');

Given(/^teacher goes to the home page$/, function() {
  return helpers.loadPage(courseData.url2, 20);
});
Given(/^teacher is successfully logged in/, function() {
  return teacherLogin.performLogin(
    Login.deafultTeacherUsername,
    Login.defaultTeacherpassword
  );
});
Given(/^goes the course page$/, function() {
  return helpers.loadPage(courseData.url, 20);
});
When(/^the course, which must be cloned, exists$/, async function() {
  return copyCourse.doesTheCourseExist();
});
/*                      Outline                     */

When(/^the teacher selects the course by clicking it$/, function() {
  return copyCourse.chooseCourse();
});
When(/^teacher clicks "clone the course"$/, function() {
  return copyCourse.clickClone();
});
When(/^gives the name (.*)$/, function(name) {
  return copyCourse.setName(name);
});
When(
  /^teacher confirms the cloning process by clicking "Kurs klonen"$/,
  function() {
    return copyCourse.confirmClone();
  }
);
Then(/^if that was successful the status should be equal 1$/, function() {
  return copyCourse.isSucessful();
});
