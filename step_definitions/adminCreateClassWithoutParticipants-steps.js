'use strict';

const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const loginData = require('../shared-objects/loginData');
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const common = require('../shared_steps/common-steps.js');
const createClass = require("../page-objects/pages/administrationPages/ADMNSTRTNAdministerClassesPage");


Given(/^admin is logged in successfully$/, async function () {
    const { defaultAdminUsername, defaultAdminPassword } = loginData
    await startPage.clickLoginBtn();
    await  loginPage.performLogin(defaultAdminUsername, defaultAdminPassword)
});
Given(/^admin performs the first login steps$/, function () {
    return firstLogin.firstLoginAdmin();
});

When(/^admin creates a class (.*)$/, function (className) {
    return createClass.createNewClass(className)
});

Then(/^admin should see the class (.*) with (.*) participants.$/, function (className, participants) {
    return createClass.verifyNewEmptyClassCreated(className, participants)
});
