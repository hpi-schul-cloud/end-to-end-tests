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

async function isNewsVisible (newsTitle, expectedValue) {
	const newsTitles = await getListOfNewNames();
	const isNewsOnList = newsTitles.some((element) => element.includes(newsTitle));
	const fillString = !expectedValue ? 'not' : '';
	const msg = 'News with name '+ fillString + ' is visible on the list: \n';
	const resultMsg = 'Expected: ' + newsTitle + ', Actual: ' + newsTitles;
	await expect(isNewsOnList, msg + resultMsg).to.equal(expectedValue)
}

module.exports = {
	goToNews,
	isNewsVisible,
};
