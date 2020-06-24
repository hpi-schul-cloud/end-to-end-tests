'use strict';

const adminLogin = require('../page-objects/adminLogin')
const administrationHelper = require("../page-objects/administration")
const loginData = require('../shared-objects/loginData');

const firstLogin = require('../shared_steps/firstLogin.js');


Given(/^admin arrives on the Schul-Cloud page$/, function () {
    return helpers.loadPage(loginData.url, 10);
});
Given(/^admin is logged in successfully$/, async function () {
    const { defaultAdminUsername, defaultAdminPassword } = loginData
    return adminLogin.performLogin(defaultAdminUsername, defaultAdminPassword)
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




