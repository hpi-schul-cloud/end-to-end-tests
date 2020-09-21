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
//const sidebarList = 'ul.sidebar-list[title]';
const sidebarList = 'ul.sidebar-list a[title] span.link-name';

module.exports = {
	goToDashboard: async function () {
		await elementHelpers.loadPage(dashboardUrl, 20);
		await driver.pause(1000);
	},

	loginResultDashboard: async function () {
		await this.goToDashboard();
		expect(await elementHelpers.getElementText(dashboardHeader)).to.equal(dashboardTitle);
	},

	loginInitials: async function () {
		let initials = await apiHelpers.getInitials();
		expect(await elementHelpers.getElementText('.avatar-circle')).to.equal(initials);
	},

	loginSchool: async function () {
		await this.goToDashboard();
		let schoolNameProvidedByAPI = await apiHelpers.getSchoolName();
		expect(await elementHelpers.getElementText(loginPage.schoolNameSelector)).to.equal(schoolNameProvidedByAPI);
	},

	checkIfMenuItemsAreVisible: async function (itemsToCompare, items) {
		let expectations = await itemsToCompare.hashes();
		expect(items.length).to.be.above(0);
		for (let i = 0; i < expectations.length; i++) {
			let actualLabelText = await items[i].getText();
			await items[i].waitForEnabled(DELAY_100_MILLISECOND);
			expect(actualLabelText).to.equal(expectations[i].tabs);
		}
	},

	getMenuItems: async function () {
		let items = await driver.$$(sidebarList);
		return items;
	}
}
