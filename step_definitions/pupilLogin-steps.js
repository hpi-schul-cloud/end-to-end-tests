'use strict';

const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const loginData = require('../shared-objects/loginData');
const firstLogin = require('../shared_steps/firstLogin.js');
const commonKGO = require('../shared_steps/commonKGO-steps.js');

When(/^a pupil puts in (.*) and (.*) and clicks the login-button$/, async function (username, password) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(username, password);
});

Then(/^pupil accepts data security, checks the email (.*) and sets password (.*) .$/, function (username, password) {
	return firstLogin.firstLoginPupilFullAge(username, password);
});

Then(/^a pupil should see the dashboard$/, function () {
	return loginPage.loginResult();
});
