/*[url/dashboard]*/
'use strict';

const { CLIENT } = require("../../shared-objects/servers");
const navigationTopPage = require('../../page-objects/pages/NavigationTopPage');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const apiHelpers = require('../../runtime/helpers/APIhelpers');
const loginPage = require('../../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');

const dashboardUrl = `${CLIENT.URL}/dashboard`;
const dashboardTitle = 'Übersicht';
const dashboardHeader = '#titlebar h1#page-title';
const sidebarList = 'ul.sidebar-list[title]';

module.exports = {
	goToDashboard: async function () {
		await elementHelpers.loadPage(dashboardUrl, 20);
		await driver.pause(1000);
	},

	loginResultDashboard: async function () {
		await this.goToDashboard();
		expect(await elementHelpers.getElementText(dashboardHeader)).to.equal(dashboardTitle);
	},

	loginFullUserInfo: async function () {
		let userName = await apiHelpers.getInitials();
		expect(await elementHelpers.getElementText(navigationTopPage.initialsDDCurrentUser).to.equal(userName));
	},

	checkIfTabsAreVisible: async function (itemsToCompare, items) {
		let expectations = itemsToCompare.hashes();
		for (let i = 0; i < items.length; i++) {
			let actualLabelText = await items[i].getText();
			await items[i].waitForEnabled(DELAY_100_MILLISECOND);
			expect(actualLabelText).to.equal(expectations[i].tabs);
		}
	},

	getTabItems: async function () {
		let items = await driver.$$(sidebarList);
		return items;
	}
}
