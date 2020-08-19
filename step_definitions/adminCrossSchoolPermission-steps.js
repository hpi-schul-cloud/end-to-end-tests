'use strict';

const administration = require("../page-objects/administration.js")
const common = require('../shared_steps/common-steps.js');

Given(/^an admin are able to request information about students from own school$/, async function () {
    await administration.getStudentsFromSameSchoolAndVerify()
});

When(
    /^admin tries to request information about students from other school$/,
    async function () {
        await administration.requestForeignStudent()
    }
);

Then(
    /^admin should be given a empty object$/,
    async function () {
        await administration.requestForeignStudentAndVerify()
    }
);


