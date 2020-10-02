'use strict';

const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const common = require('../shared_steps/common-steps.js');

When(/^a user puts in (.*) and the wrong (.*) and click the login-button$/,async function(username, password) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(username, password);
});

Then(/^a user should see a notification$/, function() {
	return loginPage.isWrongLoginNotification();
});
