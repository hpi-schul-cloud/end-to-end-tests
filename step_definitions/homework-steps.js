'use strict';
let teacherLogin = require('../page-objects/teacherLogin');
let createCourse = require('../page-objects/createCourse');

let copyCourse = require('../page-objects/copyCourse');
let homework = require('../page-objects/homework');
let courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');

const { After, Before, AfterAll, BeforeAll } = require('cucumber');
Given(/^the teacher starts on the login page$/, function() {
  return helpers.loadPage(courseData.url2, 20);
});

Given(/^the teacher is logged-in successfully$/, function() {
  return teacherLogin.performLogin(
    Login.deafultTeacherUsername,
    Login.defaultTeacherpassword
  );
});

Given(/^the teacher goes to the course page as a next step$/, function() {
  return helpers.loadPage(courseData.url, 20);
});

Given(/^the teacher creates one course$/, function() {
  var name = 'Hausaufgabe test';
  return copyCourse.create(name);
});
When(/^teacher clicks "create a new home task"$/, function() {
  return homework.addBasicHomework();
});
When(/^teacher puts some text$/, function() {
  return homework.setHometaskText();
});
Then(/^the hometask is to be found at the task pannel$/, function() {
  return homework.verify();
});

/* PRIVATE */

When(/^teacher creates a private hometask$/, function() {
  return homework.privateHometask();
});
Then(/^if any pupil of this course goes to hometasks$/, function() {
  return homework.checkWithPupil();
});
Then(/^the pupil will not see this task$/, function() {
  return homework.privateTaskVerify();
});

/* SUBMISSION */
When(/^the teacher creates a basic text homework$/, function() {
  return homework.addBasicHomework();
});
When(/^the pupil edits a text hometask$/, function() {
  return homework.pupilEditsTextHomework();
});
Then(/^the teacher should see the changes been done$/, function() {
  return homework.teacherCanSeeTheTextSubmission();
});
