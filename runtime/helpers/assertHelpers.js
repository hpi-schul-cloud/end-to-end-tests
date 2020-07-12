'use strict';


module.exports = {

    /**
	*
	* @param selector
	* @param expectedText
	*/
	expectToIncludeText: async function (selector, expectedText) {
		let actual = await driver.getText(selector);
		expect(actual).to.include(expectedText);
		return this;
	},

	/**
	*
	* @param expected
	*/
	assertUrl: async function (expected) {
		let actual = await driver.getUrl();
		assert.equal(actual, expected);
    },
    
	/**
		* This will assert 'equal' text being returned
		* @param selector
		* @param expectedText
        */
        
	assertText: async function (selector, expected) {
		await driver.waitForEnabled(selector, DELAY_5_SECOND);
		let actual = await driver.getText(selector);
		actual = actual.trim();
		assert.equal(actual, expected);
		return this;
	},
}
