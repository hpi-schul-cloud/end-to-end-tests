'use strict';
const loginPage = require('../page-objects/pages/loginPage');
const startPage = require('../page-objects/pages/startPage');
const loginData = require('../shared-objects/loginData');
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const administration = require("../page-objects/administration.js")





Given(/^an admin is logged in$/, async function () {
    await elementHelpers.loadPage(loginData.url, 10);
    await startPage.clickLoginBtn();
    await loginPage.performLogin('admin@schul-cloud.org', 'Schulcloud1!');
    await firstLogin.firstLoginAdmin();
});

Given(/^an admin are able to request information about students from own school$/, async function () {
    await administration.getStudentsFromSameSchoolAndVerify()
});

When(
    /^admin tries to request information about students from other school$/,
    function () {

    }
);

Then(
    /^admin should be given a status 403 forbidden$/,
    async function () {
        await administration.requestForeignStudentAndVerify()
    }
);


