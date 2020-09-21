'use strict';

const DashboardPage = require('../page-objects/pages/DashboardPage');
const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');

Then(/^Verify if all required tabs are visible in Verwaltung area$/, async function (administrationTextLabels) {
    let subItems = await ADMNSTRTNAdministrationOverviewPage.getAdministrationTabs();
    await DashboardPage.checkIfMenuItemsAreVisible(administrationTextLabels, subItems);
});
