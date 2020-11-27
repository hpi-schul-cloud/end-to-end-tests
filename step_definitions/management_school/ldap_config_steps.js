'use strict';

const navigationLeftPage = require('../../page-objects/pages/NavigationLeftPage');

Then(/^.*goes to school tab$/, async function () {
	await navigationLeftPage.clickNavItemManageSchool();
});
