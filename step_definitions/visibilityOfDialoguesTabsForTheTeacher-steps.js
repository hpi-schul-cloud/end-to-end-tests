'use strict';

const DashboardPage = require('../page-objects/pages/DashboardPage');
const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');



  When(/^The Teacher goes to Verwaltung page$/, function () {
	return ADMNSTRTNAdministrationOverviewPage.goToAdministrationPage();
  });

  Then(/^Verify if all required tabs are visible in Verwaltung area$/, function (administrationTextLabels) {
    return DashboardPage.checkIfTabsAreVisible(administrationTextLabels, ADMNSTRTNAdministrationOverviewPage.administrationsTabs);
    });
