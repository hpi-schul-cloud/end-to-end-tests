'use strict';
let log = global.log;

module.exports = {

    waitAndClick: async function (selector) {
		try {
			let elem = await driver.$(selector);
			await elem.waitForDisplayed(DELAY_3_SECOND);
			await elem.waitForEnabled(DELAY_1_SECOND);
			await elem.click();
			await driver.pause(DELAY_500_MILLISECOND);
		}
		catch (err) {
			log.error(err.message);
			throw err;
		}
    },
    waitAndSetValue: async function (selector, value) {
		try{
			await driver.waitForEnabled(selector, DELAY_3_SECOND);
			await driver.click(selector);
			await driver.pause(DELAY_500_MILLISECOND);
			await driver.setValue(value);
		}
		catch (err) {
			log.error(err.message);
			throw err;
		}
	},
}
