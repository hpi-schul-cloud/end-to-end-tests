'use strict';

const loginPage = require('../page-objects/pages/loginPage');
const startPage = require('../page-objects/pages/startPage');
let loginData = require('../shared-objects/loginData');
let shared = { loginData };
let page = { adminLogin };
const firstLogin = require('../shared_steps/firstLogin.js');

Given(/^an admin arrives on the Schul-Cloud login homepage$/, function() {
	return helpers.loadPage(shared.loginData.url, 10);
});

When(/^an admin puts in (.*) and (.*) and click the login-button$/, async function(username,password) {
	await startPage.clickLoginBtn();
	await  loginPage.performLogin(username, password);
});

Then(
	/^the user is supposed to accept the data protection agreement$/,
	function() {
		return firstLogin.firstLoginAdmin();
	}
);

Then(
	/^the dashboard is shown$/,
	function() {
		return adminLogin.loginResultDashboard();
	}
);

Then(
	/^the admin-dashboard should have the admin initials$/,
	function() {
		return adminLogin.loginInitials();
	}
);

Then(
	/^the admin-dashboard should have the correct school$/,
	function() {
		return adminLogin.loginSchool();
	}
);

Then(
	/^the admin-dashboard should have the admin name and profession$/,
	function() {
		return adminLogin.loginFullUserInfo();
	}
);

Then(/^the admin-dashboard should have the following tabs$/, function (LoginTextLabels) {
    return adminLogin.checkIfElementIsVisisble(LoginTextLabels, shared.loginData.elem.loginTabs);
	}
);
