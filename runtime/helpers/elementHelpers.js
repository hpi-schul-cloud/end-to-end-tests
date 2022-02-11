'use strict';

const waitHelpers = require('./waitHelpers');

const LOAD_PAGE_TIMEOUT = 10000;


/**
 * show displayed selector on the page matching with the id/class_name in the parameter.
 * useful in situations where a mobile and desktop versions are loaded at the same time, so there are multiple
 * elements on the page with the same id which are present, but not all of them are displayed.
 * @param selector css selector used to locate the elements
 * @returns {Object} element
 * @example
 *    this.getDisplayedElements('section#loginarea input[data-testid="username"]')
 */

async function getDisplayedElement(selector){
	let displayedElements = []; // initialize an array where displayed element(s) will be stored
	const presentElements = await driver.$$(selector); // puts mathing elements in the array
	for (let element of presentElements) {
		let isDisplayed = await element.isDisplayed()
		if (isDisplayed) {
			displayedElements.push(element)
		}
	}
	if (displayedElements.length!==1) {
		throw new SelectorConflictException('multiple/or none displayed selectors with the same identifier on the page!')
	} else {
		return displayedElements[0]
	}
}

//Wait for element and click (without waitUntilPageLoads)
async function click(selectorOrElement) {
	const element = await waitHelpers.waitUntilElementIsClickable(selectorOrElement);
	await element.click();
}

//This method should be used when we wait for element, click and wait page for reload
async function clickAndWait(selectorOrElement) {
	await click(selectorOrElement);
	await waitHelpers.waitUntilPageLoads();
}

async function doubleClick(selectorOrElement) {
	const element = await waitHelpers.waitUntilElementIsClickable(selectorOrElement);
	await element.doubleClick();
}

async function doubleClickAndWait(selectorOrElement) {
	await doubleClick(selectorOrElement);
	await waitHelpers.waitUntilPageLoads();
}

async function getSelectOptions(selectSelector) {
	const options = await driver.$$(selectSelector + ' > option');
	return Promise.all(
		options.map(async (opt) => {
			return {
				text: (await opt.getHTML(false)).trim(),
				value: await opt.getAttribute('value'),
			};
		})
	);
}

async function selectOptionsByText(selectSelector, options) {
	let listOfOptions = options.split(';');
	await waitHelpers.waitUntilElementIsPresent(selectSelector);
	for (const option of listOfOptions) {
		await click(`${selectSelector}`);
		const activeResult = `${selectSelector} .active-result`;
		const listOfOptions = await getListOfAllElements(activeResult);
		const listOfOptionsTexts = await getTextFromAllElements(activeResult);
		const optionIndex = listOfOptionsTexts.indexOf(option.trim());
		const element = listOfOptions[optionIndex];
		await element.click();
	}
}

async function loadPageLegacyClient(url, timeout = LOAD_PAGE_TIMEOUT) {
	await driver.url(url);
	await waitHelpers.waitUntilLegacyPageLoads(timeout);
}

async function loadPageNuxtClient(url, timeout = LOAD_PAGE_TIMEOUT) {
	await driver.url(url);
	await waitHelpers.waitUntilNuxtClientLoads(timeout);
}

/**
 * hideElements hide elements
 * @param  string  selectors   css selector or array of css selectors
 */
async function hideElements(selectors) {
	// if arg is no array make it one
	selectors = typeof selectors == 'string' ? [selectors] : selectors;
	for (let i = 0; i < selectors.length; i++) {
		const script = `document.querySelectorAll('${selectors[i]}').forEach(element => element.style.opacity = '0')`;
		await driver.execute(script);
		await waitHelpers.waitUntilPageLoads();
	}
}

/**
 * showElements show elements
 * @param  string  selectors   css selector or array of css selectors
 * if arg is no array make it one
 */
async function showElements(selectors) {
	selectors = typeof selectors == 'string' ? [selectors] : selectors;
	for (let i = 0; i < selectors.length; i++) {
		const script = `document.querySelectorAll('${selectors[i]}').forEach(element => element.style.opacity = '1')`;
		await driver.execute(script);
	}
}
/**
 * clicks an element (or multiple if present) that is not visible,
 * useful in situations where a menu needs a hover before a child link appears
 * @param {string} css selector used to locate the elements
 * @param {string} text to match inner content (if present)
 * @example
 *    this.clickHiddenElement('nav[role="navigation"] ul li a','School Shoes');
 */
async function clickHiddenElement(cssSelector, textToMatch) {
	function clickElementInDom(query, content) {
		let elements = document.querySelectorAll(query);
		let txtProp = 'textContent' in document ? 'textContent' : 'innerText';
		for (let i = 0, l = elements.length; i < l; i++) {
			if (content) {
				if (elements[i][txtProp] === content) {
					elements[i].click();
				}
			} else {
				elements[i].click();
			}
		}
	}
	return driver.elements(cssSelector, clickElementInDom, textToMatch.toLowerCase().trim);
}
/**
 * Get element text
 * @param selectorOrElement
 * @returns text
 */
async function getElementText(selectorOrElement) {
	const element = await waitHelpers.waitUntilElementIsPresent(selectorOrElement);
	const text = await element.getText();
	return text.trim();
}

/**
 * Resolves a single element by selector and returns the value of it's href attribute.
 * @param {*} selector
 */
async function getLink(selector) {
	const element = await driver.$(selector);
	return element.getAttribute('href');
}

async function isElementDisplayed(selector) {
	return (await driver.$(selector)).isDisplayed();
}

async function isElementPresent(selector) {
	const array = await driver.$$(selector);
	return array.length > 0;
}

async function isElementClickable(selector) {
	const element = await driver.$(selector);
	try {
		return element.isClickable();
	} catch (error) {
		return false;
	}
}

async function getPageTitle(selectorOfTitle) {
	await waitHelpers.waitUntilPageLoads();
	const title = await elementHelpers.getElementText(selectorOfTitle);
	return title;
}

async function isUrlContaining(expectedUrl) {
	try {
		return driver.getUrl().includes(expectedUrl);
	} catch (error) {
		return false;
	}
}

async function getTextListFromListOfElements(listOfElements) {
	return Promise.all(listOfElements.map(async (element) => (await element.getText()).trim()));
}

async function getValueListFromListOfElements(listOfElements) {
	return Promise.all(listOfElements.map(async (element) => await element.getValue()));
}

async function getListOfSelectedOption(selectSelector) {
	await waitHelpers.waitUntilElementIsVisible(selectSelector);
	const listOfSelectedOptions = await driver.$$(selectSelector + " option[selected='']");
	return getTextListFromListOfElements(listOfSelectedOptions);
}

async function getValueOfElement(selector) {
	await waitHelpers.waitUntilElementIsVisible(selector);
	const element = await driver.$(selector);
	const value = await element.getValue();
	return value;
}

async function getTextFromAllElements(selector) {
	await waitHelpers.waitUntilPageLoads();
	const listOfElements = await getListOfAllElements(selector);
	let textList = await getTextListFromListOfElements(listOfElements);
	return textList;
}

async function getListOfAllElements(selector) {
	await waitHelpers.waitUntilPageLoads();
	try {
		await waitHelpers.waitUntilElementIsVisible(selector);
	} catch (err) {
		return [];
	}
	return driver.$$(selector);
}

async function isOptionSelected(selectSelector, text) {
	text = text.trim();
	const listOfSelectedOption = await getListOfSelectedOption(selectSelector);
	return listOfSelectedOption.includes(text);
}

/**
 * Use this method to set text of inputfields
 * textBox defines the input field
 * text defines the input itself
 */
async function clearAndSetValue(selectorOrElement, value) {
	await waitHelpers.waitUntilElementIsVisible(selectorOrElement);
	const element = await waitHelpers.waitUntilElementIsEnabled(selectorOrElement);
	await element.setValue(value);
}

async function getElementByText(selector, text) {
	const listOfElements = await getListOfAllElements(selector);
	const listOfElementTexts = await getTextListFromListOfElements(listOfElements);
	text = text.trim();
	const index = listOfElementTexts.indexOf(text);
	return listOfElements[index];
}

async function getElementIncludingText(selector, text) {
	const listOfElements = await getListOfAllElements(selector);
	const listOfElementTexts = await getTextListFromListOfElements(listOfElements);
	text = text.trim();
	const index = listOfElementTexts.findIndex((elem) => elem.includes(text));
	return listOfElements[index];
}

function SelectorConflictException (message) {
	this.message = message;
	this.name = "SelectorConflictException";
}

async function hoverOverMenuOptions(selectorOrElement){
	await driver.$(selectorOrElement).moveTo();
	await driver.pause(3000);
	await click(selectorOrElement);
}

async function scrollToElement(selector){
	await driver.pause(5000);
	let scrollToElement = await driver.$(selector);
	await scrollToElement.scrollIntoView(false);
}

module.exports = {
	click,
	clickAndWait,
	doubleClick,
	doubleClickAndWait,
	clickHiddenElement,
	selectOptionsByText,
	loadPage: loadPageLegacyClient,
	hideElements,
	showElements,
	getSelectOptions,
	getElementText,
	getLink,
	getTextListFromListOfElements,
	getTextFromAllElements,
	getListOfAllElements,
	getValueListFromListOfElements,
	getListOfSelectedOption,
	isElementDisplayed,
	isElementPresent,
	isElementClickable,
	isUrlContaining,
	getPageTitle,
	isOptionSelected,
	clearAndSetValue,
	getValueOfElement,
	getElementByText,
	getElementIncludingText,
	getDisplayedElement,
  	loadPageNuxtClient,
	hoverOverMenuOptions,
	scrollToElement,
};
