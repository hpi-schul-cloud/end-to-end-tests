'use strict';
/* Anlegen eines Kurses, Hinzufügen von einzelnen Schülern zu Kurs, Hinzufügen von Klasse zu Kurs, Hinzufügen von Vertretungslehrer*/

let addPupilToTheCourse = require('../page-objects/addPupilToTheCourse');
let teacherLogin = require('../page-objects/teacherLogin');
let TeacherLoginSteps = require('../step_definitions/teacherLogin-steps');
let loginData = require('../shared-objects/loginData');
let courseData = require('../shared-objects/courseData');
let shared = { loginData };
let courseCount;

Given(/^teacher arrives on the Schul-Cloud page$/, function() {
  return helpers.loadPage(shared.loginData.url, 10);
});
When(/^teacher is logged in (.*),(.*) successfully$/, function(
  username,
  password
) {
  return teacherLogin.performLogin(username, password);
});

When('teacher goes to courses page', function() {
  return helpers.loadPage(courseData.url, 20);
});

Then(/^teacher sees existing courses$/, async function() {
  return (courseCount = await addPupilToTheCourse.count());
});

Then(/^teacher clicks the btn$/, function() {
  return addPupilToTheCourse.clickAdd();
});

Then(/^teacher enters a (.*)$/, function(courseName) {
  return addPupilToTheCourse.inputCourseName(courseName);
});
Then(/^teacher chooses a color of the course$/, function() {
  return addPupilToTheCourse.chooseColor();
});
Then(/^teacher sets the sub.teacher$/, function() {
  return addPupilToTheCourse.addVertretung();
});

Then(/^teacher sets the representative of the course$/, function() {
  return addPupilToTheCourse.setRepresentative();
});

Then(/^teacher clicks the "Next" button$/, function() {
  return addPupilToTheCourse.nextButton();
});
Then(/^teacher adds pupils to the course$/, function() {
  return addPupilToTheCourse.addPupils();
});
Then(/^teacher adds a class to the course$/, function() {
  return addPupilToTheCourse.addClass();
});

Then(/^teacher clicks next$/, function() {
  return addPupilToTheCourse.createCourseAndNext();
});

Then(/^teacher clicks to preview$/, function() {
  return helpers.loadPage(courseData.url, 10);
});

Then(/^teacher sees the created course and the added pupil$/, async function() {
  return addPupilToTheCourse.clickPupilIcon();
});
Then(/^teacher closes the info window$/, async function() {
  return addPupilToTheCourse.closeWindow();
});
