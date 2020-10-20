'use strict';

const administrationClasses= require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerClassesPage');

When(/^.* edits a class(.*)$/, function (className) {
    return administrationClasses.editClass(className);
});

Then(/^.* should see the class (.*) with last name of teacher (.*).$/, function (newClassName, teacherLastname) {
    return administrationClasses.isClassEdited(newClassName, teacherLastname)
});
