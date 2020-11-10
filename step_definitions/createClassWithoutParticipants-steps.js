'use strict';

const navigationLeftPanel = require('../page-objects/pages/NavigationLeftPage');
const administrationClasses = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerClassesPage');

Given(/^.* goes to administration$/, async function () {
	await navigationLeftPanel.clickNavItemAdministration();
});

Given(/^.* goes to class administration$/, async function () {
	await navigationLeftPanel.clickNavItemAdminClasses();
});

When(/^.* creates class with custom name '([^']*)'$/, async function (customClassName) {
	await administrationClasses.createNewClass({customClassName: customClassName});
});

When(/^.* creates a class with grade '([^']*)' and name '([^']*)'$/, async function (className, classGrade) {
	await administrationClasses.createNewClass({className: className, classGrade: classGrade});
});

When(/^.* opens classes tab with name '([^']*)'$/, async function (classesTabName) {
	await administrationClasses.clickOnClassesTab(classesTabName);
});

Then(/^.* class with name '([^']*)' and '([^']*)' members is visible$/, async function (className, membersCount) {
	await administrationClasses.isNewEmptyClassCreated(className, membersCount);
});
