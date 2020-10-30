'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');
const apiHelpers = require('../../runtime/helpers/APIhelpers');
const elementHelpers = require('../../runtime/helpers/elementHelpers');

const initialsDiv = '[data-testid="initials"]';
const initialsDDSettings = 'a[data-testid="settings"]';
const initialsDDLogout = '[data-testid="logout"]';
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
const avatarCircle = '.avatar-circle';

async function isSchoolNameCorrect () {
    let schoolNameProvidedByAPI = await apiHelpers.getSchoolName();
    let schoolNameOnPage = await getSchoolNameDisplayed();
    return expect(schoolNameOnPage).to.equal(schoolNameProvidedByAPI);
}

async function areUserInitialsCorrect () {
    const initialsProvidedByAPI = await apiHelpers.getInitials();
    const avatarInitials = await elementHelpers.getElementText(avatarCircle);
    const errorMsg = 'Incorrect user initials. Expected: [' + initialsProvidedByAPI + '], Actual: [' + avatarInitials + ']';
    return expect(avatarInitials, errorMsg).to.equal(initialsProvidedByAPI)
}

async function isUserNameAndRoleCorrect () {
    let userName = await apiHelpers.getUserName();
    let userRole = await apiHelpers.getUserRole();
    let fullNameAndRole = await getNameAndPosition();
    expect(fullNameAndRole).to.include(userName, userRole);
}

async function clickExclamationTriangle () {
    await elementHelpers.click(exclamationTriangle);
}

async function clickFullScreenMode () {
    await elementHelpers.click(fullScreenMode);
}

async function clickNavItemQrIcon () {
    await elementHelpers.click(qrIcon);
}

//TODO:
/*
checkNameAndProfession () {
  
},*/

async function clickNavItemHelp () {
    await elementHelpers.click(navItemHelp);
}

async function clickNavItemHelpHelpSection () {
    await elementHelpers.click(navItemHelpQuestionCircle);
}

async function clickNavItemHelpSendRequestOrProblem () {
    await elementHelpers.click(navItemHelpWishProblem);
}

async function clickNavItemHelpContactAdmin () {
    await elementHelpers.click(navItemHelpContactAdmin);
}

async function clickNavItemHelpAdvancedTraining () {
    await elementHelpers.click(navItemHelpTraining);
}

async function clickInitials () {
    await elementHelpers.clickAndWait(initialsDiv);
}

async function clickSettings () {
    await elementHelpers.clickAndWait(initialsDDSettings);
}

async function clickLogout () {
    await elementHelpers.clickAndWait(initialsDDLogout);
}

async function performLogout () {
    await clickInitials();
    await clickLogout();
}

async function getNameAndPosition () {
    await clickInitials()
    const nameBoxSel = await waitHelpers.waitUntilElementIsPresent(nameBox)
    let name = await nameBoxSel.getText();
    return name;
}

async function getSchoolNameDisplayed() {
    return elementHelpers.getElementText(schoolNameSelector);
}

module.exports = {
    clickExclamationTriangle,
    clickFullScreenMode,
    clickNavItemQrIcon,
    clickNavItemHelp,
    clickNavItemHelpHelpSection,
    clickNavItemHelpSendRequestOrProblem,
    clickNavItemHelpContactAdmin,
    clickNavItemHelpAdvancedTraining,
    clickInitials,
    clickSettings,
    clickLogout,
    isSchoolNameCorrect,
    isUserNameAndRoleCorrect,
    areUserInitialsCorrect,
    performLogout,
}
