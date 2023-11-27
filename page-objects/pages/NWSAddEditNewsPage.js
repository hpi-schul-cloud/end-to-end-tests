/*[url/news/[newsId]/edit] | [url/news/[newsId]/new]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const newsListPage= require('./NWSNewsListPage');
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const submitNewsBtn = '[data-testid="btn_news_submit"]';
const addNewsBtn = "[data-testid='create-news-btn']";
const titleField = 'input.h1';
const contentField = '.ck-editor [contenteditable="true"]';
const dateTimeSelector = '[data-testid="news_date"] input'

async function goToNewNews () {
    await newsListPage.goToNews();
    await  clickCreateNewsButton();
}

async function setNewsTitle (newsTitle) {
    await waitHelpers.waitAndSetValue(titleField, newsTitle);
}

async function setNewsContent (newsContent) {
    await elementHelpers.click(contentField);
    await waitHelpers.waitAndSetValue(contentField, newsContent, 1000);
}

async function setNewsPublishDate (newsDate) {
    await waitHelpers.waitAndSetValue(dateTimeSelector, newsDate);
}

async function setNewsPublishTime (newsTime) {
    await waitHelpers.waitAndSetValue(dateTimeSelector, newsTime);
}

async function clickCreateNewsButton () {
    await elementHelpers.clickAndWait(addNewsBtn);
}

async function clickCreateNewsConfirmationButton () {
    await elementHelpers.clickAndWait(submitNewsBtn);
}

async function createNews ({ newsTitle, newsContent, date, time}) {
    await goToNewNews();
    if (newsTitle) await setNewsTitle(newsTitle);
    if (newsContent) await setNewsContent(newsContent);
    if (date) await setNewsPublishDate(date);
    if (time) await setNewsPublishTime(time);
    await clickCreateNewsConfirmationButton();
}

module.exports = {
    goToNewNews,
    createNews,
}
