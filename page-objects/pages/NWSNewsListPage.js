/*[url/news]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const { CLIENT } = require("../../shared-objects/servers");

module.exports = {
	// URL HELPER
	goToNews: async function() {
		let url = `${CLIENT.URL}/news/`;
		await elementHelpers.loadPage(url, 100);
    },
    verifyWhetherVisible: async function() {
		const elements = await driver.$$('span.title');
		const namePromises = elements.map(async element => await element.getText());
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
