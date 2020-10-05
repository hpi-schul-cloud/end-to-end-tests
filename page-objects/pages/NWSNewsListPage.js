/*[url/news]*/
'use strict';
const navigationLeftPage = require('./NavigationLeftPage')
const selectorNewsElementInTheList = 'span.title';
const addNewsBtn = "[data-testid='create-news-btn']";

module.exports = {

	goToNews: async function() {
		await navigationLeftPage.clickNavItemNews();
    },
    getListOfNewNames: async function() {
		const listOfElements = await driver.$$(element);
		const namePromises = listOfElements.map(async element => await element.getText());
		const newsNames = await Promise.all(namePromises);
		return newsNames;
	},
	isNewsVisible: async function(name) {
		let newsNames = await this.getListOfNewNames();
		await expect(newsNames).to.include(name);
	},
	isNewsNotVisible: async function(name) {
		let newsNames = await this.getListOfNewNames();
		await expect(newsNames).to.not.include(name);
	}
}
