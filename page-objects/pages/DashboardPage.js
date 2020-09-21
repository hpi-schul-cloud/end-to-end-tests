/*[url/dashboard]*/
'use strict';

const { CLIENT } = require("../../shared-objects/servers");
const navigationTopPage = require('../../page-objects/pages/NavigationTopPage');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const apiHelpers = require('../../runtime/helpers/APIhelpers');
const loginPage = require('../../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');

const dashboardUrl = `${CLIENT.URL}/dashboard`;
const selectors = {
	dashboardSelectors: {
		dashboardTitle: 'Übersicht',
    dashboardHeader: '#titlebar h1#page-title',
	},
}

module.exports = {
		selectors,
    goToDashboard: async function() {
		await elementHelpers.loadPage(dashboardUrl, 20);
		await driver.pause(1000);
	},

	loginResultDashboard: async function() {
		await this.goToDashboard();
		let title = selectors.dashboardSelectors.dashboardTitle;
		expect(await elementHelpers.getElementText(selectors.dashboardSelectors.dashboardHeader)).to.equal(title);
	},
	
	loginInitials: async function() {
		let initials = await apiHelpers.getInitials();
		expect(await elementHelpers.getElementText('.avatar-circle')).to.equal(initials);
	},

	loginSchool: async function() {
		await this.goToDashboard();
		let schoolNameProvidedByAPI = await apiHelpers.getSchoolName();
		expect(await elementHelpers.getElementText(loginPage.selectors.schoolNameSelector)).to.equal(schoolNameProvidedByAPI);
		},
		
  loginFullUserInfo: async function() {
		let userName = await apiHelpers.getUserName();
		let userRole = await apiHelpers.getUserRole();
		await navigationTopPage.clickInitials();
		let fullNameAndRole = await elementHelpers.getElementText(navigationTopPage.selectors.initialsDDCurrentUser);
		expect(fullNameAndRole).to.include(userName, userRole);
	},
	
  checkIfTabsAreVisible: async function (itemsToCompare, selector) {
    let items = await driver.$$(selector);
	let expectations = itemsToCompare.hashes();
	expect(items.length).to.be.above(0);
    for(let i = 0; i < items.length; i++){
      let actualLabelText = await items[i].getText();
      await items[i].waitForEnabled(DELAY_100_MILLISECOND);
      expect(actualLabelText).to.equal(expectations[i].tabs);
      }
  },
}
