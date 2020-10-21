'use strict';

const TMSAddEditTeamPage = require('../page-objects/pages/teamsPages/TMSAddEditTeamPage');
const newsAddEditNews = require('../page-objects/pages/NWSAddEditNewsPage');
const newsListPage = require('../page-objects/pages/NWSNewsListPage');
let name = "news";
let laterNewsName = "news should be published later";
const common = require('../shared_steps/common-steps.js');



When(/^.*creates some news which has to be published immediately$/, function () {
	return newsAddEditNews.performCreateNews(name);
});

Then(/^.*can see the news$/, async function () {
	await newsListPage.isNewsVisible(name, true);
});

When(/^.*creates some news which has to be published later$/, function () {
	return newsAddEditNews.performCreateNewsLater(laterNewsName);
});

Then(/^.*cannot see the news which is not due yet$/, async function () {
	await newsListPage.isNewsVisible(name, true);
});

