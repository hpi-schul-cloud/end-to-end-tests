'use strict';

let adminLogin = require('../page-objects/adminLogin');
let loginData = require('../shared-objects/loginData');
let shared = { loginData };
let page = { adminLogin };
let administration = require('../page-objects/administration');
const firstLogin = require('../shared_steps/firstLogin.js');


  Given(/^The admin arrives on the Schul-Cloud page$/, function () {
	return helpers.loadPage(shared.loginData.url, 10);
  });

  Given(/^The admin is logged in successfully$/, function () {
	return page.adminLogin.performLogin(shared.loginData.defaultAdminUsername, shared.loginData.defaultAdminPassword);
  });

  Then(/^The admin is supposed to accept the data protection agreement$/,
	function() {
		return firstLogin.firstLoginAdmin();
	});

  When(/^The admin goes to the Administration page$/, function () {
	return administration.goToAdministration();
  });

  Then(/^Verify if all required tabs are visible in Administration area$/, function (administrationTextLabels) {
    return administration.checkIfElementIsVisisble(administrationTextLabels);
    });