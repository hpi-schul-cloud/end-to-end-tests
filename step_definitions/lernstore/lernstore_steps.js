'use strict';
const navigationLeftPage = require('../../page-objects/pages/NavigationLeftPage');
const lernstorePage = require('../../page-objects/pages/LRNSTRLernStorePage');
const { expect } = require('chai');

When(/^.*goes to Lernstore$/, async function () {
	await navigationLeftPage.clickNavItemContent();
});
When(/^.*searches for content '([^']*)'$/, async function (contentName) {
	await lernstorePage.searchLernstore(contentName);
});
When(/^.*the returned result should be greater than '([^']*)'$/, async function (expectedResults) {
	const total = await lernstorePage.getTotalContent();
	const totalNumberRegex = total.match(/\d+/g);
	await expect(parseInt(totalNumberRegex)).to.be.greaterThan(parseInt(expectedResults));
});
