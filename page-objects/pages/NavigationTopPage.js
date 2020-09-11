'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');
const apiHelpers = require('../../runtime/helpers/APIhelpers');
const elementHelpers = require('../../runtime/helpers/elementHelpers');

const navItemHelp = "//*[@id='top-navbar']/ul/li/div/a[@title='Hilfe']";
const initialsDiv = '[data-testid="initials"]';
const initialsDDCurrentUser = 'div.dropdown-name[data-testid="name-in-the-icon"]';
const initialsDDSettings = 'a[data-testid="settings"]';
const initialsDDLogout = 'a[data-testid="logout"]';
const nameBox = '.dropdown-name';
const userIcon = '.btn-avatar > a';
const schoolNameSelector = '.nav-item.school-data';

module.exports = {
    checkSchoolname: async function () {
        let schoolNameProvidedByAPI = await apiHelpers.getSchoolName();
        let schoolNameOnPage = await this.getSchoolNameDisplayed();
        return expect(schoolNameOnPage).to.equal(schoolNameProvidedByAPI);
    },
    checkInitials: async function () {
        let initialsProvidedByAPI = await apiHelpers.getInitials();
        let intitialsOnPage = await this.getInitials();
        return expect(intitialsOnPage).to.equal(initialsProvidedByAPI);
    },
    //TODO:
    /*
   checkNameAndProfession: async function () {
      
   },*/

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
        let nameBoxSel = await driver.$(nameBox);
        let name = await nameBoxSel.getText();
        return name;
    },
    getInitials: async function () {
        let name = await this.getNameAndPosition();
        let firstCharacter = name[0];
        let secondCharacter;
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
    getSchoolNameDisplayed: function () {
        return elementHelpers.getElementText(schoolNameSelector);
    },

}
