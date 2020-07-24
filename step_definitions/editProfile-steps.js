'use strict';

const commonKGO = require('../shared_steps/commonKGO-steps.js');
const accountPage = require('../page-objects/pages/accountPage');

When(/^change passwort from (.*) to (.*)$/, function (oldPassword, newPassword) {
	return accountPage.setNewPassword(oldPassword, newPassword);
});
