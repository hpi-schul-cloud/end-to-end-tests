'use strict';

const waitHelpers = require("./waitHelpers");

async function expectToIncludeText(selector, expectedText, errorMsg) {
	const element = await waitHelpers.waitUntilElementIsPresent(selector);
	let actual = (await element.getText()).trim();
	const msg = errorMsg + '\n Actual: [' + actual + '], Expected: [' + expected + '] \n ';
	expect(actual, msg).to.include(expectedText);
}

async function expectToIncludeUrl(expected) {
	let actual = await driver.getUrl();
	const msg = 'Actual url: [' + actual + '], Expected url: [' + expected + '] \n ';
	expect(actual).to.include(expected);
}

module.exports = {
	expectToIncludeText,
	expectToIncludeUrl,
}
