'use strict';

const accountPage = require('../../page-objects/pages/AccountPage.js');

When(/^.* changes password from '([^']*)' to '([^']*)'$/, function (oldPassword, newPassword) {
	return accountPage.changePassword(oldPassword, newPassword);
});
