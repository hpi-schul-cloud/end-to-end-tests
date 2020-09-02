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
        navItemHelp: 'li.nav-item.help-drodown',
        navItemHelpHelpArea: '.list-group-item.list-group-item-action:first-child',
        navItemHelpWishProblem: '.list-group-item.list-group-item-action:nth-child(2) .link',
        navItemHelpContactAdmin: '.list-group-item.list-group-item-action:nth-child(3) .link',
        navItemHelpTraining: '.list-group-item.list-group-item-action:last-child .link',
        qrIcon: '.fa.fa-qrcode',
        fullScreenMode: '.fa.fa-expand',
        exclamationTriangle: '.fa.fa-exclamation-triangle',


    },
    clickExclamationTriangle: async function () {
        await waitHelpers.waitAndClick(this.selectors.exclamationTriangle);
    },
    clickFullScreenMode: async function () {
        await waitHelpers.waitAndClick(this.selectors.fullScreenMode);
    },
    clickNavItemQrIcon: async function () {
        await waitHelpers.waitAndClick(this.selectors.qrIcon);
    },
    clickNavItemHelp: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemHelp);
    },
    clickNavItemHelpHelpArea: async function (){
        await waitHelpers.waitAndClick(this.selectors.navItemHelpHelpArea);
    },
    clickNavItemHelpWishProblem: async function (){
        await waitHelpers.waitAndClick(this.selectors.navItemHelpWishProblem);
    },
    clickNavItemHelpContactAdmin: async function (){
        await waitHelpers.waitAndClick(this.selectors.navItemHelpContactAdmin);
    },
    clickNavItemHelpTraining: async function (){
        await waitHelpers.waitAndClick(this.selectors.navItemHelpTraining);
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
