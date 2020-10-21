/*[url/news]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const navigationLeftPage = require('./NavigationLeftPage');
const newNameSel = 'span.title';

async function goToNews () {
	await navigationLeftPage.clickNavItemNews();
}

async function getListOfNewNames () {
	return elementHelpers.getTextFromAllElements(newNameSel);
}

async function isNewsVisible (name, expectedValue) {
	let newsNames = await getListOfNewNames();
	expectedValue ? await expect(newsNames).to.include(name) : await expect(newsNames).to.not.include(name);
}

module.exports = {
	goToNews,
	isNewsVisible,
};
