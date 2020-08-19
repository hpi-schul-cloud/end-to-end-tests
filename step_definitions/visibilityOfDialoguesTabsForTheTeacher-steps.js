'use strict';
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const administration = require('../page-objects/administration');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const DashboardPage = require('../page-objects/pages/DashboardPage');
const common = require('../shared_steps/common-steps.js');
const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');



  Given(/^The Teacher is logged in successfully$/, async function () {
    await startPage.clickLoginBtn();
	  await loginPage.performLogin(loginPage.defaultLoginData.defaultTeacherUsername, loginPage.defaultLoginData.defaultTeacherpassword);
  });


  When(/^The Teacher goes to Verwaltung page$/, function () {
	return administration.goToAdministration();
  });

  Then(/^Verify if all required tabs are visible in Verwaltung area$/, function (administrationTextLabels) {
    return DashboardPage.checkIfTabsAreVisible(administrationTextLabels, ADMNSTRTNAdministrationOverviewPage.administrationsTabs);
    });
