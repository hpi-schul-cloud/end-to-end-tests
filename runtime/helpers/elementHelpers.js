"use strict";

const waitHelpers = require("./waitHelpers");

//Wait for element and click (without waitUntilPageLoads)
async function click(selectorOrElement) {
    const element = await waitHelpers.waitUntilElementIsClickable(selectorOrElement);
    await element.click();
    //waitUntilPageLoads(); is temporary:
    await waitHelpers.waitUntilPageLoads();
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
    const options = await driver.$$(selectSelector + " > option");
    return Promise.all(
        options.map(async (opt) => {
            return {
                text: (await opt.getHTML(false)).trim(),
                value: await opt.getAttribute("value"),
            };
        })
    );
}
//TO DO class name
async function selectOptionByText(selectSelector, text) {
const searchText = text.trim().split(" ")[0];
const searchResult = await driver.$(`option*=${searchText}`);
await searchResult.click();
};

async function loadPage(url, seconds = DELAY_20_SECOND) {
    let timeout = seconds * 1000;
    await driver.url(url);
    await waitHelpers.waitUntilPageLoads(timeout);
}

/**
 * hideElements hide elements
 * @param  string  selectors   css selector or array of css selectors
 */
async function hideElements(selectors) {
    // if arg is no array make it one
    selectors = typeof selectors == "string" ? [selectors] : selectors;
    for (let i = 0; i < selectors.length; i++) {
        const script = `document.querySelectorAll('${selectors[i]}').forEach(element => element.style.opacity = '0')`;
        await driver.execute(script);
        await waitHelpers.waitUntilPageLoads();
    }
}

/**
 * showElements show elements
 * @param  string  selectors   css selector or array of css selectors
 */
async function showElements(selectors) {
    // if arg is no array make it one
    selectors = typeof selectors == "string" ? [selectors] : selectors;
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
    /**
     * method to execute within the DOM to find elements containing text
     */
    function clickElementInDom(query, content) {
        /**
         * get the list of elements to inspect
         */
        let elements = document.querySelectorAll(query);
        /**
         * workout which property to use to get inner text
         */
        let txtProp = "textContent" in document ? "textContent" : "innerText";

        for (let i = 0, l = elements.length; i < l; i++) {
            /**
             * If we have content, only click items matching the content
             */
            if (content) {
                if (elements[i][txtProp] === content) {
                    elements[i].click();
                }
            } else {
                /**
                 * otherwise click all
                 */
                elements[i].click();
            }
        }
    }
    /**
     * grab the matching elements
     */
    return driver.elements(cssSelector, clickElementInDom, textToMatch.toLowerCase().trim);
}
/**
 * Get the text of an Element
 * @param selector
 * @returns text
 */
async function getElementText(selectorOrElement) {
    const element = await waitHelpers.waitUntilElementIsPresent(selectorOrElement);
    return element.getText();
}

/**
 * function to get element from frame or frameset
 * @param frame_name
 * @param selector
 * @returns {Promise.<TResult>}
 */
async function getElementFromFrame(frame_name, selector) {
    let frame = driver.element(frame_name);
    driver.frame(frame.value);
    driver.getHTML(selector);
    return driver;
}
async function getLink(selector) {
    return driver.getAttribute(selector, "href");
}

async function isElementDisplayed(selector) {
    await driver.$(selector).isDisplayed();
}

async function isElementPresent(selector) {
    const array = await driver.$$(selector);
    return array.length > 0;
}

async function isElementClickable(selector) {
    const element = await driver.$(selector);
    try {
        return await element.isClickable();
    } catch (error) {
        return false;
    }
}

async function isUrlContaining(expectedUrl) {
    try {
        return await driver.getUrl().includes(url);
    } catch (error) {
        return false;
    }
}

async function getTextListFromListOfElements(listOfElements) {
    return Promise.all(listOfElements.map(async (element) => await element.getText()));
}

async function getValueListFromListOfElements(listOfElements) {
    return Promise.all(listOfElements.map(async (element) => await element.getValue()));
}

module.exports = {
    click,
    clickAndWait,
    doubleClick,
    doubleClickAndWait,
    getSelectOptions,
    selectOptionByText,
    loadPage,
    hideElements,
    showElements,
    clickHiddenElement,
    getElementText,
    getElementFromFrame,
    getLink,
    isElementDisplayed,
    isElementPresent,
    isElementClickable,
    isUrlContaining,
    getTextListFromListOfElements,
    getValueListFromListOfElements,
};
