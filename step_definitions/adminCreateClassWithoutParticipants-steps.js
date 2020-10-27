'use strict';

const navigationLeftPanel = require('../page-objects/pages/NavigationLeftPage');
const administrationClasses = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerClassesPage');

Given(/^.* goes to administration$/, function () {
	return navigationLeftPanel.clickNavItemAdministration();
});

When(/^.* creates a class '([^']*)'$/, function (className) {
	return administrationClasses.createNewClass(className);
});

Then(/^.* should see the class '([^']*)' with '([^']*)' participants.$/, function (className, participants) {
	return administrationClasses.isNewEmptyClassCreated(className, participants);
});
