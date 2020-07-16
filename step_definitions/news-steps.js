'use strict';
const loginPage = require('../page-objects/pages/loginPage');
const startPage = require('../page-objects/pages/startPage');
const news = require('../page-objects/news');
const Login = require('../shared-objects/loginData');
let name = "news";
let laterNewsName = "news should be published later";
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const firstLogin = require('../shared_steps/firstLogin.js');


Given(/^The teacher arrives on the Schul-Cloud page$/, function() {
	return elementHelpers.loadPage(shared.loginData.url, 20);
});  

Given(/^teacher is successfully logged-in$/, async function() {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(Login.defaultTeacherUsername,Login.defaultTeacherpassword);
});

When(/^teacher creats some news which has to be published immediately$/, function() {
	return news.performCreateNews(name);
});

When(/^a user who has permissions to see the news logs in$/, async function() {

	return news.loginAsPupil();
});
When(/^he goes to the news page$/, function() {
	return news.gotoNews();
});
Then(/^he can see the news$/, async function() {
	let newsNames = await news.verifyWhetherVisible();
	await expect(newsNames).to.include(name);
});

When(/^teacher creats some news which has to be published later$/, function() {
	return news.performCreateNewsLater(laterNewsName);
});

When(/^a pupil logs in$/, function() {
	return news.loginAsPupil();
});
When(/^he goes to news page$/, function() {
	return news.gotoNews();
});
Then(/^he cannot see the news which is not due yet$/, async function() {
	let newsNames = await news.verifyWhetherVisible();
	await expect(newsNames).not.to.include(name);
});
// TEAM

When(/^teacher creates two teams team and news for these teams$/, function() {
	return news.createTwoTeams();
});

Then(/^team member can see the news$/, function() {
	return news.canTeamMemberSeeTheNews();
});
Then(/^team non-members cannot see the news$/, function() {
	return news.canNonTeamMemberSeeTheNews();
});
