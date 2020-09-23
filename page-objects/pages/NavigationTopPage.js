'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');
const apiHelpers = require('../../runtime/helpers/APIhelpers');
const elementHelpers = require('../../runtime/helpers/elementHelpers');

const initialsDiv = '[data-testid="initials"]';
const initialsDDSettings = 'a[data-testid="settings"]';
const initialsDDLogout = 'button[data-testid="logout"]';
const nameBox = '.dropdown-name';
const schoolNameSelector = '.nav-item.school-data';
const exclamationTriangle = '.fa.fa-exclamation-triangle';
const fullScreenMode = '[data-testid="fullscreen-mode"]';
const qrIcon = '.fa.fa-qrcode';
const navItemHelp = '[data-testid="help-area"]';
const navItemHelpQuestionCircle = '[data-testid="question-circle"]';
const navItemHelpWishProblem = '[data-testid="submit-wish-or-problem]';
const navItemHelpContactAdmin = '[data-testid="contact-admin"]';
const navItemHelpTraining = '[data-testid="fortbildungen"]';

module.exports = {
    checkSchoolname: async function () {
        let schoolNameProvidedByAPI = await apiHelpers.getSchoolName();
        let schoolNameOnPage = await this.getSchoolNameDisplayed();
        return expect(schoolNameOnPage).to.equal(schoolNameProvidedByAPI);
    },
    checkInitials: async function () {
        let initialsProvidedByAPI = await apiHelpers.getInitials();
        let intitialsOnPage = await this.getInitials();
        return expect(intitialsOnPage).to.equal(initialsProvidedByAPI)
    },

    checkFullUserInfo: async function () {
        let userName = await apiHelpers.getUserName();
        let userRole = await apiHelpers.getUserRole();
        await this.clickInitials();
        let fullNameAndRole = await this.getNameAndPosition();
        expect(fullNameAndRole).to.include(userName, userRole);
    },

    clickExclamationTriangle: async function () {
        await waitHelpers.waitAndClick(exclamationTriangle);
    },
    clickFullScreenMode: async function () {
        await waitHelpers.waitAndClick(fullScreenMode);
    },
    clickNavItemQrIcon: async function () {
        await waitHelpers.waitAndClick(qrIcon);
    },
    //TODO:
    /*
   checkNameAndProfession: async function () {
      
   },*/

    clickNavItemHelp: async function () {
        await waitHelpers.waitAndClick(navItemHelp);
    },
    clickNavItemHelpHelpArea: async function () {
        await waitHelpers.waitAndClick(navItemHelpQuestionCircle);
    },
    clickNavItemHelpWishProblem: async function () {
        await waitHelpers.waitAndClick(navItemHelpWishProblem);
    },
    clickNavItemHelpContactAdmin: async function () {
        await waitHelpers.waitAndClick(navItemHelpContactAdmin);
    },
    clickNavItemHelpTraining: async function () {
        await waitHelpers.waitAndClick(navItemHelpTraining);
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
