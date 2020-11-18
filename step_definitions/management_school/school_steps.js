'use strict';

const apiTest = require('../../page-objects/apiTest');

Given(/^.*should be able to get information about students of his schools on request$/, async function () {
	await apiTest.getStudentsFromSameSchoolAndVerify();
});

When(/^.*should not be able to get information about students from other schools on request$/, async function () {
	await apiTest.requestForeignStudent();
});

Then(/^admin should be given a empty object$/, async function () {
	await apiTest.requestForeignStudentAndVerify();
});
