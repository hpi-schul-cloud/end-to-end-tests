'use strict';

const TASKListPage = require('../../page-objects/pages/TASKListPage.js');

//WHEN

When(/^.* clicks on Delete task button$/, async function () {
	await TASKListPage.clickDeleteTaskButtonInPopup();
});

When(/^.* filter by '([^']*)'$/, async function (courseName){
	await TASKListPage.sortTasksCourse(courseName);
});

