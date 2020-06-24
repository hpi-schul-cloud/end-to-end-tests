'use strict';

let adminLogin = require('../page-objects/adminLogin');
let loginData = require('../shared-objects/loginData');
let shared = { loginData };
let page = { adminLogin };
const firstLogin = require('../shared_steps/firstLogin.js');

Given(/^an admin arrives on the Schul-Cloud login homepage$/, function () {
	return helpers.loadPage(shared.loginData.url, 10);
});

When(/^an admin puts in (.*) and (.*) and click the login-button$/, function (
	username,
	password
) {
	return page.adminLogin.performLogin(username, password);
});

Then(
	/^the user is supposed to accept the data protection agreement$/,
	function () {
		return firstLogin.firstLoginTeacher();
	}
);
Then(
	/^the admin-dashboard should have the admin initials$/,
	function () {
		return adminLogin.loginResult();
	}
);
