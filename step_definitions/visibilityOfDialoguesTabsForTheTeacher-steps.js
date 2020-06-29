'use strict';

let teacherLogin = require('../page-objects/teacherLogin');
let loginData = require('../shared-objects/loginData');
const Admin = require('../shared-objects/administrationData');
let shared = { loginData };
let page = { teacherLogin };
let administration = require('../page-objects/administration');
const firstLogin = require('../shared_steps/firstLogin.js');


  Given(/^The Teacher arrives on the Schul-Cloud page$/, function () {
	return helpers.loadPage(shared.loginData.url, 10);
  });

  Given(/^The Teacher is logged in successfully$/, function () {
	return page.teacherLogin.performLogin(shared.loginData.defaultTeacherUsername, shared.loginData.defaultTeacherpassword);
  });

  Then(/^The Teacher should accept the data protection$/,
	function() {
		return firstLogin.firstLoginTeacher();
	});

  When(/^The Teacher goes to Verwaltung page$/, function () {
	return administration.goToAdministration();
  });

  Then(/^Verify if all required tabs are visible in Verwaltung area$/, function (administrationTextLabels) {
    return administration.checkIfElementIsVisisble(administrationTextLabels, Admin.administrationsTabs);
    });
