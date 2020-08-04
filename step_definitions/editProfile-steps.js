'use strict';

const common = require('../shared_steps/common-steps.js');
const accountPage = require('../page-objects/pages/AccountPage.js');

When(/^.* changes passwort from (.*) to (.*)$/, function (oldPassword, newPassword) {
	return accountPage.setNewPassword(oldPassword, newPassword);
});
