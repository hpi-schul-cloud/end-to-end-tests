'use strict';


const administration = require('../page-objects/administration');
const DashboardPage = require('../page-objects/pages/DashboardPage');
const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');


  When(/^The admin goes to the Administration page$/, function () {
	  return administration.goToAdministration();
  });

  Then(/^Verify if all required tabs are visible in Administration area$/, function (administrationTextLabels) {
    return DashboardPage.checkIfTabsAreVisible(administrationTextLabels, ADMNSTRTNAdministrationOverviewPage.administrationsTabs);
  });
