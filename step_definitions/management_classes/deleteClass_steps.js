'use strict';

const manageClass = require('../../page-objects/pages/managementPages/ManageClassPage');

Then(/^.* clicks delete class with name '([^']*)'$/, function (ClassName) {
	return manageClass.deleteClass(ClassName)
});

Then(/^.* class with name '([^']*)' and teacher lastname '([^']*)' is not visible$/, function (newClassName, teacherLastname) {
	return manageClass.isClassEdited(newClassName, teacherLastname, false)
});
