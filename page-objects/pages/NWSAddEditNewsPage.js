/*[url/news/[newsId]/edit] | [url/news/[newsId]/new]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers');
const newsListPage= require('./NWSNewsListPage');
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const submitNewsBtn = '[data-testid="btn_news_submit"]';
const addNewsBtn = "[data-testid='create-news-btn']";
const titleField = 'input.h1';
const contentField = '.editor [contenteditable="true"]';
const dateSelector = '[data-testid="news_date"] input';
const timeSelector = '[data-testid="news_time"] input';

async function goToNewNews () {
    await newsListPage.goToNews();
    await  clickCreateNewsButton();
}

async function setTitle (title) {
    await waitHelpers.waitAndSetValue(titleField, title);
}

async function setContent (content) {
    await waitHelpers.waitAndSetValue(contentField, content);
}

async function setPublishDate (date) {
    await waitHelpers.waitAndSetValue(dateSelector, date);
}

async function setPublishTime (time) {
    await waitHelpers.waitAndSetValue(timeSelector, time);
}

async function clickCreateNewsButton () {
    await elementHelpers.clickAndWait(addNewsBtn);
}

async function createNews ({ title, content, date, time }) {
    await goToNewNews();
    if (title) await setTitle(title);
    if (content) await setContent(content);
    if (date) await setPublishDate(date);
    if (time) await setPublishTime(time);
    await elementHelpers.click(submitNewsBtn);
}

async function performCreateNews (title) {
    await createNews({
        title: title,
        content: "Here are some announcements for my pupils"
    });
}


async function performCreateNewsLater (title) {
    await createNews({
		title: title,
		content: 'Here are some announcements for my pupils',
		date: dateTimeHelpers.setDate(0, 1, 1, '.', false),
	});
}

module.exports = {
    goToNewNews,
    createNews,
    performCreateNews,
    performCreateNewsLater,
}
