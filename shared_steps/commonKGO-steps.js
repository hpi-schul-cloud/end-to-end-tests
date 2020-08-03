'use strict';
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const navigationTopPage = require('../page-objects/pages/NavigationTopPage');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const loginData = require('../shared-objects/loginData');
const shared = { loginData };

/*Login, Logout*/
Given(/^.* arrives on the Schul-Cloud homepage$/, function () {
	return elementHelpers.loadPage(shared.loginData.url, 10);
});

Given(/^.* logs in with email (.*) and password (.*)$/, async function (username, password) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(username, password);
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
	loginPage.wrongLoginResult();
});

Then(/^the login must be successful$/, function () {
	return loginPage.loginResult();
});


/*NavigationTopPage*/
When(/^.* goes to initials$/, async function () {
	await navigationTopPage.clickInitials();
});

When(/^.* goes to user settings$/, async function () {
	await navigationTopPage.clickInitials();
	await navigationTopPage.clickSettings();
});
