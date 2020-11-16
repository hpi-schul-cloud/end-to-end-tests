'use strict';

const common = require('../shared_steps/common-steps.js');
const accountPage = require('../page-objects/pages/AccountPage.js');

When(/^.* changes password from (.*) to (.*)$/, function (oldPassword, newPassword) {
	return accountPage.changePassword(oldPassword, newPassword);
});
