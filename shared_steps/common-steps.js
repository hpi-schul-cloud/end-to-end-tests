'use strict';
const { CLIENT } = require('../shared-objects/servers');
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const navigationTopPage = require('../page-objects/pages/NavigationTopPage');
const studentAdministration = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');

const schulCloudURL = `${CLIENT.URL}`;
/*Login, Logout*/

Given(/^.*arrives on the Schul-Cloud homepage$/, async function () {
	return elementHelpers.loadPage(schulCloudURL);
});

Given(/^.* logs in with email '([^']*)' and password '([^']*)'$/, async function (username, password) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(username, password);
});

Then(/^.* logs in with email '([^']*)' and password genarated by admin during manual submission of consent$/, async function (username) {
	await startPage.clickLoginBtn();
	await studentAdministration.studentLogsInWithPasswordGenaratedByAdminDuringManualSubmission(username);
});

Given(/^teacher logs in$/, async function () {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(
		loginPage.users.teachers.klaraFallUsername,
		loginPage.users.teachers.klaraFallPassword
	);
});

Given(/^admin logs in$/, async function () {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(
		loginPage.users.admins.thorstenTestUsername,
		loginPage.users.admins.thorstenTestPassword
	);
});

Given(/^student logs in$/, async function () {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(
		loginPage.users.students.paulaMayerUsername,
		loginPage.users.students.paulaMayerPassword
	);
});

When(/^.* clicks 'Login' button on start page$/, async function () {
	await startPage.clickLoginBtn();
});

When(/^.* is on LoginPage and logs in using email '([^']*)' and password '([^']*)'$/, async function (username, password) {
	await loginPage.performLogin(username, password);
});

Then(/^.* logs out$/, async function () {
	await navigationTopPage.performLogout();
});

When(/^.* waits for next login$/, async function () {
	let waitTime = (parseInt(process.env.LOGIN_BLOCK_TIME) || 15) + 1;
	await driver.pause(waitTime * 1000);
});

Then(/^.*login must fail$/, async function () {
	return loginPage.isWrongLoginNotification();
});

Then(/^.*login is successful$/, function () {
	return navigationTopPage.areUserInitialsCorrect();
});

/*Courses*/
When(/^teacher creates a course '(.*)' and adds student (.*)to this course$/, async function (courseName, studentName) {
	return createCourse.createCourseWithStudent(courseName, studentName);
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
Then(/^.* performs first login actions: data protection acceptance$/, async function () {
	return loginPage.performLoginActions({ shouldAcceptDataProtection: true, shouldSetOwnPassword: false });
});

Then(/^.* performs first login actions: password change '([^']*)'$/, async function (newPassword) {
	await loginPage.performLoginActions({ shouldAcceptDataProtection: false, shouldSetOwnPassword: true, newPassword });
});

Then(/^.* performs first login actions: data protection acceptance, password change '([^']*)'$/, async function (newPassword) {
	await loginPage.performLoginActions({ shouldAcceptDataProtection: true, shouldSetOwnPassword: true, newPassword });
});

Then(/^'([^']*)' performs first login actions$/, async function (userRole) {
	if (userRole.toLowerCase() === "student") {
	await loginPage.performLoginActions({ shouldAcceptDataProtection: true, shouldSetOwnPassword: true });
	} else {
	await loginPage.performLoginActions({ shouldAcceptDataProtection: true, shouldSetOwnPassword: false});
	}

});
