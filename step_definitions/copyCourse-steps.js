'use strict';
const teacherLogin = require('../page-objects/teacherLogin');
const createCourse = require('../page-objects/createCourse');

const copyCourse = require('../page-objects/copyCourse');
const courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');
const firstLogin = require('../shared_steps/firstLogin.js');
let coursesCount; 


//________Background_________

Given(/^teacher goes to the home page$/, function() {
  return helpers.loadPage(courseData.urlLogin, 20);
});
Given(/^teacher is successfully logged in/, function() {
  return teacherLogin.performLogin(Login.defaultTeacherUsername,Login.defaultTeacherpassword);
});
Given(/^teacher has accepted the data protection agreement$/, function() {
  return firstLogin.firstLoginTeacher();
});
Given(/^goes the course page$/, function() {
  return helpers.loadPage(courseData.urlCourses, 20);
});

// _________Copy__________

Given(/^the teacher creates a course with name (.*) and$/, function(coursename) {
  return createCourse.createCourse(coursename);
});

Given(/^the amount of courses is x$/, async function() {
  coursesCount = await copyCourse.countCourses();
});

When(/^the teacher selects the course (.*) and clicks clone it$/, function(coursename) {
  return copyCourse.copyCourse(coursename);
});
Then(/^the amount of courses is implemented$/, async function() {
  let coursesCountAfterCloning = await copyCourse.countCourses();
  await expect(coursesCount+1).to.equal(coursesCountAfterCloning);
});

// _________With Text__________
Given(/^the teacher creates some with name (.*)$/, function(coursename) {
  return createCourse.createCourse(coursename);
});
Given(/^the teacher chooses the created course with (.*) and$/, function(coursename) {
  return copyCourse.chooseCourse(coursename);
});
When(/^the teacher adds a topic with name (.*)$/, function(topicname) {
  return copyCourse.addTopic(topicname);
});
When(/^the teacher adds some Text (.*) to the course$/, function(text) {
  return copyCourse.addText(text);
});

When(/^the teacher clicks copy course (.*) with Text$/, function(coursename) {
  return copyCourse.copyCourse(coursename);
});

When(/^teacher sees the course (.*) was copied and the topic (.*) is still availiable$/,function(coursename, topicname) {
    return copyCourse.verify(coursename, topicname);
  });

// _________With GeoGebraArbeitsblatt__________
Given(/^the teacher creates one course with name (.*) and$/, function(coursename) {
  return createCourse.createCourse(coursename);
});
Given(/^the teacher chooses the course with (.*) and$/, function(coursename) {
  return copyCourse.chooseCourse(coursename);
});
Given(/^the teacher adds a topic with topicname (.*) and$/, function(topicname) {
  return copyCourse.addTopic(topicname);
});

When(/^the teacher adds some GeoGebraArbeitsblatt with id (.*) to the course$/, function(geogebraID) {
  return copyCourse.addGeoGebraArbeitsblatt(geogebraID);
});
When(/^the teacher clicks copy course (.*) with GeoGebraArbeitsblatt$/, function(coursename) {
  return copyCourse.copyCourse(coursename);
});
Then(/^teacher sees the course (.*) copy and the GeoGebraArbeitsblatt (.*) is still availiable$/,function(coursename, topicname) {
    return copyCourse.verify(coursename, topicname);
  });

// _________With Material__________
When(/^the teacher adds some Material to the course$/, function() {
  return 'not implemented';
});
When(/^the teacher clicks copy course with Material$/, function() {
  return 'not implemented';
});
When(
  /^teacher sees the course copy and the Material is still availiable$/,
  function() {
    return 'not implemented';
  }
);

// _________With NeXboard__________
When(/^the teacher adds some NeXboard to the course$/, function() {
  return copyCourse.addNeXboard();
});
When(/^the teacher clicks copy course with NeXboard$/, function() {
  return copyCourse.copyCourse();
});
When(
  /^teacher sees the course copy and the NeXboard is still availiable$/,
  function() {
    return copyCourse.verify();
  }
);

// _________With Etherpad__________
When(/^the teacher adds some Etherpad to the course$/, function() {
  return copyCourse.addEtherpad();
});
When(/^the teacher edits the content of the etherpad$/, function() {
  return copyCourse.editEtherpad();
});
When(/^the teacher clicks copy course with Etherpad$/, function() {
  return copyCourse.copyCourse();
});
When(
  /^teacher sees the course copy and the Etherpad is still availiable$/,
  function() {
    return copyCourse.verify();
  }
);
// _________With InternComponents__________
When(/^the teacher adds some InternComponents to the course$/, function() {
  return 'not implemented';
});
When(/^the teacher clicks copy course with InternComponents$/, function() {
  return 'not implemented';
});
When(/^teacher sees the course copy and the InternComponents is (are) still availiable$/, function() {
  return 'not implemented';
});

// _________With pupils__________
When(/^the teacher copies the course with pupils$/, function() {
  return copyCourse.copyCourse();
});
Then(
  /^the teacher should see the cloned course but without pupils$/,
  function() {
    return copyCourse.verifyPupils();
  }
);
