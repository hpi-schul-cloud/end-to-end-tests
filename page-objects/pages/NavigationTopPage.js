'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers.js');

module.exports = {
    selectors: {
        initialsDiv: '[data-testid="initials"]',
        initialsDDCurrentUser: '[data-testid="name-in-the-icon"]',
        initialsDDSettings: 'a[data-testid="settings"]',
        initialsDDLogout: '[data-testid="logout"]',
        nameBox: '.dropdown-name',
        userIcon: '.btn-avatar > a',
        navItemHelp: '[data-testid="help-area"]', 
        navItemHelpQuestionCircle: '[data-testid="question-circle"]',
        navItemHelpWishProblem: '[data-testid="submit-wish-or-problem]',
        navItemHelpContactAdmin: '[data-testid="contact-admin"]',
        navItemHelpTraining: '[data-testid="fortbildungen"]',
        qrIcon: '.fa.fa-qrcode',
        fullScreenMode: '[data-testid="fullscreen-mode"]',
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
        await waitHelpers.waitAndClick(this.selectors.navItemHelpQuestionCircle);
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
