'use strict';

const manageClass = require('../../page-objects/pages/managementPages/ManageClassPage');
const manageClassesPage = require('../../page-objects/pages/managementPages/ManageClassesPage');

When(/^.* edits custom class name to '([^']*)' and class school year to '([^']*)'$/, async function (customClassName, schoolYear) {
	await manageClass.editClass({schoolYear: schoolYear, customClassName: customClassName});
});

Then(/^.* class with name '([^']*)' and teacher lastname '([^']*)' is visible$/, function (newClassName, teacherLastname) {
    return manageClass.isClassEdited(newClassName, teacherLastname, true)
});

When(/^.* chooses class with name '([^']*)' clicks Class-management$/, function (className) {
	return manageClassesPage.clickManagmentClassByNameBtn(className);
});

When(/^.*adds a student to class with name '([^']*)'$/, async function (fullName) {
	await manageClass.setStudent(fullName);
});

When(/^.*adds a teacher to class with name '([^']*)'$/, async function (fullName) {
	await manageClass.setTeacher(fullName);
});

When(/^.*clicks on Save-changes in class button$/, async function () {
	await manageClass.clickEditClassSaveChangesBtn();
});

When(/^.* deletes student '([^']*)' from class$/, async function (studentName) {
	await manageClass.deleteStudentFromClass(studentName);
});

When(/^.* deletes teacher '([^']*)' from class$/, async function (teacherName) {
	await manageClass.deleteTeacherFromClass(teacherName);
});
