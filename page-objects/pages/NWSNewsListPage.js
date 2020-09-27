/*[url/news]*/
'use strict';
const navigationLeftPage = require('./NavigationLeftPage')
const waitHelpers = require('../../runtime/helpers/waitHelpers')
const selectorNewsElementInTheList = 'span.title';
const addNewsBtn = "[data-testid='create-news-btn']";

module.exports = {

	goToNews: async function() {
		await navigationLeftPage.clickNavItemNews();
	},
	clickCreateNewsBtn: async function () {
		await waitHelpers.waitAndClick(addNewsBtn);
	},
    verifyWhetherVisible: async function() {
		const listOfElements = await driver.$$(selectorNewsElementInTheList);
		const namePromises = listOfElements.map(async element => await element.getText());
		const newsNames = await Promise.all(namePromises);
		return newsNames;
	},
	shouldBeVisible: async function(name) {
		let newsNames = await this.verifyWhetherVisible();
		await expect(newsNames).to.include(name);
	},
	shouldNotBeVisible: async function(name) {
		let newsNames = await this.verifyWhetherVisible();
		await expect(newsNames).to.not.include(name);
	}
}
