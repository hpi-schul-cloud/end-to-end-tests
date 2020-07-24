'use strict';

const commonKGO = require('../shared_steps/commonKGO-steps.js');
const accountPage = require('../page-objects/pages/AccountPage.js');

When(/^change passwort from (.*) to (.*)$/, function (oldPassword, newPassword) {
	return accountPage.setNewPassword(oldPassword, newPassword);
});
