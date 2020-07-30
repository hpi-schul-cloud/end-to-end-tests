'use strict';
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
let loginData = require('../shared-objects/loginData');
const Admin = require('../shared-objects/administrationData');
let shared = { loginData };
let administration = require('../page-objects/administration');
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const DashboardPage = require('../page-objects/pages/DashboardPage');


  Given(/^The admin arrives on the Schul-Cloud page$/, function () {
	  return elementHelpers.loadPage(shared.loginData.url, 10);
  });

  Given(/^The admin is logged in successfully$/, async function () {
    await startPage.clickLoginBtn();
	  await loginPage.performLogin(shared.loginData.defaultAdminUsername, shared.loginData.defaultAdminPassword);
  });

  Then(/^The admin is supposed to accept the data protection agreement$/,
	function() {
		return firstLogin.firstLoginAdmin();
	});

  When(/^The admin goes to the Administration page$/, function () {
	return administration.goToAdministration();
  });

  Then(/^Verify if all required tabs are visible in Administration area$/, function (administrationTextLabels) {
    return DashboardPage.checkIfTabsAreVisible(administrationTextLabels, Admin.administrationsTabs);
    });
