/*[url/content]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const sharedHelpers = require('../../../runtime/helpers/sharedHelpers');
const navigationLeftPage = require('../NavigationLeftPage');
const contentTitle = '.pname';
//myOwn
const searchContentField = "input[name='search']";
const searchContent = '.content__title'
const contentCard = 'div.content-card';
const contentButton = '.content-button';

//myOwn
async function goToLernStore() {
	await navigationLeftPage.clickNavItemContent();
}

async function setContentNameIntoSearchInputField(contentName) {
	await waitHelpers.waitAndSetValue(searchContentField, contentName);
}
async function isContentCardVisible() {
	await waitHelpers.waitUntilElementIsVisible(searchContent, 30000);
}
async function isContentButtonVisible() {
	await waitHelpers.waitUntilElementIsVisible(contentButton, 30000);
}
//myOwn
async function clickContentCard() {
	await elementHelpers.clickAndWait(contentCard);
}
//myOwn
async function clickContentButton() {
	await elementHelpers.clickAndWait(contentButton);
}

async function isContentVisible() {
    getCurrentTabUrl();
	await waitHelpers.waitUntilElementIsVisible(contentTitle, 30000);
}

//myOwn
async function isContentTitle(contentName, expectedTitle) {
	const titleElement = await sharedHelpers.getElement(contentTitle);
	const actualTitle = await titleElement.getText();
	const msg = 'Content with name: ' + contentName + ' has wrong linked FWU content. \n';
	const resultMsg = 'Expected: ' + expectedTitle + ', Actual: ' + actualTitle;
	expect(actualTitle, msg + resultMsg).to.equal(expectedTitle);
}
async function getCurrentTabUrl() {
	const handles = await driver.getWindowHandles();
	await driver.switchToWindow(handles[handles.length - 1]);
	return new URL(await driver.getUrl());
}

module.exports = {
	goToLernStore,
    isContentCardVisible,
    isContentVisible,
    isContentButtonVisible,
    setContentNameIntoSearchInputField,
    clickContentCard,
    clickContentButton,
    isContentTitle,
};
