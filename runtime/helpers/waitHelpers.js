'use strict';
let log = global.log;

module.exports = {

	waitAndClick: async function (selector) {
		try {
			let elem = await driver.$(selector);
			await elem.waitForDisplayed(LONG_WAIT_MILLIS);
			await elem.waitForEnabled(SHORT_WAIT_MILLIS);
			await elem.click();
			await driver.pause(SHORT_WAIT_MILLIS);
		}
		catch (err) {
			log.error(err.message);
			throw err;
		}
	},
	waitAndSetValue: async function (selector, value) {
		try {
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
