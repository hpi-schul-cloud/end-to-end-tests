'use strict';
//myOwn
const lernStorePage = require('../../page-objects/pages/lernStorePages/LRNSTRLernStorePage');

When(/^.*goes to learning store$/, async function () {
	return lernStorePage.goToLernStore();
});

//myOWn
When(/^.*enters content name '([^']*)' into search field$/, async function (contentName) {
	return lernStorePage.setContentNameIntoSearchInputField(contentName);
});
//myOWn
When(/^.*waits till content is loaded$/, async function () {
	return lernStorePage.isContentCardVisible();
});
When(/^.*clicks on content card$/, async function () {
	return lernStorePage.clickContentCard();
});
When(/^.*waits till content page is loaded$/, async function () {
	return lernStorePage.isContentButtonVisible();
});
//myOWn
When(/^.*clicks on content button$/, async function () {
	return lernStorePage.clickContentButton();
});
When(/^.*waits till FWU content is loaded$/, async function () {
	return lernStorePage.isContentVisible();
});


//myOWn
Then(/^.* get the FWU content name '([^']*)' with title '([^']*)'$/, async function (contentName, expectedTitle) {
	return lernStorePage.isContentTitle(contentName, expectedTitle);
});