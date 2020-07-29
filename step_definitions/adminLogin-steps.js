'use strict';
const adminLogin = require('../page-objects/adminLogin');
const loginPage = require('../page-objects/pages/loginPage');
const startPage = require('../page-objects/pages/startPage');
const loginData = require('../shared-objects/loginData');
const shared = { loginData };
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');

Given(/^an admin arrives on the Schul-Cloud login homepage$/, function() {
	return elementHelpers.loadPage(shared.loginData.url, 10);
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
	/^the admin-dashboard should have the admin initials$/,
	function() {
		return loginPage.loginResult();
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
