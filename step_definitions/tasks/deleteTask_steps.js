'use strict';

const TASKListPage = require('../../page-objects/pages/TASKListPage.js');

//WHEN

When(/^.* clicks on '([^']*)' button$/, async function (button) {
	await TASKListPage.clickDeleteTaskButtonInPopup(button);
});

When(/^.* filter by '([^']*)'$/, async function (courseName){
	await TASKListPage.sortTasksCourse(courseName);
});
