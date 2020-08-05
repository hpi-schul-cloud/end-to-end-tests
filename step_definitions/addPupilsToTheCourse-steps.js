'use strict';

const addPupilToTheCourse = require('../page-objects/addPupilToTheCourse');
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const createCourse = require('../page-objects/createCourse');
const Login = require('../shared-objects/loginData');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const common = require('../shared_steps/common-steps.js');

Then(/^teacher clicks the participants icon in the course (.*) and sees the added student (.*) there.$/, async function(courseName, studentName) {
	return addPupilToTheCourse.verify(courseName, studentName);
});
