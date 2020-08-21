'use strict';

const TMSAddEditTeamPage = require('../page-objects/pages/teamsPages/TMSAddEditTeamPage');
const newsAddEditNews = require('../page-objects/pages/NWSAddEditNewsPage');
const newsListPage = require('../page-objects/pages/NWSNewsListPage');
const common = require('../shared_steps/common-steps.js');



When(/^teacher creates some news which has to be published immediately$/, async function() {
	await newsAddEditNews.createNews();
});


When(/^he goes to the news page$/, function() {
	return newsListPage.goToNews();
});
Then(/^he can see the news$/, async function() {
	let newsNames = await newsListPage.verifyWhetherVisible();
	await expect(newsNames).to.include(newsAddEditNews.newsData.title);
});

When(/^teacher creates some news which has to be published later$/, function() {
	return newsAddEditNews.performCreateNewsLater();
});

Then(/^he cannot see the news which is not due yet$/, async function() {
	let newsNames = await newsListPage.verifyWhetherVisible();
	await expect(newsNames).not.to.include(newsAddEditNews.newsData.title);
});
// TEAM

When(/^teacher creates two teams team and news for these teams$/, function() {
	return TMSAddEditTeamPage.createTwoTeams();
});

Then(/^team member can see the news$/, function() {
	return TMSAddEditTeamPage.canTeamMemberSeeTheNews();
});
Then(/^team non-members cannot see the news$/, function() {
	return TMSAddEditTeamPage.canNonTeamMemberSeeTheNews();
});

