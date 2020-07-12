'use strict';
let log = global.log;

module.exports = {


	filterItem: async function (itemToFilter) {
		try{
			await driver.waitForExist(shared.adminData.filter.filterInput, DELAY_5_SECOND);
			await driver.waitForEnabled(shared.adminData.filter.filterInput, DELAY_5_SECOND);
			await driver.pause(DELAY_500_MILLISECOND);
			await driver.click(shared.adminData.filter.filterInput);
			await driver.keys(itemToFilter);
		}
		catch (err) {
			log.error(err.message);
			throw err;
		}
	},

	filterItemAndClick: async function (itemToFilter) {
		try{
			await helpers.filterItem(itemToFilter);
			await driver.pause(DELAY_3_SECOND);
			await driver.click(shared.adminData.filter.filteredItem);
			await driver.pause(DELAY_3_SECOND);
		}
		catch (err) {
			if (err) {
				log.error(err.message);
				throw err;
			}
		}
	},
}
