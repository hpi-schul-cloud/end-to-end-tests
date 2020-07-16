'use strict';
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
let wrongPasswordLogin = require('../page-objects/wrongPasswordLogin');
let loginData = require('../shared-objects/loginData');
let shared = { loginData };
let page = { wrongPasswordLogin };

Given(/^a user arrives on the Schul-Cloud login homepage$/, function() {
	return elementHelpers.loadPage(shared.loginData.url, 10);
});

When(
	/^a user puts in (.*) and the wrong (.*) and click the login-button$/,
	function(username, password) {
	return page.wrongPasswordLogin.performLogin(username, password);
	}
);

Then(/^a user should see a notification$/, function() {
	return page.wrongPasswordLogin.loginResult();
});

Then(/^the login-page should look like it looked before for (.*)$/, function(
	username
) {
	let filename = 'failed-login-page';
	return page.wrongPasswordLogin.compareScreenshots(filename);
});
