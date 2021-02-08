/*[url/content]*/
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const searchField = 'input[label="search-input"]';
const contentTotal = '.content__total';

async function searchLernstore(contentName) {
	await waitHelpers.waitAndSetValue(searchField, contentName);
}

async function getTotalContent() {
	await waitHelpers.waitUntilElementContainsText(contentTotal, ' ');
	const total = await elementHelpers.getElementText(contentTotal);
	return total;
}

module.exports = {
	searchLernstore,
	getTotalContent,
};
