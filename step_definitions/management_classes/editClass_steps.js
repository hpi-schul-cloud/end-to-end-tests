'use strict';

const manageClass = require('../../page-objects/pages/managementPages/ManageClassPage');

When(/^.* edits custom class name to '([^']*)' and class school year to '([^']*)'$/, async function (customClassName, schoolYear) {
	await manageClass.editClass({schoolYear: schoolYear, customClassName: customClassName});
});

Then(/^.* class with name '([^']*)' and teacher lastname '([^']*)' is visible$/, function (newClassName, teacherLastname) {
    return manageClass.isClassEdited(newClassName, teacherLastname, true)
});
