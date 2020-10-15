'use strict';


const navigationLeftPanel = require('../page-objects/pages/NavigationLeftPage')
const administrationClasses= require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerClassesPage');

When(/^.* edits a class (.*)$/, function (className) {
    return administrationClasses.editNewClass(className);
});

Then(/^.* should see the class (.*) with (.*) participants.$/, function (className, participants) {
    return administrationClasses.isNewEmptyClassCreated(className, participants)
});
