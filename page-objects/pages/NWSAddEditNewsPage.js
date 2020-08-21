/*[url/news/[newsId]/edit] | [url/news/[newsId]/new]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const { CLIENT } = require("../../shared-objects/servers");
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers');
const waitHelpers = require('../../runtime/helpers/waitHelpers');

const selectors = {
    timeNewsMustBePublished: 'input[data-testid="news_date_to_be_displayed"]',
    submitNewsBtn: 'button[data-testid="btn_news_submit"]',
    newsTitle: '[data-testid="news_title"]',
    editorContent: '.ck-content',
    timeSel: '[data-testid="news_date_to_be_displayed"]',
   
};
const newsData = {
    title: "news",
    content: "news content",
    date: "20.02.2040 10:00"
}


module.exports = {
selectors, newsData,
goToNewNews: async function() {
    let url = `${CLIENT.URL}/news/new`;
    await elementHelpers.loadPage(url, 10);
},
setTitle: async function(title){
    await waitHelpers.waitAndSetValue(selectors.newsTitle, title)
},
setContent: async function(content){
    let contentSel = await driver.$(selectors.editorContent);
    await contentSel.setValue(content);
    await driver.pause(1500);
},
setPublishDateAndTime: async function(date) {
    await driver.execute(`document.querySelector("data-testid="news_date_to_be_displayed").value="${newsData.date}"`);
},
setPublishTime: async function(time) {
    let timeSelector = await driver.$(selectors.timeSel);
    await timeSelector.waitForExist(1000);
    await timeSelector.setValue(time);
},
save: async function() {
    await waitHelpers.waitAndClick(selectors.submitNewsBtn);
},
createNews: async function() {
    await this.goToNewNews();
    await this.setTitle(newsData.title)
    await this.setContent(newsData.content)
    await this.save();
},
performCreateNews: async function(title) {
    await this.createNews({
        title: title,
        content: "Here are some announcements for my pupils"
    });
},
performCreateNewsLater: async function() {
    await this.goToNewNews();
    await this.setTitle(newsData.title)
    await this.setContent(newsData.content);
    await this.setPublishDateAndTime();
    await this.save();
}
}
