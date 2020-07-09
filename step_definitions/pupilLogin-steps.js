'use strict';
const loginPage = require('../page-objects/pages/loginPage');
const startPage = require('../page-objects/pages/startPage');
let loginData = require('../shared-objects/loginData');
let performLogin = require('../page-objects/performLogin');
let shared = ({loginData, performLogin});
const firstLogin = require('../shared_steps/firstLogin.js');

Given(/^a pupil arrives on the Schul-Cloud login homepage$/, function () {
	return helpers.loadPage(shared.loginData.url, 10);
});

When(/^a pupil puts in (.*) and (.*) and clicks the login-button$/,async  function (username, password) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(username, password);
});

Then(/^pupil accepts data security, checks the email (.*) and sets password (.*) .$/, function(username,password) {
	return firstLogin.firstLoginPupilFullAge(username, password);
	});

Then(/^a pupil should see the dashboard$/, function () {
	return loginPage.loginResult();
});
