'use strict';

const commonKGO = require('../shared_steps/commonKGO-steps.js');
const accountPage = require('../page-objects/pages/AccountPage.js');

When(/^.* changes passwort from (.*) to (.*)$/, function (oldPassword, newPassword) {
	return accountPage.setNewPassword(oldPassword, newPassword);
});
