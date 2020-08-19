'use strict';


const administrationHelper = require("../page-objects/administration");
const addClass = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerClassesPage');
const firstLogin = require('../shared_steps/firstLogin.js');
const common = require('../shared_steps/common-steps.js');


When(/^admin creates a class (.*)$/, function (className) {
    return administrationHelper.createNewClass(className)
});

Then(/^admin should see the class (.*) with (.*) participants.$/, function (className, participants) {
    return administrationHelper.verifyNewEmptyClassCreated(className, participants)
});
