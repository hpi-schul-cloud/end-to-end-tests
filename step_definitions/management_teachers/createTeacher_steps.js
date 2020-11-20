'use strict';

const navigationLeftPanel = require('../../page-objects/pages/NavigationLeftPage');

//WHEN
When(/^.* goes to teachers management$/, function () {
	return navigationLeftPanel.clickNavItemManageTeachers();
});