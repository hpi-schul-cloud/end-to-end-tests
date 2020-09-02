'use strict';


let log = global.log;

module.exports = {

	waitForElement: async function (selector, timeout) {
		try{
			await driver.waitUntil(() => driver.$(selector), timeout);
			}
		catch (error){
			log.error(error.message);
			throw error;
		}
	},

	refreshPage: async function () {
		try{
			await driver.refresh();
			}
		catch (error){
			log.error(error.message);
			throw error;
		}
	},

	waitUntilUrlContains: async function (url, timeout) {
		try{
			let urlPage = await driver.waitUntil(() => driver.getUrl(), timeout);
			expect(urlPage).to.include(url);

			}
		catch (error){
			log.error(error.message);
			throw error;
		}
	},

	waitAndClick: async function (selector) {
		try {
			let elem = await driver.$(selector);
			await elem.waitForDisplayed(SHORT_WAIT_MILLIS);
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
		driver.waitUntil(async () => {
            try{
                const element = await driver.$(selector);
                await element.setValue(value);
                return (await element.getValue()) === value;
            } catch(err){
                if(!err.message.contain('element not interactable'))
                    throw err;
            }
        }, 5000);
	},

	waitSelect: (selector) => driver.waitUntil(() => driver.$(selector), 5000),
}
