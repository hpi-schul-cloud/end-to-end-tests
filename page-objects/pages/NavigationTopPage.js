'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers.js');

module.exports = {
    selectors: {
        initialsDiv: '[data-testid="initials"]',
        initialsDDCurrentUser: 'div.dropdown-name[data-testid="name-in-the-icon"]',
        initialsDDSettings: 'a[data-testid="settings"]',
        initialsDDLogout: 'a[data-testid="logout"]',
    },
    clickNavItemHelp: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemHelp);
    },
    clickInitials: async function () {
        await waitHelpers.waitAndClick(this.selectors.initialsDiv);
    },
    clickSettings: async function () {
        await waitHelpers.waitAndClick(this.selectors.initialsDDSettings);
    },
    clickLogout: async function () {
        await waitHelpers.waitAndClick(this.selectors.initialsDDLogout);
    },
    logout: async function () {
        this.clickInitials();
        this.clickLogout();
		/*let logOut = await driver.$('[data-testid="logout"]');
		await logOut.waitForDisplayed(3000);
		await logOut.click();
		let frontpageLoginBtn = await driver.$(Login.elem.frontpageLoginBtn);
		await frontpageLoginBtn.waitForDisplayed(3000);*/
    },
}