'use strict';

const administrationClasses= require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerClassesPage');

When(/^.* edits custom class name to '([^']*)'$/, function (customClassName) {
    return administrationClasses.editClass({customClassName: customClassName});
});

Then(/^.* class with name '([^']*)' and teacher named '([^']*)' is visible$/, function (newClassName, teacherLastname) {
    return administrationClasses.isClassEdited(newClassName, teacherLastname)
});
