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


/*NavigationTopPage*/
When(/^go to initials$/, async function () {
	await navigationTopPage.clickInitials();
});

When(/^go to user settings$/, async function () {
	await navigationTopPage.clickInitials();
	await navigationTopPage.clickSettings();
});