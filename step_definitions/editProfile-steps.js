'use strict';

const loginPage = require('../page-objects/pages/loginPage');
const startPage = require('../page-objects/pages/startPage');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const Login = require('../shared-objects/loginData');
const profileEdit = require('../page-objects/editProfile');
const firstLogin = require('../shared_steps/firstLogin.js');


Given(/^the user goes to login page$/, function() {
	return elementHelpers.loadPage(Login.url, 20);
});

Given(/^the user logs in with (.*) and (.*)$/, async function(username,password) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(username, password);
});
	
Given(/^the user goes to profile settings$/, function() {
	return profileEdit.goToSettings();
});
When(/^user changes the passwort from (.*) to (.*)$/, function(oldPassword, newPassword) {
	return profileEdit.setNewPassword();
});
When(/^the user logs out$/, function() {
	return firstLogin.logout();
});

When(/^the user (.*) logs in with an old password (.*)$/, async function(username,oldPassword) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(username, oldPassword);
});
Then(/^the login must fail$/, function() {
	return profileEdit.loginFailed();
});

When(/^When the user (.*) logs in with the new password (.*)$/, function(username, newPassword) {
	return loginPage.performLogin(username, newPassword)
});
Then(/^the login must be successful$/, function() {
	return loginData.loginResult();
});
