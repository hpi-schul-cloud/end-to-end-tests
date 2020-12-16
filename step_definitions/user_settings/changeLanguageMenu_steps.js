'use strict';

const AccountPage = require('../../page-objects/pages/AccountPage.js');

And(/^.* changes language to '(\S*)'$/, function (language) {
	return AccountPage.changeLanguage(language);
});

When(/^.* fill password in settings '(\S*)'$/, function (password) {
	return AccountPage.fillPassword(password);
});
