'use strict';

const TASKListPage = require('../../page-objects/pages/TASKListPage.js');

//WHEN

When(/^.* clicks on Delete task button$/, async function () {
	await TASKListPage.clickDeleteTaskButtonInPopup();
});