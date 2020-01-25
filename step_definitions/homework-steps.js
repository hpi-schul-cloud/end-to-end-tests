'use strict';
const teacherLogin = require('../page-objects/teacherLogin');
const copyCourse = require('../page-objects/copyCourse');
const createCourse = require('../page-objects/createCourse');
const homework = require('../page-objects/homework');
const courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');

/*BACKGROUND*/ 

Given(/^the teacher starts on the login page$/, function() {
  return helpers.loadPage(courseData.urlLogin, 20);
});

Given(/^the teacher is logged-in successfully$/, function() {
  return teacherLogin.performLogin(Login.defaultTeacherUsername,Login.defaultTeacherpassword)});

Given(/^the teacher goes to the course page as a next step$/, function() {
  return helpers.loadPage(courseData.urlCourses, 20);
});


/* CREATE A BASIC HOMEWORK */

When(/^the teacher creates one course with (.*) and$/, function(coursename) {
  return createCourse.createCourse(coursename)
});

When(/^teacher clicks "create a new home task" in the course (.*) with (.*)$/, function(coursename, taskname) {
  return homework.addBasicHometask(coursename, taskname)
});

Then(/^the hometask with (.*) is to be found at the task pannel$/, function(taskname) {
  return homework.verify(taskname);
});

/* PRIVATE */

Given(/^the teacher creates one course with (.*) and student with (.*)$/, function(coursename, studentname) {
  return createCourse.createCourseWithStudents(coursename, studentname);
});

When(/^teacher creates a private hometask in the course (.*) with (.*)$/, function(coursename, taskname) {
  return homework.addPrivateHometask(coursename,taskname);
});
When(/^student with (.*), (.*) of this course (.*) goes to hometask (.*)$/, function(username, password, coursename, taskname) {
  return homework.logInAndGoToTasksOfTheCourse(username, password, coursename, taskname);
});
Then(/^the pupil will not see this task with (.*)$/, function(taskname) {
  return homework.privateTaskVerify(taskname);
});

/* SUBMISSION */
When(/^the teacher creates a basic text homework with (.*)$/, function(taskname) {
  return homework.addBasicHomework(taskname);
});
When(/^the pupil edits a text hometask$/, function() {
  return homework.pupilEditsTextHomework();
});
Then(/^the teacher should see the changes been done$/, function() {
  return homework.teacherCanSeeTheTextSubmission();
});
Then(/^the teacher can evaluate it$/, function() {
  return homework.evaluateSubmission();
});

/* File homework submission*/
Given(/^the Teacher creates one course with (.*) and pupil with:$/, function(coursename) {
  return copyCourse.create(coursename);
}); 
When(/^Teacher creates a homework for the course (.*)$/, function(coursename) {
  return homework.clickCreateNewTaskInTheCourse(coursename);
});
When(/^the teacher puts in data (.*) and some text description of the task$/, function(taskname) {
  return homework.addBasicHometask(taskname);
});

When(/^the User logs in with (.*) (.*) and$/, function(username, password) {
  return homework.pupilLogsIn(username, password);
});
When(/^the user goes to the course (.*) where the hometask (.*) must be submitted$/, function(coursename, taskname) {
  return homework.uploadAHomework();
});
Then(/^the students can upload a file as a solution$/, function() {
  return homework.uploadAHomework();
});
