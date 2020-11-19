'use strict';

const AccountPage = require('../../page-objects/pages/AccountPage.js');

Then(/^.* changes language to '(\S*)'$/, function (language) {
	return AccountPage.changeLanguage(language);
});
