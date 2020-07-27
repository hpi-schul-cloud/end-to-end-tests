'use strict';

const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects//pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
let loginData = require('../shared-objects/loginData');
let shared = { loginData };

Given(/^a user arrives on the Schul-Cloud login homepage$/, function() {
	return elementHelpers.loadPage(shared.loginData.url, 10);
});

When(/^a user puts in (.*) and the wrong (.*) and click the login-button$/,async function(username, password) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(username, password);
});

Then(/^a user should see a notification$/, function() {
	return loginPage.wrongLoginResult();
});

Then(/^the login-page should look like it looked before for (.*)$/, function(
	username
) {
	let filename = 'failed-login-page';
	return loginData.compareScreenshots(filename);
});
