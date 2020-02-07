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
When(/^student with (.*), (.*) of this course (.*) goes to hometasks$/, function(username, password, coursename) {
  return homework.studentLogsInAndGoesToTasksOfTheCourse(username, password, coursename);
});
Then(/^the student will not see this task with (.*)$/, function(taskname) {
  return homework.privateTaskVerify(taskname);
});

/* SUBMISSION */
When(/^the student finds (.*)$/, function(taskname) {
  return homework.userFindsTheTask(taskname);
});

When(/^the student edits a text hometask and submits it$/, function() {
  return homework.studentEditsTextHomeworkAndSubmits();
});
Then(/^the teacher can see the submission in course (.*) of task (.*) done by student (.*)$/, function(coursename, taskname, studentname) {
 return homework.teacherLogsInAndCanSeeTheTextSubmission(coursename, taskname, studentname);
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
  return homework.studentLogsIn(username, password);
});
When(/^the user goes to the course (.*) where the hometask (.*) must be submitted$/, function(coursename, taskname) {
  return homework.uploadAHomework();
});
Then(/^the students can upload a file as a solution$/, function() {
  return homework.uploadAHomework();
});
// student deletes homework
Then(/^the student can delete the homework submission$/, function() {
  return homework.deleteHomeworkStudent();
});
