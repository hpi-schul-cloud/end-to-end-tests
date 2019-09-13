'use strict';
/* Anlegen eines Kurses, Hinzufügen von einzelnen Schülern zu Kurs, Hinzufügen von Klasse zu Kurs, Hinzufügen von Vertretungslehrer*/

let addPupilToTheCourse = require('../page-objects/addPupilToTheCourse');
let teacherLogin = require('../page-objects/teacherLogin');
let copyCourse = require('../page-objects/copyCourse');
let loginData = require('../shared-objects/loginData');
let courseData = require('../shared-objects/courseData');
let shared = { loginData };
let pupilName;

const Login = require('../shared-objects/loginData');

Given(/^teacher arrives on the Schul-Cloud page$/, function() {
  return helpers.loadPage(shared.loginData.url, 10);
});
Given(/^teacher is logged in successfully$/, function() {
  return teacherLogin.performLogin(
    Login.defaultTeacherUsername,
    Login.defaultTeacherpassword
  );
});

Given('teacher goes to courses page', function() {
  let url = courseData.urlCourses;
  return helpers.loadPage(url, 20);
});
When(
  /^teacher creates a course (.*) and adds pupils to this course$/,
  async function(name) {
    return copyCourse.create(name);
  }
);
When(/^teacher clicks the participants icon$/, async function() {
  return addPupilToTheCourse.clickPupilIcon();
});
When(/^teacher added a certain pupil$/, async function() {
  pupilName = await addPupilToTheCourse.whatName();
});
Then(/^he should see the pupil in this course$/, async function() {
  const memberNames = await addPupilToTheCourse.verify();
  expect(memberNames).to.include(pupilName);
});
