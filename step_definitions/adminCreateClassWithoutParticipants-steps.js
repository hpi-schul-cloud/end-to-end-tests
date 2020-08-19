'use strict';

const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const administrationHelper = require("../page-objects/administration")
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const common = require('../shared_steps/common-steps.js');

Given(/^admin is logged in successfully$/, async function () {
   
    await startPage.clickLoginBtn();
    await  loginPage.performLogin(loginPage.defaultLoginData.defaultAdminUsername, loginPage.defaultLoginData.defaultAdminPassword);
});
Given(/^admin performs the first login steps$/, function () {
    return firstLogin.firstLoginAdminOrTeacher();
});

When(/^admin creates a class (.*)$/, function (className) {
    return administrationHelper.createNewClass(className)
});

Then(/^admin should see the class (.*) with (.*) participants.$/, function (className, participants) {
    return administrationHelper.verifyNewEmptyClassCreated(className, participants)
});
