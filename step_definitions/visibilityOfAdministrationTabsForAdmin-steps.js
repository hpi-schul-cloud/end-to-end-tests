'use strict';

const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const administration = require('../page-objects/administration');
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const DashboardPage = require('../page-objects/pages/DashboardPage');
const common = require('../shared_steps/common-steps.js');
const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');


 
  Given(/^The admin is logged in successfully$/, async function () {
    await startPage.clickLoginBtn();
	  await loginPage.performLogin(loginPage.defaultLoginData.defaultAdminUsername, loginPage.defaultLoginData.defaultAdminPassword);
  });

  Then(/^The admin is supposed to accept the data protection agreement$/,
	function() {
		return firstLogin.firstLoginAdminOrTeacher();
	});

  When(/^The admin goes to the Administration page$/, function () {
	return administration.goToAdministration();
  });

  Then(/^Verify if all required tabs are visible in Administration area$/, function (administrationTextLabels) {
    return DashboardPage.checkIfTabsAreVisible(administrationTextLabels, ADMNSTRTNAdministrationOverviewPage.administrationsTabs);
    });
