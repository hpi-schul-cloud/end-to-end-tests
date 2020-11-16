'use strict';
const newsAddEditNews = require('../page-objects/pages/NWSAddEditNewsPage');
const newsListPage = require('../page-objects/pages/NWSNewsListPage');
const dateTimeHelpers = require('../runtime/helpers/dateTimeHelpers.js');
const common = require('../shared_steps/common-steps.js');

When(/^.*creates news with title '([^']*)', content '([^']*)' and current date$/, async function (newsTitle, newsContent) {
	await newsAddEditNews.createNews({newsTitle: newsTitle, newsContent: newsContent});
});

When(/^.*creates news with title '([^']*)', content '([^']*)' and a one-year delay$/, async function (newsTitle, newsContent) {
	const getDate = dateTimeHelpers.getCurrentFormattedDateWithOffset({years: +1, format: "mm/dd/yyyy"});
	await newsAddEditNews.createNews({newsTitle: newsTitle, newsContent: newsContent, date: getDate});
});

Then(/^.*news with title '([^']*)' is visible on the list$/, async function (newsTitle) {
	await newsListPage.isNewsVisible(newsTitle, true);
});

Then(/^.*news with title '([^']*)' is not visible on the list$/, async function (newsTitle) {
	await newsListPage.isNewsVisible(newsTitle, false);
});

