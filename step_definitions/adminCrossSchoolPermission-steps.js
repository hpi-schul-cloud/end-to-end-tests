'use strict';
const administration = require("../page-objects/administration.js")

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
    /^admin should be given a status 403 forbidden$/,
    async function () {
        await administration.requestForeignStudentAndVerify()
    }
);


