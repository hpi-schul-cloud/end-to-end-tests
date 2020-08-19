'use strict';
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers');
const common = require('../shared_steps/common-steps.js');

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
