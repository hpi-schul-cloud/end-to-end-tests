'use strict';


const administrationHelper = require("../page-objects/administration");



When(/^admin creates a class (.*)$/, function (className) {
    return administrationHelper.createNewClass(className)
});

Then(/^admin should see the class (.*) with (.*) participants.$/, function (className, participants) {
    return administrationHelper.verifyNewEmptyClassCreated(className, participants)
});
