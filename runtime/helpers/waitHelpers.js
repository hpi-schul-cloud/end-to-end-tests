'use strict';

const elementHelpers = require("./elementHelpers");

const elementIsPresentTimeout = 10000;
const elementIsNotPresentTimeout = 10000;
const elementIsClickableTimeout = 10000;
const elementIsNotClickableTimeout = 10000;
const elementIsVisibleTimeout = 10000;
const elementIsNotVisibleTimeout = 10000;
const elementIsEnabled = 10000;
const elementIsDisabled = 10000;
const elementContainsTextTimeout = 10000;
const urlContainsTimeout = 10000;
const pageLoadingTimeout = 30000;

const shortInterval = 100;

module.exports = {

    getElement: async function (selectorOrElement) {
		if (typeof selectorOrElement === 'string') {
			return driver.$(selectorOrElement);
		}
		return selectorOrElement;
	},

    waitUntilElementIsPresent: async function (selectorOrElement, timeout = elementIsPresentTimeout) {
        let element = await this.getElement(selectorOrElement);
        let msg = 'Element is not present: "' + element.selector + '"  within time: ' + timeout;
        await element.waitForExist(timeout, false, msg);
        return element
    },

    waitUntilElementIsNotPresent: async function (selectorOrElement, timeout = elementIsNotPresentTimeout) {
        let element = await this.getElement(selectorOrElement);
        let msg = 'Element should not be present: "' + element.selector + '"  within time: ' + timeout;
        await element.waitForExist(timeout, true, msg);
    },

    waitUntilElementIsClickable: async function (selectorOrElement, timeout = elementIsClickableTimeout) {
        const element = await this.waitUntilElementIsPresent(selectorOrElement);
        const msg = 'Element is present: "' + element.selector + '", but not clickable within time: ' + timeout;
        await element.waitForClickable(timeout, false, msg, shortInterval);
    },

    waitUntilElementIsNotClickable: async function (selectorOrElement, timeout = elementIsNotClickableTimeout) {
        const element = await this.waitUntilElementIsPresent(selectorOrElement);
        const msg = 'Element is present: "' + element.selector + '", but should not be clickable within time: ' + timeout;
        await element.waitForClickable(timeout, true, msg, shortInterval);
    },

    waitUntilElementIsVisible: async function (selectorOrElement, timeout = elementIsVisibleTimeout) {
        const element = await this.waitUntilElementIsPresent(selectorOrElement);
        const msg = 'Element is present: "' + element.selector + '", but not displayed within time: ' + timeout;
        await element.waitForDisplayed(timeout, false, msg, shortInterval);
    },

    waitUntilElementIsNotVisible: async function (selectorOrElement, timeout = elementIsNotVisibleTimeout) {
        const element = await this.waitUntilElementIsPresent(selectorOrElement);
        const msg = 'Element: "' + element.selector + '", should not displayed within time: ' + timeout;
        await element.waitForDisplayed(timeout, true, msg, shortInterval);
    },

    waitUntilElementIsEnabled: async function (selectorOrElement, timeout = elementIsEnabled) {
        const element = await this.waitUntilElementIsPresent(selectorOrElement);
        const msg = 'Element is present: "' + element.selector + '", but not enabled within time: ' + timeout;
        await element.waitForEnabled(timeout, false, msg, shortInterval);
    },

    waitUntilElementIsDisabled: async function (selectorOrElement, timeout = elementIsDisabled) {
        const element = await this.waitUntilElementIsPresent(selectorOrElement);
        const msg = 'Element is present: "' + element.selector + '", but not disabled within time: ' + timeout;
        await element.waitForEnabled(timeout, true, msg, shortInterval);
    },

    waitUntilElementContainsText: async function (selectorOrElement, expectedText, timeout = elementContainsTextTimeout) {
        const element = await this.waitUntilElementIsPresent(selectorOrElement);
        let textTimeoutMsg = 'Text: "' + expectedText + '" is not visible for element: "' + element.selector + '" within time: ' + timeout;
        let actualText = "";
        try {
            await driver.waitUntil(async () => {
                actualText = await element.getText();
                return actualText.includes(expectedText);
            }, timeout, textTimeoutMsg, shortInterval);
        } catch (error) {
            const msg = error.message + '\n' + '" , Actual text: "' + actualText + '"';
            throw msg;
        }
    },

    waitUntilUrlContains: async function (expectedUrlText, timeout = urlContainsTimeout) {
        let textTimeoutMsg = 'Url does not contains text : "' + expectedUrlText + '" within time: ' + timeout;
        let actualUrl = '';
        try {
            await driver.waitUntil(async () => {
                actualUrl = await driver.getUrl();
                const urlContainsText = actualUrl.includes(expectedUrlText);
                return urlContainsText;
            }, timeout, textTimeoutMsg, shortInterval);
        } catch (error) {
            const msg = error.message + "\n" + '" , Actual URL: "' + actualUrl + "'";
            throw msg;
        }
    },

    waitUntilUrlNotContains: async function (notExpectedUrlText, timeout = urlContainsTimeout) {
        let textTimeoutMsg = 'URL should not contains text : "' + notExpectedUrlText + '" within time: ' + timeout;
        let actualUrl = '';
        try {
            await driver.waitUntil(async () => {
                actualUrl = await driver.getUrl();
                const urlContainsText = actualUrl.includes(notExpectedUrlText);
                return ! urlContainsText;
            }, timeout, textTimeoutMsg, shortInterval);
        } catch (error) {
            const msg = error.message + '\n' + '"Actual URL: "' + actualUrl + "'";
            throw msg;
        }
    },

    waitForPageToLoading: async function (timeout = pageLoadingTimeout) {
        await driver.waitUntil(async () => {
            const result = await driver.execute(() => document.readyState);
            const isPageLoaded = result.includes("complete");
            return isPageLoaded;
        }, timeout, "Page is not loaded. Script: dokument.readyState result: " + result, shortInterval);
    },

    waitAndClick: async function (selector) {
        await this.waitUntilElementIsClickable(selector);
        const elem = await driver.$(selector);
        await elem.click();
        await this.waitForPageToLoading();
    },


    waitAndSetValue: async function (selector, expectedValue, timeout = MEDIUM_WAIT_MILLIS) {
        await this.waitUntilElementIsEnabled(selector);
        const element = await driver.$(selector);
        const msg = 'Could not set value: ' + expectedValue + ' for element: "' + selector + '" within time: ' + timeout;
        let actualValue = "";
        try {
            await driver.waitUntil(async () => {
                await element.setValue(expectedValue);
                actualValue = await element.getValue();
                return actualValue === expectedValue;
            }, timeout, msg);
        } catch (error) {
            throw(error.message + '\n' + '", Actual value: "' + actualValue + "'");
        }
    }

}
