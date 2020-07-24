'use strict';
const loginPage = require('../page-objects/pages/loginPage');
const startPage = require('../page-objects/pages/startPage');
const navigationTopPage = require('../page-objects/pages/NavigationTopPage');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const loginData = require('../shared-objects/loginData');
const shared = { loginData };

/*Login, Logout*/
Given(/^user arrives on the Schul-Cloud homepage$/, function () {
	return elementHelpers.loadPage(shared.loginData.url, 10);
});

When(/^go from start page to login page$/, async function () {
	await startPage.clickLoginBtn();
});

When(/^log in with (.*) and (.*)$/, async function (username, password) {
	await loginPage.performLogin(username, password);
});

Then(/^log out$/, async function () {
	await navigationTopPage.logout();
});

When(/^wait for next login$/, async function () {
	let waitTime = (parseInt(process.env.LOGIN_BLOCK_TIME) || 15) + 1;
	await driver.pause(waitTime * 1000);
});

Then(/^the login must fail$/, async function () {
	loginPage.wrongLoginResult();
});

Then(/^the login must be successful$/, function () {
	return loginPage.loginResult();
});

/*NavigationTopPage*/
When(/^go to initials$/, async function () {
	await navigationTopPage.clickInitials();
});

When(/^go to user settings$/, async function () {
	await navigationTopPage.clickInitials();
	await navigationTopPage.clickSettings();
});