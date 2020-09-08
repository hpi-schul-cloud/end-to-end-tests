'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers.js');

const navItemHelp = "//*[@id='top-navbar']/ul/li/div/a[@title='Hilfe']";
const initialsDiv = '[data-testid="initials"]';
const initialsDDCurrentUser = 'div.dropdown-name[data-testid="name-in-the-icon"]';
const initialsDDSettings = 'a[data-testid="settings"]';
const initialsDDLogout = 'a[data-testid="logout"]';
const nameBox = '.dropdown-name';
const userIcon = '.btn-avatar > a';

module.exports = {
    clickNavItemHelp: async function () {
        await waitHelpers.waitAndClick(navItemHelp);
    },
    clickInitials: async function () {
        await waitHelpers.waitAndClick(initialsDiv);
    },
    clickSettings: async function () {
        await waitHelpers.waitAndClick(initialsDDSettings);
    },
    clickLogout: async function () {
        await waitHelpers.waitAndClick(initialsDDLogout);
    },
    performLogout: async function () {
        await this.clickInitials();
        await this.clickLogout();
    },

    getNameAndPosition: async function () {
        await this.clickInitials()
        let nameBox = await driver.$(nameBox);
        let name = await nameBox.getText();
        return name;
    },
    getInitials: async function () {
        let name = await this.getNameAndPosition();
        let firstCharacter = name[0];
        let length = name.length;
        for (var i = 1; i <= length; i++) {
            if (name[i] == " ") {
                secondCharacter = name[i + 1];
                break;
            }
        }
        let initials = firstCharacter + secondCharacter;
        return initials;
    },

}
