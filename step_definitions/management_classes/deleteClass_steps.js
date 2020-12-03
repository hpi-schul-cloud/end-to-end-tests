'use strict';

const manageClass = require('../../page-objects/pages/managementPages/ManageClassPage');

When(/^.* clicks delete class$/, function () {
	return manageClass.deleteClass()
});

Then(/^.* class with name '([^']*)' and teacher lastname '([^']*)' is not visible$/, function (newClassName, teacherLastname) {
	return manageClass.isClassEdited(newClassName, teacherLastname, false)
});
