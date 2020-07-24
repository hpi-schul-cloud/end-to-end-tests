'use strict';

const loginPage = require('../page-objects/pages/loginPage');
const startPage = require('../page-objects/pages/startPage');
const navigationTopPage = require('../page-objects/pages/navigationTopPage');
const accountPage = require('../page-objects/pages/AccountPage');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const Login = require('../shared-objects/loginData');
const profileEdit = require('../page-objects/editProfile');
const firstLogin = require('../shared_steps/firstLogin.js');
const commonKGOSteps = require('../shared_steps/commonKGO-steps.js');
const loginData = require('../shared-objects/loginData');


// Given(/^the user logs in with (.*) and (.*)$/, async function(username,password) {
// 	await startPage.clickLoginBtn();
// 	await loginPage.performLogin(username, password);
// });

// Given(/^the user goes to profile settings$/, function() {
// 	return profileEdit.goToSettings();
// });

// When(/^user changes the passwort from (.*) to (.*)$/, function(oldPassword, newPassword) {
// 	return profileEdit.setNewPassword(oldPassword, newPassword);
// });

// When(/^the user logs out$/, function() {
// 	return navigationTopPage.logout();
// });

// When(/^the user (.*) logs in with an old password (.*)$/, async function(username,oldPassword) {
// 	await startPage.clickLoginBtn();
// 	await loginPage.performLogin(username, oldPassword);
// });

Then(/^the login must fail$/, async function () {
	loginPage.wrongLoginResult();
});

// When(/^the user (.*) logs in with the new password (.*)$/, function(username, newPassword) {
// 	return loginPage.performLogin(username, newPassword)
// });

Then(/^the login must be successful$/, function () {
	return loginPage.loginResult();
});


/*KGO */
When(/^change passwort from (.*) to (.*)$/, function (oldPassword, newPassword) {
	return accountPage.setNewPassword(oldPassword, newPassword);
});

When(/^wait for next login$/, async function () {
	let waitTime = (parseInt(process.env.LOGIN_BLOCK_TIME) || 15) + 1;
	await driver.pause(waitTime * 1000);
});