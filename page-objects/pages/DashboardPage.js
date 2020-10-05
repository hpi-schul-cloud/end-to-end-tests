/*[url/dashboard]*/
'use strict';

const navigationTopPage = require('../../page-objects/pages/NavigationTopPage');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const apiHelpers = require('../../runtime/helpers/APIhelpers');
const waitHelpers = require("../../runtime/helpers/waitHelpers");
const dashboardBtnOnNavigationLeftPanel = "[data-testid='startseite']";
const dashboardTitle = 'Übersicht';
const dashboardHeader = '#titlebar h1#page-title';
//const sidebarList = 'ul.sidebar-list[title]';
const sidebarList = 'ul.sidebar-list a[title] span.link-name';

module.exports = {
	goToDashboard: async function () {
		await waitHelpers.waitAndClick(dashboardBtnOnNavigationLeftPanel);
	},

	isTitleOfDashboard: async function () {
		await this.goToDashboard();
		expect(await elementHelpers.getElementText(dashboardHeader)).to.equal(dashboardTitle);
	},

	areUserInitialsCorrect: async function () {
		let initials = await apiHelpers.getInitials();
		expect(await elementHelpers.getElementText('.avatar-circle')).to.equal(initials);
	},

	isSchoolNameCorrect: async function () {
		await this.goToDashboard();
		let schoolNameProvidedByAPI = await apiHelpers.getSchoolName();
		let schoolName = await navigationTopPage.getSchoolNameDisplayed();
		expect(schoolName).to.equal(schoolNameProvidedByAPI);
	},

	areMenuItemsVisible: async function (itemsToCompare, items) {
		await waitHelpers.waitUntilPageLoads();
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
