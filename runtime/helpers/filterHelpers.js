'use strict';
let log = global.log;
const elementHelpers = require('./elementHelpers.js');

async function filterItem(itemToFilter) {
	try{
		await elementHelpers.clickAndWait(shared.adminData.filter.filterInput);
		await driver.keys(itemToFilter);
	}
	catch (err) {
		log.error(err.message);
		throw err;
	}
}

async function filterItemAndClick(itemToFilter) {
	try{
		await filterItem(itemToFilter);
		await elementHelpers.clickAndWait(shared.adminData.filter.filteredItem);
	}
	catch (err) {
		log.error(err.message);
		throw err;
	}
}

module.exports = {
	filterItem,
	filterItemAndClick,
}
