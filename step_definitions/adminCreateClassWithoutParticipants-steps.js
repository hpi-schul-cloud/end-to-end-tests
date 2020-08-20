'use strict';


const administrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');
const administrationClasses= require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerClassesPage');


Given(/^admin goes to administration$/, function (className) {
    return administrationOverviewPage.goToAdministrationPage();
});

When(/^admin creates a class (.*)$/, function (className) {
    return administrationClasses.createNewClass(className)
});

Then(/^admin should see the class (.*) with (.*) participants.$/, function (className, participants) {
    return administrationClasses.verifyNewEmptyClassCreated(className, participants)
});
