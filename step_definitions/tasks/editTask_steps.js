'use strict'

const TASKListPage = require('../../page-objects/pages/TASKListPage.js');

When(/^.* see visible task '([^']*)'$/, async function (taskName) {
	await TASKListPage.isTaskVisible(taskName, true);
});