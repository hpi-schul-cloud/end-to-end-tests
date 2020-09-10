'use strict';
const DashboardPage = require('../page-objects/pages/DashboardPage');
const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');

Then(/^Verify if all required tabs are visible in Administration area$/, function (administrationTextLabels) {
    return DashboardPage.checkIfTabsAreVisible(administrationTextLabels, ADMNSTRTNAdministrationOverviewPage.getAdministrationTabs());
});