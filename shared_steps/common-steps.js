'use strict';
const { CLIENT } = require('../shared-objects/servers');
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const createCourse = require('../page-objects/pages/coursePages/CRSSAddCoursePage')
const navigationTopPage = require('../page-objects/pages/NavigationTopPage');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');


const schulCloudURL = `${CLIENT.URL}`;
/*Login, Logout*/
const performLogin = async function(username, password) {
    await startPage.clickLoginBtn();
	await loginPage.performLogin(username, password);
};

Given(/^.* arrives on the Schul-Cloud homepage$/, function () {
	return elementHelpers.loadPage(schulCloudURL);
});

Given(/^.* logs in with email (.*) and password (.*)$/, async function (username, password) {
	await performLogin(username, password);
});

Given(/^teacher logs in$/, async function () {
	await performLogin(loginPage.users.teachers.klaraFallUsername, loginPage.users.teachers.klaraFallPassword);
});

Given(/^admin logs in$/, async function () {
	await performLogin(loginPage.users.admins.thorstenTestUsername, loginPage.users.admins.thorstenTestPassword);
});

Given(/^student logs in$/, async function () {
	await performLogin(loginPage.users.students.paulaMayerUsername, loginPage.users.students.paulaMayerPassword);
});

When(/^.* goes from start page to login page$/, async function () {
	await startPage.clickLoginBtn();
});

When(/^.* is on LoginPage and logs in with (.*) and (.*)$/, async function (username, password) {
	await loginPage.performLogin(username, password);
});

Then(/^.* logs out$/, async function () {
	await navigationTopPage.performLogout();
});

When(/^.* waits for next login$/, async function () {
	let waitTime = (parseInt(process.env.LOGIN_BLOCK_TIME) || 15) + 1;
	await driver.pause(waitTime * 1000);
});

Then(/^the login must fail$/, async function () {
	return loginPage.isWrongLoginNotification();
});

Then(/^the login must be successful$/, function () {
	return navigationTopPage.areUserInitialsCorrect();
});

/*Courses*/
When(/^teacher creates a course (.*) and adds student (.*)to this course$/, async function (courseName, studentName) {
	return createCourse.createCourseWithStudents(courseName, studentName);
});

/*NavigationTopPage*/
When(/^.* goes to initials$/, async function () {
	await navigationTopPage.clickInitials();
});

When(/^.* goes to user settings$/, async function () {
	await navigationTopPage.clickInitials();
	await navigationTopPage.clickSettings();
});


/*first login*/
Then(/^.* accepts data protection$/, function () {
	return loginPage.firstLoginAdminOrTeacher();
});

Then(/^student with full age accepts student\'s data protection with password (.*)$/, function (newPassword) {
	return loginPage.firstLoginStudent(newPassword);
});
