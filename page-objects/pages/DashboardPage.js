/*[url/dashboard]*/
'use strict';

const { CLIENT } = require("../../shared-objects/servers");
const imageCompare = require('../../runtime/imageCompare');
const navigationTopPage = require('../../page-objects/pages/NavigationTopPage');
const firstLogin = require('../../shared_steps/firstLogin.js');
const elementHelpers = require('../../runtime/helpers/elementHelpers')    ;

const dashboardUrl = `${CLIENT.URL}/dashboard`;
const dashboardSelectors = {
		dashboardTitle: 'Übersicht',
    dashboardHeader: '#titlebar h1#page-title',
};
module.exports = {
		dashboardSelectors, 
    goToDashboard: async function() {
		await elementHelpers.loadPage(dashboardUrl, 20);
		await driver.pause(1000);
	},

	loginResultDashboard: async function() {
		await this.goToDashboard();
		let title = dashboardSelectors.dashboardTitle;
		expect(await elementHelpers.getElementText(dashboardSelectors.dashboardHeader)).to.equal(title);
	},
	
	loginInitials: async function() {
		let initials = await firstLogin.getInitials();
		expect(await elementHelpers.getElementText('.avatar-circle')).to.equal(initials);
	},

	loginSchool: async function() {
		await this.goToDashboard();
		let schoolName = shared.loginData.elem.fullSchoolName;
		expect(await elementHelpers.getElementText(shared.loginData.elem.schoolName)).to.equal(schoolName);
    },
    loginFullUserInfo: async function() {
		await firstLogin.getNameAndPosition();
		let fullUserInfo = 'Thorsten Test (Administrator)';
		expect(await elementHelpers.getElementText(navigationTopPage.selectors.initialsDDCurrentUser).to.equal(fullUserInfo));
    },
    checkIfTabsAreVisible: async function (itemsToCompare, selector) {
        let items = await driver.$$(selector);
        let expectations = itemsToCompare.hashes();
        for(let i = 0; i < items.length; i++){
            let actualLabelText = await items[i].getText();
            await items[i].waitForEnabled(DELAY_100_MILLISECOND);
            expect(actualLabelText).to.equal(expectations[i].tabs);
            }
        },
        compareScreenshots: async function(filename) {
            await imageCompare.saveScreenshot(`${filename}.png`, '.timetable');
    
            await imageHelpers.compareImage(`${filename}.png`);
        }

}
