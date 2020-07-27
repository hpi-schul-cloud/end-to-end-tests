'use strict';
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const createCourse = require('../page-objects/createCourse');
const startPage = require('../page-objects//pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const copyCourse = require('../page-objects/copyCourse');
const courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
let coursesCount;


//________Background_________
Given(/^the Teacher is successfully logged in/, async function() {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(Login.defaultTeacherUsername,Login.defaultTeacherpassword);
});
Given(/^teacher has accepted the data protection agreement$/, function() {
	return firstLogin.firstLoginTeacher();
});
Given(/^goes the course page$/, function() {
	return elementHelpers.loadPage(courseData.urlCourses, 20);
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
When(/^the teacher adds a Topic with name (.*)$/, function(topicname) {
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

// _________With GeoGebra__________

When(/^the teacher adds some GeoGebraArbeitsblatt with id (.*) to the course$/, function(geogebraID) {
	return copyCourse.addGeoGebra(geogebraID);
});
When(/^the teacher clicks copy course (.*) with GeoGebraArbeitsblatt$/, function(coursename) {
	return copyCourse.copyCourse(coursename);
});
Then(/^teacher sees the course (.*) copy and the GeoGebraArbeitsblatt (.*) is still availiable$/,function(coursename, topicname) {
		return copyCourse.verify(coursename, topicname);
	});

// _________With Material__________
Given(/^the teacher creates a course with name (.*),$/, function(coursename) {
	return createCourse.createCourse(coursename);
});
Given(/^the teacher chooses this course with (.*) and$/, function(coursename) {
	return copyCourse.chooseCourse(coursename);
});
Given(/^the teacher adds a topic with (.*)$/, function(topicname) {
	return copyCourse.addTopic(topicname);
});

When(/^the teacher adds some Material  to the course$/, function() {
	return copyCourse.addMaterial();
});
When(/^the teacher clicks copy course (.*) with Material$/, function(coursename) {
	return copyCourse.copyCourse(coursename);
});
Then(/^teacher sees the course (.*) copy and the material (.*) is still availiable$/,function(coursename, topicname) {
	return copyCourse.verify(coursename, topicname);
});



// _________With Etherpad__________
When(/^the teacher adds some Etherpad with (.*) and (.*) to the course$/, function(etherpadName, etherpadDescription) {
	return copyCourse.addEtherpad(etherpadName, etherpadDescription);
});
When(/^the teacher clicks copy course (.*) with Etherpad$/, function(coursename) {
	return copyCourse.copyCourse(coursename);
});
Then(/^teacher sees the course (.*) copy and the Etherpadd (.*) is still availiable$/, function(coursename, topicname) {
	return copyCourse.verify(coursename, topicname);
});


// _________With pupils__________
Given(/^the teacher creates a course with name (.*) and student (.*)$/, function(coursename, studentname) {
	return createCourse.createCourseWithStudents(coursename, studentname);
});
When(/^the teacher copies the course (.*) with students$/, function(coursename) {
	return copyCourse.copyCourse(coursename);
});
Then(/^the teacher should see the cloned course (.*) but without students$/, function(coursename) {
		return copyCourse.verifyCopyWithStudents(coursename);
	});
