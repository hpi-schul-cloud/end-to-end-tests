'use strict';
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const loginData = require('../shared-objects/loginData');
const shared = { loginData };
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers');

Given(/^The teacher arrives on the Schul-Cloud homepage$/, function() {
	return elementHelpers.loadPage(shared.loginData.url, 10);
});

When(/^the teacher puts in (.*) and (.*) and click the login-button$/, async function(username,password) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(username, password);
});

Then(/^the teacher should accept the data protection$/, function() {
	return firstLogin.firstLoginTeacher();
});

Then(/^the teacher-dashboard should have an icon with the teacher's initials$/,function() {
		return loginPage.loginResult();
	}
);
