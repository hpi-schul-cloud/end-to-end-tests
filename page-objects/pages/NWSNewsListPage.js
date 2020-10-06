/*[url/news]*/
'use strict';
const navigationLeftPage = require('./NavigationLeftPage')
const selectorNewsElementInTheList = 'span.title';
const addNewsBtn = "[data-testid='create-news-btn']";
const newsContainer = "[data-testid='container_of_element']"

module.exports = {

	goToNews: async function() {
		await navigationLeftPage.clickNavItemNews();
    },
    getListOfNewNames: async function() {
		const listOfElements = await driver.$$(selectorNewsElementInTheList);
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
