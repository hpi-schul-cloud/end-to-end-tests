'use strict';
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const loginData = require('../shared-objects/loginData');
const Admin = require('../shared-objects/administrationData');
const shared = { loginData };
const administration = require('../page-objects/administration');
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const DashboardPage = require('../page-objects/pages/DashboardPage');


  Given(/^The Teacher arrives on the Schul-Cloud page$/, function () {
	return elementHelpers.loadPage(shared.loginData.url, 10);
  });

  Given(/^The Teacher is logged in successfully$/, async function () {
    await startPage.clickLoginBtn();
	  await loginPage.performLogin(shared.loginData.defaultTeacherUsername, shared.loginData.defaultTeacherpassword);
  });

  Then(/^The Teacher should accept the data protection$/,
	function() {
		return firstLogin.firstLoginTeacher();
	});

  When(/^The Teacher goes to Verwaltung page$/, function () {
	return administration.goToAdministration();
  });

  Then(/^Verify if all required tabs are visible in Verwaltung area$/, function (administrationTextLabels) {
    return DashboardPage.checkIfTabsAreVisible(administrationTextLabels, Admin.administrationsTabs);
    });
