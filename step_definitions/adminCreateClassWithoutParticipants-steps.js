'use strict';

const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const administrationHelper = require("../page-objects/administration")
const loginData = require('../shared-objects/loginData');
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');

Given(/^admin arrives on the Schul-Cloud page$/, function () {
    return elementHelpers.loadPage(loginData.url, 10);
});
Given(/^admin is logged in successfully$/, async function () {
    const { defaultAdminUsername, defaultAdminPassword } = loginData
    await startPage.clickLoginBtn();
    await  loginPage.performLogin(defaultAdminUsername, defaultAdminPassword)
});
Given(/^admin performs the first login steps$/, function () {
    return firstLogin.firstLoginAdmin();
});

When(/^admin creates a class (.*)$/, function (className) {
    return administrationHelper.createNewClass(className)
});

Then(/^admin should see the class (.*) with (.*) participants.$/, function (className, participants) {
    return administrationHelper.verifyNewEmptyClassCreated(className, participants)
});
