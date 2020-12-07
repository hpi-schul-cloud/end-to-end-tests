const navigationLeftPanel = require('../../page-objects/pages/NavigationLeftPage');
const manageClass = require('../../page-objects/pages/managementPages/ManageClassPage');
const manageClassesPage = require('../../page-objects/pages/managementPages/ManageClassesPage');
const manageClassEditPage = require('../../page-objects/pages/managementPages/ManageClassEditPage');
const { Then } = require('cucumber');

When(/^.* goes to management$/, async function () {
	await navigationLeftPanel.clickNavItemManagement();
});

Given(/^.* goes to class management$/, async function () {
	await navigationLeftPanel.clickNavItemManageClasses();
});

When(/^.* creates class with custom name '([^']*)'$/, async function (customClassName) {
	await manageClass.createNewClass({ customClassName: customClassName });
});

When(/^.* creates a class with grade '([^']*)' and name '([^']*)'$/, async function (className, classGrade) {
	await manageClass.createNewClass({ className: className, classGrade: classGrade });
});

When(/^.* opens classes tab with name '([^']*)'$/, async function (classesTabName) {
	await manageClassesPage.clickOnClassesTab(classesTabName);
});

Then(/^.* class with name '([^']*)' and '([^']*)' members is visible$/, async function (className, membersCount) {
	await manageClass.isNewEmptyClassCreated(className, membersCount);
});

Then(
	/^.* should see that not empty class '([^']*)' and '([^']*)' members is visible$/,
	async function (className, membersCount) {
		await manageClass.isNewClassCreated(className, membersCount);
	}
);

Then(/^.* adds '([^']*)' and '([^']*)' to class$/, async function (studentOne, studentTwo) {
	await manageClass.setStudent(studentOne);
	await manageClass.setStudent(studentTwo);
	await manageClassEditPage.clickSubmitBtn();
});

Then(/^.* class with name '([^']*)' and '([^']*)' students is visible$/, async function (className, membersCount) {
	await manageClassesPage.checkMembersInClass(className, membersCount);
});
