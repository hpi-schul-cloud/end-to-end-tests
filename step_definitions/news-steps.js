'use strict';
const loginPage = require('../page-objects/pages/loginPage');
const startPage = require('../page-objects/pages/startPage');
const TMSAddEditTeamPage = require('../page-objects/pages/teamsPages/TMSAddEditTeamPage');
const newsAddEditNews = require('../page-objects/pages/NWSAddEditNewsPage');
const newsListPage = require('../page-objects/pages/NWSNewsListPage');
const Login = require('../shared-objects/loginData');
let name = "news";
let laterNewsName = "news should be published later";
const elementHelpers = require('../runtime/helpers/elementHelpers');
const firstLogin = require('../shared_steps/firstLogin.js');



Given(/^The teacher arrives on the Schul-Cloud page$/, function() {
	return elementHelpers.loadPage(shared.loginData.url, 20);
});  

Given(/^teacher is successfully logged-in$/, async function() {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(Login.defaultTeacherUsername,Login.defaultTeacherpassword);
});

When(/^teacher creats some news which has to be published immediately$/, function() {
	return newsAddEditNews.performCreateNews(name);
});

When(/^a user who has permissions to see the news logs in$/, async function() {

	return firstLogin.loginAsPupil(Login.notEligiblePupilUsername, Login.notEligiblePupilPassword);
});
When(/^he goes to the news page$/, function() {
	return newsListPage.goToNews();
});
Then(/^he can see the news$/, async function() {
	let newsNames = await newsListPage.verifyWhetherVisible();
	await expect(newsNames).to.include(name);
});

When(/^teacher creats some news which has to be published later$/, function() {
	return newsAddEditNews.performCreateNewsLater(laterNewsName);
});

When(/^a pupil logs in$/, function() {
	return firstLogin.loginAsPupil(Login.notEligiblePupilUsername, Login.notEligiblePupilPassword);
});
When(/^he goes to news page$/, function() {
	return newsListPage.goToNews();
});
Then(/^he cannot see the news which is not due yet$/, async function() {
	let newsNames = await newsListPage.verifyWhetherVisible();
	await expect(newsNames).not.to.include(laterNewsName);
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
