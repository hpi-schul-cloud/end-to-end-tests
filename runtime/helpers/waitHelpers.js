'use strict'

const sharedHelpers = require('./sharedHelpers')

const elementIsPresentTimeout = 10000
const elementIsNotPresentTimeout = 10000
const elementIsClickableTimeout = 10000
const elementIsNotClickableTimeout = 7000
const elementIsVisibleTimeout = 5000
const elementIsNotVisibleTimeout = 5000
const elementIsEnabled = 5000
const elementIsDisabled = 5000
const elementContainsTextTimeout = 10000
const urlContainsTimeout = 10000
const pageLoadingTimeout = 30000
const setValueTimeout = 7000
const atributeTimeout = 7000
const titleTimeout = 30000
const shortInterval = 50
const mediumInterval = 100
const pageLoadLegacy = "//dl[@role='navigation']"
const pageLoaded = 'div.topbar'
const pageNotLoaded = 'div#nuxt-loading'

async function waitUntilElementIsPresent (selectorOrElement, timeout = elementIsPresentTimeout) {
	let element = await sharedHelpers.getElement(selectorOrElement)
	let msg = `Element is not present: ${element.selector} within time: ${timeout}`
	await element.waitForExist({
		timeout: timeout,
		reverse: false,
		timeoutMsg: msg,
	})
	return element
}

async function waitUntilElementIsNotPresent (selectorOrElement, timeout = elementIsNotPresentTimeout) {
	let element = await sharedHelpers.getElement(selectorOrElement)
	let msg = `Element should not be present: ${element.selector}  within time: ${timeout}`
	await element.waitForExist({
		timeout: timeout,
		reverse: true,
		timeoutMsg: msg,
	})
}

async function waitUntilElementIsClickable (selectorOrElement, timeout = elementIsClickableTimeout) {
	const element = await waitUntilElementIsPresent(selectorOrElement)
	const msg = `Element is present: ${element.selector}, but not clickable within time: ${timeout}`
	await element.waitForClickable(timeout, false, msg, mediumInterval)
	return element
}

async function waitUntilElementIsNotClickable (selectorOrElement, timeout = elementIsNotClickableTimeout) {
	const element = await waitUntilElementIsPresent(selectorOrElement)
	const msg = `Element is present: ${element.selector}, but should not be clickable within time: ${timeout}`
	await element.waitForClickable(timeout, true, msg, mediumInterval)
}

async function waitUntilElementIsVisible (selectorOrElement, timeout = elementIsVisibleTimeout) {
	const element = await waitUntilElementIsPresent(selectorOrElement)
	const msg = `Element is present: ${element.selector}, but not displayed within time: ${timeout}`
	await element.waitForDisplayed({
		timeout: timeout,
		reverse: false,
		timeoutMsg: msg,
		interval: mediumInterval,
	})
	return element
}

async function waitUntilElementIsNotVisible (selectorOrElement, timeout = elementIsNotVisibleTimeout) {
	const element = await waitUntilElementIsPresent(selectorOrElement)
	const msg = `Element: ${element.selector}, should not displayed within time: ${timeout}`
	await element.waitForDisplayed({
		timeout: timeout,
		reverse: true,
		timeoutMsg: msg,
		interval: mediumInterval,
	})
}

async function waitUntilElementIsEnabled (selectorOrElement, timeout = elementIsEnabled) {
	const element = await waitUntilElementIsPresent(selectorOrElement)
	const msg = `Element is present: ${element.selector}, but not enabled within time: ${timeout}`
	await element.waitForEnabled({
		timeout: timeout,
		reverse: false,
		timeoutMsg: msg,
		interval: mediumInterval,
	})
	return element
}

async function waitUntilElementIsDisabled (selectorOrElement, timeout = elementIsDisabled) {
	const element = await waitUntilElementIsPresent(selectorOrElement)
	const msg = `Element is present: ${element.selector}, but not disabled within time: ${timeout}`
	await element.waitForEnabled({
		timeout: timeout,
		reverse: true,
		timeoutMsg: msg,
		interval: mediumInterval,
	})
}

async function waitUntilElementContainsText (selectorOrElement, expectedText, timeout = elementContainsTextTimeout) {
	const element = await waitUntilElementIsPresent(selectorOrElement)
	let textTimeoutMsg = `Text: ${expectedText} is not visible for element: ${element.selector} within time: ${timeout}`
	let actualText = ''
	try {
		await driver.waitUntil(
			async () => {
				actualText = await element.getText()
				return actualText.includes(expectedText)
			},
			{
				timeout: timeout,
				timeoutMsg: textTimeoutMsg,
				interval: mediumInterval,
			}
		)
	} catch (error) {
		const msg = error.message + `\n Actual text: ${actualText}`
		throw msg
	}
	return element
}

async function waitUntilEmailIsSent () {
	await driver.pause(5000)
}

async function waitUntilUrlContains (expectedUrlText, timeout = urlContainsTimeout) {
	let textTimeoutMsg = `Url does not contains text ${expectedUrlText} within time: ${timeout}`
	let actualUrl = ''
	try {
		await driver.waitUntil(
			async () => {
				actualUrl = await driver.getUrl()
				const urlContainsText = actualUrl.includes(expectedUrlText)
				return urlContainsText
			},
			{
				timeout: timeout,
				timeoutMsg: textTimeoutMsg,
				interval: mediumInterval,
			}
		)
	} catch (error) {
		const msg = error.message + `\n Actual URL: ${actualUrl} `
		throw msg
	}
}

async function waitUntilUrlNotContains (notExpectedUrlText, timeout = urlContainsTimeout) {
	let textTimeoutMsg = `URL should not contains text: ${notExpectedUrlText}  within time: ${timeout}`
	let actualUrl = ''
	try {
		await driver.waitUntil(
			async () => {
				actualUrl = await driver.getUrl()
				const urlContainsText = actualUrl.includes(notExpectedUrlText)
				return !urlContainsText
			},
			{
				timeout: timeout,
				timeoutMsg: textTimeoutMsg,
				interval: mediumInterval,
			}
		)
	} catch (error) {
		const msg = error.message + `\n Actual URL: ${actualUrl}`
		throw msg
	}
}

async function waitUntilPageLoads (timeout = pageLoadingTimeout) {
	const timeoutMsg = 'Page is not loaded'
	await waitUntilScriptResultIsTrue(() => document.readyState.includes('complete'), timeoutMsg, timeout)
}

async function waitUntilLegacyPageLoads (timeout = pageLoadingTimeout) {
	try {
		const timeoutMsg = 'Page is not loaded'
		const pageLoadComplete = await waitUntilScriptResultIsTrue(
			() => document.readyState.includes('complete'),
			timeoutMsg,
			timeout
		)
		while (!pageLoadComplete) {
			await waitUntilElementIsPresent(pageLoadLegacy)
			break
		}
	} catch (error) {
		const msg = error.message
		throw msg
	}
}

async function waitUntilNuxtClientLoads (timeout = pageLoadingTimeout) {
	await driver.pause(5000)
	try {
		let nuxtPageLoad = false
		await waitUntilPageLoads()
		while (!nuxtPageLoad) {
			await waitUntilElementIsNotPresent(pageNotLoaded)
			if (await waitUntilElementIsPresent(pageLoaded)) {
				nuxtPageLoad = true
			} else {
				await driver.refresh()
				if (await waitUntilElementIsPresent(pageLoaded)) {
					nuxtPageLoad = true
				}
			}
		}
	} catch (error) {
		const msg = error.message
		throw msg
	}
}

async function waitUntilScriptResultIsTrue (script, timeoutMsg, timeout = pageLoadingTimeout) {
	let result = ''
	await driver.waitUntil(
		async () => {
			result = await driver.execute(script)
			return result
		},
		{
			timeout: timeout,
			timeoutMsg: timeoutMsg + `\n Script: ${script} result: ${result}`,
			interval: shortInterval,
		}
	)
}

async function waitAndSetValue (selectorOrElement, value, pause = 200) {
	const element = await waitUntilElementIsEnabled(selectorOrElement)
	await element.clearValue()
	await element.click()
	driver.keys(value)
	await driver.pause(pause)
}

async function waitUntilElementAttributeEquals (
	selectorOrElement,
	attributeName,
	expectedValue,
	timeout = atributeTimeout
) {
	const element = await waitUntilElementIsPresent(selectorOrElement)
	let msg = `Element: ${element.selector} No attribute with name: ${attributeName} equals: ${expectedValue} within time: ${timeout}`
	let actualAttributeValue = ''
	try {
		await driver.waitUntil(
			async () => {
				const actualAttributeValue = await element.getAttribute(attributeName)
				return actualAttributeValue === expectedValue
			},
			{
				timeout: timeout,
				timeoutMsg: msg,
			}
		)
	} catch (error) {
		throw error.message + `\n Actual value: ${actualAttributeValue}`
	}
	return element
}

async function waitUntilElementAttributeContains (
	selectorOrElement,
	attributeName,
	expectedValue,
	timeout = atributeTimeout
) {
	const element = await waitUntilElementIsPresent(selectorOrElement)
	let msg = `Element: ${element.selector} No attribute with name: ${attributeName} contains: ${expectedValue} within time: ${timeout}`
	let actualAttributeValue = ''
	try {
		await driver.waitUntil(
			async () => {
				const actualAttributeValue = await element.getAttribute(attributeName)
				return actualAttributeValue.includes(expectedValue)
			},
			{
				timeout: timeout,
				timeoutMsg: msg,
			}
		)
	} catch (error) {
		throw error.message + `\n Actual attribute value: ${actualAttributeValue}`
	}
}

async function waitUntilPageTitleContains (expectedTitle, timeout = titleTimeout) {
	await waitUntilPageLoads()
	let msg = `Page title is not containing: ${expectedTitle} within time: ${timeout}`
	let actualPageTitle = ''
	try {
		await driver.waitUntil(
			async () => {
				const actualPageTitle = await driver.getTitle()
				return actualPageTitle.includes(expectedTitle)
			},
			{
				timeout: timeout,
				timeoutMsg: msg,
			}
		)
	} catch (error) {
		throw error.message + `\n Actual page title: ${actualPageTitle}`
	}
}

async function waitUntilPageTitleEquals (expectedTitle, timeout = titleTimeout) {
	await waitUntilPageLoads()
	let msg = `Page title is not equal to: ${expectedTitle} within time: ${timeout}`
	let actualPageTitle = ''
	try {
		await driver.waitUntil(
			async () => {
				const actualPageTitle = await driver.getTitle()
				return actualPageTitle === expectedTitle
			},
			{
				timeout: timeout,
				timeoutMsg: msg,
			}
		)
	} catch (error) {
		throw error.message + `\n Actual page title: ${actualPageTitle}`
	}
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
	waitUntilEmailIsSent,
	waitUntilUrlContains,
	waitUntilUrlNotContains,
	waitUntilPageLoads,
	waitUntilLegacyPageLoads,
	waitAndSetValue,
	waitUntilElementAttributeEquals,
	waitUntilElementAttributeContains,
	waitUntilPageTitleContains,
	waitUntilPageTitleEquals,
	waitUntilNuxtClientLoads,
}
