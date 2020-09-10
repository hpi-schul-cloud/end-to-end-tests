'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers.js');

module.exports = {
    selectors: {
        initialsDiv: '[data-testid="initials"]',
        initialsDDCurrentUser: 'div.dropdown-name[data-testid="name-in-the-icon"]',
        initialsDDSettings: 'a[data-testid="settings"]',
        initialsDDLogout: 'a[data-testid="logout"]',
        nameBox: '.dropdown-name',
        userIcon: '.btn-avatar > a',

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
    performLogout: async function () {
        await this.clickInitials();
        await this.clickLogout();
    },

    getNameAndPosition: async function() {
		await this.clickInitials()
		let nameBox = await driver.$(selectors.nameBox);
		let name = await nameBox.getText();
		return name;
	},
    getInitials: async function() {
		let name = await this.getNameAndPosition();
		let firstCharacter = name[0];
		let length = name.length;
		for (var i=1; i<=length; i++) {
			if (name[i] == " ") {
			secondCharacter = name[i+1];
			break;
			}
		}
		let initials = firstCharacter + secondCharacter;
		return initials;
	},

}
