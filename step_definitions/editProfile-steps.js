'use strict';
const loginPage = require('../page-objects/pages/loginPage');
const startPage = require('../page-objects/pages/startPage');
let teacherLogin = require('../page-objects/teacherLogin');
let courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');
const profileEdit = require('../page-objects/editProfile');
const { After, Before, AfterAll, BeforeAll } = require('cucumber');

Given(/^the user goes to login page$/, function() {
		return helpers.loadPage(courseData.urlLogin, 20);
	});
Given(/^the user logs in$/, async function() {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(Login.defaultTeacherUsername,Login.defaultTeacherpassword);
});
	
Given(/^the user goes to profile settings$/, function() {
	return profileEdit.goToSettings();
});
When(/^user changes the passwort$/, function() {
	return profileEdit.setNewPassword();
});
Then(/^after logout user must not be able to login with an old password$/, function() {
	return profileEdit.tryWithOld();
});
Then(/^the user must be able to log in with a new legible password$/, function() {
	return profileEdit.tryWithNew();
});
