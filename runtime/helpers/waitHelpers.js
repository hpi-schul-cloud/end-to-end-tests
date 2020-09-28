'use strict';

const sharedHelpers = require('./sharedHelpers');

const elementIsPresentTimeout = 10000;
const elementIsNotPresentTimeout = 10000;
const elementIsClickableTimeout = 10000;
const elementIsNotClickableTimeout = 5000;
const elementIsVisibleTimeout = 5000;
const elementIsNotVisibleTimeout = 5000;
const elementIsEnabled = 5000;
const elementIsDisabled = 5000;
const elementContainsTextTimeout = 10000;
const urlContainsTimeout = 10000;
const pageLoadingTimeout = 30000;
const setValueTimeout = 7000;
const titleTimeout = 30000;
const shortInterval = 50;
const mediumInterval = 100;

async function waitUntilElementIsPresent(selectorOrElement, timeout = elementIsPresentTimeout) {
	let element = await sharedHelpers.getElement(selectorOrElement);
	let msg = 'Element is not present: "' + element.selector + '"  within time: ' + timeout;
	await element.waitForExist(timeout, false, msg);
	return element;
}

async function waitUntilElementIsNotPresent(selectorOrElement, timeout = elementIsNotPresentTimeout) {
	let element = await sharedHelpers.getElement(selectorOrElement);
	let msg = 'Element should not be present: "' + element.selector + '"  within time: ' + timeout;
	await element.waitForExist(timeout, true, msg);
}

async function waitUntilElementIsClickable(selectorOrElement, timeout = elementIsClickableTimeout) {
	const element = await waitUntilElementIsPresent(selectorOrElement);
	const msg = 'Element is present: "' + element.selector + '", but not clickable within time: ' + timeout;
	await element.waitForClickable(timeout, false, msg, mediumInterval);
	return element;
}

async function waitUntilElementIsNotClickable(selectorOrElement, timeout = elementIsNotClickableTimeout) {
	const element = await waitUntilElementIsPresent(selectorOrElement);
	const msg = 'Element is present: "' + element.selector + '", but should not be clickable within time: ' + timeout;
	await element.waitForClickable(timeout, true, msg, mediumInterval);
}

async function waitUntilElementIsVisible(selectorOrElement, timeout = elementIsVisibleTimeout) {
	const element = await waitUntilElementIsPresent(selectorOrElement);
	const msg = 'Element is present: "' + element.selector + '", but not displayed within time: ' + timeout;
	await element.waitForDisplayed(timeout, false, msg, mediumInterval);
	return element;
}

async function waitUntilElementIsNotVisible(selectorOrElement, timeout = elementIsNotVisibleTimeout) {
	const element = await waitUntilElementIsPresent(selectorOrElement);
	const msg = 'Element: "' + element.selector + '", should not displayed within time: ' + timeout;
	await element.waitForDisplayed(timeout, true, msg, mediumInterval);
}

async function waitUntilElementIsEnabled(selectorOrElement, timeout = elementIsEnabled) {
	const element = await waitUntilElementIsPresent(selectorOrElement);
	const msg = 'Element is present: "' + element.selector + '", but not enabled within time: ' + timeout;
	await element.waitForEnabled(timeout, false, msg, mediumInterval);
	return element;
}

async function waitUntilElementIsDisabled(selectorOrElement, timeout = elementIsDisabled) {
	const element = await waitUntilElementIsPresent(selectorOrElement);
	const msg = 'Element is present: "' + element.selector + '", but not disabled within time: ' + timeout;
	await element.waitForEnabled(timeout, true, msg, mediumInterval);
}

async function waitUntilElementContainsText(selectorOrElement, expectedText, timeout = elementContainsTextTimeout) {
	const element = await waitUntilElementIsPresent(selectorOrElement);
	let textTimeoutMsg =
		'Text: "' + expectedText + '" is not visible for element: "' + element.selector + '" within time: ' + timeout;
	let actualText = '';
	try {
		await driver.waitUntil(
			async () => {
				actualText = await element.getText();
				return actualText.includes(expectedText);
			},
			timeout,
			textTimeoutMsg,
			mediumInterval
		);
	} catch (error) {
		const msg = error.message + '\n' + '"Actual text: "' + actualText + '"';
		throw msg;
	}
	return element;
}

async function waitUntilUrlContains(expectedUrlText, timeout = urlContainsTimeout) {
	let textTimeoutMsg = 'Url does not contains text : "' + expectedUrlText + '" within time: ' + timeout;
	let actualUrl = '';
	try {
		await driver.waitUntil(
			async () => {
				actualUrl = await driver.getUrl();
				const urlContainsText = actualUrl.includes(expectedUrlText);
				return urlContainsText;
			},
			timeout,
			textTimeoutMsg,
			mediumInterval
		);
	} catch (error) {
		const msg = error.message + '\n' + '" Actual URL: "' + actualUrl + "'";
		throw msg;
	}
}

async function waitUntilUrlNotContains(notExpectedUrlText, timeout = urlContainsTimeout) {
	let textTimeoutMsg = 'URL should not contains text : "' + notExpectedUrlText + '" within time: ' + timeout;
	let actualUrl = '';
	try {
		await driver.waitUntil(
			async () => {
				actualUrl = await driver.getUrl();
				const urlContainsText = actualUrl.includes(notExpectedUrlText);
				return !urlContainsText;
			},
			timeout,
			textTimeoutMsg,
			mediumInterval
		);
	} catch (error) {
		const msg = error.message + '\n' + '"Actual URL: "' + actualUrl + "'";
		throw msg;
	}
}

async function waitUntilPageLoads(timeout = pageLoadingTimeout) {
	const timeoutMsg = 'Page is not loaded';
	await waitUntilScriptResultIsTrue(() => document.readyState.includes('complete'), timeoutMsg, timeout);
}

async function waitUntilScriptResultIsTrue(script, timeoutMsg, timeout = pageLoadingTimeout) {
	await driver.waitUntil(
		async () => {
			const result = await driver.execute(script);
			return result;
		},
		timeout,
		timeoutMsg + '\n' + 'Script: ' + script + ' result: ' + result,
		shortInterval
	);
}

async function waitAndSetValue(selectorOrElement, expectedValue, timeout = MEDIUM_WAIT_MILLIS) {
	let element = await sharedHelpers.getElement(selectorOrElement);
	await waitUntilElementIsEnabled(element);
	const msg =
		'Could not set value: ' + expectedValue + ' for element: "' + element.selector + '" within time: ' + timeout;
	let actualValue = '';
	try {
		await driver.waitUntil(
			async () => {
				await element.setValue(expectedValue);
				actualValue = await element.getValue();
				return actualValue === expectedValue;
			},
			timeout,
			msg
		);
	} catch (error) {
		throw error.message + '\n' + '"Actual value: "' + actualValue + "'";
	}
	return element;
}

async function waitUntilElementAttributeEquals(
	selectorOrElement,
	attributeName,
	expectedValue,
	timeout = setValueTimeout
) {
	const element = await waitUntilElementIsPresent(selectorOrElement);
	let msg =
		'Element: "' +
		element.selector +
		'" No attribute with name: "' +
		attributeName +
		'" equals: "' +
		expectedValue +
		'"within time: ' +
		timeout;
	let actualAttributeValue = '';
	try {
		await driver.waitUntil(
			async () => {
				const actualAttributeValue = await element.getAttribute(attributeName);
				return actualAttributeValue === expectedValue;
			},
			timeout,
			msg
		);
	} catch (error) {
		throw error.message + '\n' + '"Actual value: "' + actualAttributeValue + "'";
	}
	return element;
}

async function waitUntilElementAttributeContains(
	selectorOrElement,
	attributeName,
	expectedValue,
	timeout = setValueTimeout
) {
	const element = await waitUntilElementIsPresent(selectorOrElement);
	let msg =
		'Element: "' +
		element.selector +
		'" No attribute with name: "' +
		attributeName +
		'" contains: "' +
		expectedValue +
		'"within time: ' +
		timeout;
	let actualAttributeValue = '';
	try {
		await driver.waitUntil(
			async () => {
				const actualAttributeValue = await element.getAttribute(attributeName);
				return actualAttributeValue.includes(expectedValue);
			},
			timeout,
			msg
		);
	} catch (error) {
		throw error.message + '\n' + '"Actual attribute value: "' + actualAttributeValue + "'";
	}
	return element;
}

async function waitUntilPageTitleContains(expectedTitle, timeout = titleTimeout) {
	await waitUntilPageLoads();
	let msg = 'Page title is not containing: "' + expectedTitle + '" within time: ' + timeout;
	let actualPageTitle = '';
	try {
		await driver.waitUntil(
			async () => {
				const actualPageTitle = await driver.getTitle();
				return actualPageTitle.includes(expectedTitle);
			},
			timeout,
			msg
		);
	} catch (error) {
		throw error.message + '\n' + '"Actual page title: "' + actualPageTitle + "'";
	}
	return element;
}

async function waitUntilPageTitleEquals(expectedTitle, timeout = titleTimeout) {
	await waitUntilPageLoads();
	let msg = 'Page title is not equal to: "' + expectedTitle + '" within time: ' + timeout;
	let actualPageTitle = '';
	try {
		await driver.waitUntil(
			async () => {
				const actualPageTitle = await driver.getTitle();
				return actualPageTitle === expectedTitle;
			},
			timeout,
			msg
		);
	} catch (error) {
		throw error.message + '\n' + '"Actual page title: "' + actualPageTitle + "'";
	}
	return element;
}

module.exports = {
	waitUntilElementIsPresent,
	waitUntilElementIsNotPresent,
	waitUntilElementIsClickable,
	waitUntilElementIsNotClickable,
	waitUntilElementIsVisible,
	waitUntilElementIsNotVisible,
	waitUntilElementIsEnabled,
	waitUntilElementIsDisabled,
	waitUntilElementContainsText,
	waitUntilUrlContains,
	waitUntilUrlNotContains,
	waitUntilPageLoads,
	waitAndSetValue,
	waitUntilElementAttributeEquals,
	waitUntilElementAttributeContains,
	waitUntilPageTitleContains,
	waitUntilPageTitleEquals,
};
