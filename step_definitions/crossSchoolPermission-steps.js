'use strict';

const administration = require('../page-objects/apiTest');

Given(/^.*should be able to get information about students of his schools on request$/, async function () {
	await administration.getStudentsFromSameSchoolAndVerify();
});

When(/^.*should not be able to get information about students from other schools on request$/, async function () {
	await administration.requestForeignStudent();
});

Then(/^admin should be given a empty object$/, async function () {
	await administration.requestForeignStudentAndVerify();
});
