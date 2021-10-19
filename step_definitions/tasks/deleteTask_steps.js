'use strict';

const TASKListPage = require('../../page-objects/pages/TASKListPage.js');

//WHEN

When(/^.* clicks on Delete task button$/, async function () {
	await TASKListPage.clickDeleteTaskButtonInPopup();
});

Then(/^.* should not see task with name '([^']*)' visible$/, async function (taskName) {
	await TASKListPage.sortTasksKurse();
	await TASKListPage.isTaskVisible(taskName, false);
});

Then(/^.* should see task with name '([^']*)' visible$/, async function (taskName) {
	await TASKListPage.sortTasksKurse();
	await TASKListPage.isTaskVisible(taskName, true);
});
