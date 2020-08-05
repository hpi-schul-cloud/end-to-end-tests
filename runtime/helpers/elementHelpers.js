"use strict";

module.exports = {
	/**
	 * ========== All operational functions ==========
	 */
	/**
	 * returns a promise that is called when the url has loaded and the body element is present
	 * @param {string} url to load
	 * @returns {Promise}
	 * @example
	 *      this.loadPage('http://www.google.co.uk');
	 */
	loadPage: function (url, seconds) {
		/**
		 * Wait function - measured in seconds for pauses during tests to give time for processes such as
		 * a page loading or the user to see what the test is doing
		 * @param seconds
		 * @type {number}
		 */
		let timeout = seconds ? seconds * 1000 : DEFAULT_TIMEOUT;
		/**
		 * load the url and wait for it to complete
		 */
		return driver.url(url, function () {
			/**
			 * now wait for the body element to be present
			 */
			return driver.waitUntil(driver.$("body"), timeout);
		});
	},

	/**
	 *Selectors should be found on the page, selector is given as a path
	 * @param selector
	 * @returns {Promise<void>}
	 */
	isSelectorOnThePage: async function (selector) {
		const array = await driver.$$(selector);
		if (array.length > 0) {
			return 1;
		} else {
			return 0;
		}
	},

	/**
	 * hideElements hide elements
	 * @param  string  selectors   css selector or array of css selectors
	 */
	hideElements: async function (selectors) {
		// if arg is no array make it one
		selectors = typeof selectors == "string" ? [selectors] : selectors;
		for (let i = 0; i < selectors.length; i++) {
			const script = `document.querySelectorAll('${selectors[i]}').forEach(element => element.style.opacity = '0')`;

			await driver.execute(script);
		}
	},

	hideElements: async function (selectors) {
		// if arg is no array make it one
		selectors = typeof selectors == "string" ? [selectors] : selectors;
		for (let i = 0; i < selectors.length; i++) {
			const script = `document.querySelectorAll('${selectors[i]}').forEach(element => element.style.opacity = '0')`;

			await driver.execute(script);
		}
	},
	/**
	 * showElements show elements
	 * @param  string  selectors   css selector or array of css selectors
	 */
	showElements: async function (selectors) {
		// if arg is no array make it one
		selectors = typeof selectors == "string" ? [selectors] : selectors;
		for (let i = 0; i < selectors.length; i++) {
			const script = `document.querySelectorAll('${selectors[i]}').forEach(element => element.style.opacity = '1')`;

			await driver.execute(script);
		}
	},
	/**
	 * clicks an element (or multiple if present) that is not visible,
	 * useful in situations where a menu needs a hover before a child link appears
	 * @param {string} css selector used to locate the elements
	 * @param {string} text to match inner content (if present)
	 * @example
	 *    this.clickHiddenElement('nav[role="navigation"] ul li a','School Shoes');
	 */
	clickHiddenElement: function (cssSelector, textToMatch) {
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
			let txtProp =
				"textContent" in document ? "textContent" : "innerText";

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
		return driver.elements(
			cssSelector,
			clickElementInDom,
			textToMatch.toLowerCase().trim
		);
	},
	/**
	 * Get the text of an Element
	 * @param selector
	 * @returns text
	 */
	getElementText: async function (selector) {
		let elem = await driver.$(selector);
		await elem.waitForExist(DELAY_10_SECOND);
		let text = await elem.getText();
		return text;
	},

	/**
	 * function to get element from frame or frameset
	 * @param frame_name
	 * @param selector
	 * @returns {Promise.<TResult>}
	 */
	getElementFromFrame: function (frame_name, selector) {
		let frame = driver.element(frame_name);
		driver.frame(frame.value);
		driver.getHTML(selector);
		return driver;
	},
	getLink: function (selector) {
		return driver.getAttribute(selector, "href");
	},

	isElementDisplayed: async function (selector) {
		await driver.$(selector).isDisplayed();
	},

	isElementPresent: async function (selector) {
		const array = await driver.$$(selector);
		return array.length > 0;
	},

	getTextListFromListOfElements: async function (listOfElements) {
		return await Promise.all(
			listOfElements.map(async (element) => await element.getText())
		);
	},

	getValueListFromListOfElements: async function (listOfElements) {
		return await Promise.all(
			listOfElements.map(async (element) => await element.getValue())
		);
	},

	fillInputField: async function(selector, text) {
		let searchfield = await driver.$(selector);
		await searchfield.setValue(text);
	},
};
