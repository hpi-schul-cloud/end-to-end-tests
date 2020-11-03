/*[url/dashboard]*/
'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers');
const NavigationLeftPage = require('./NavigationLeftPage');
const dashboardBtnOnNavigationLeftPanel = "[data-testid='startseite']";

async function goToDashboard() {
	await NavigationLeftPage.clickNavItemDashboard();
}

async function isTitleOfDashboard() {
	await goToDashboard();
	await waitHelpers.waitUntilPageTitleContains(dashboardBtnOnNavigationLeftPanel);
}

module.exports = {
	goToDashboard,
	isTitleOfDashboard,
};
