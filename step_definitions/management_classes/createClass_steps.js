const navigationLeftPanel = require('../../page-objects/pages/NavigationLeftPage');
const manageClass = require('../../page-objects/pages/managementPages/ManageClassPage');
const manageClassesPage = require('../../page-objects/pages/managementPages/ManageClassesPage');
const manageClassEditPage = require('../../page-objects/pages/managementPages/ManageClassEditPage');
const { Then } = require('@cucumber/cucumber');

When(/^.* goes to management$/, async function () {
	await navigationLeftPanel.clickNavItemManagement();
});

Given(/^.* goes to class management$/, async function () {
	await navigationLeftPanel.clickNavItemManageClasses();
});

When(/^.* creates class with custom name '([^']*)'$/, async function (customClassName) {
	await manageClass.createNewClass({ customClassName: customClassName });
});

When(/^.* creates class with custom name '([^']*)' and '([^']*)'$/, async function (customClassName, schoolYear) {
	await manageClass.createNewClass({ customClassName: customClassName, schoolYear: schoolYear });
});

When(/^.* creates a class with grade '([^']*)' and name '([^']*)'$/, async function (className, classGrade) {
	await manageClass.createNewClass({ className: className, classGrade: classGrade });
});

When(/^.* opens classes tab with name '([^']*)'$/, async function (classesTabName) {
	await manageClassesPage.clickOnClassesTab(classesTabName);
});

Then(/^.* adds '([^']*)' and '([^']*)' to class$/, async function (studentOne, studentTwo) {
	await manageClass.setStudent(studentOne);
	await manageClass.setStudent(studentTwo);
	await manageClassEditPage.clickSubmitBtn();
});

Then(/^.* number of students in class with name '([^']*)' is '([^']*)'$/, async function (className, membersCount) {
	await manageClassesPage.isNumberOfMembersInClass(className, membersCount);
});
