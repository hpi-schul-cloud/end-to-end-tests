
const navigationLeftPanel = require('../../page-objects/pages/NavigationLeftPage');
const manageClasses = require('../../page-objects/pages/managementPages/ManageClassesPage');

When(/^.* goes to management$/, async function () {
	await navigationLeftPanel.clickNavItemManagement();
});

Given(/^.* goes to class management$/, async function () {
	await navigationLeftPanel.clickNavItemManageClasses();
});

When(/^.* creates class with custom name '([^']*)'$/, async function (customClassName) {
	await manageClasses.createNewClass({customClassName: customClassName});
});

When(/^.* creates a class with grade '([^']*)' and name '([^']*)'$/, async function (className, classGrade) {
	await manageClasses.createNewClass({className: className, classGrade: classGrade});
});

When(/^.* opens classes tab with name '([^']*)'$/, async function (classesTabName) {
	await manageClasses.clickOnClassesTab(classesTabName);
});

Then(/^.* class with name '([^']*)' and '([^']*)' members is visible$/, async function (className, membersCount) {
	await manageClasses.isNewEmptyClassCreated(className, membersCount);
});