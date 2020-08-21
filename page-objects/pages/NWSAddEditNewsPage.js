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
};

module.exports = {
selectors,
goToNewNews: async function() {
    let url = `${CLIENT.URL}/news/new`;
    await elementHelpers.loadPage(url, 100);
},
setTitle: async function(title){
    await waitHelpers.waitAndSetValue(selectors.newsTitle, title)
},
setContent: async function(content){
    let contentField = await driver.$('.editor [contenteditable="true"]');
    await contentField.waitForExist(2500);
    await contentField.setValue(content);
},
setPublishDate: async function(date) {
    await waitHelpers.waitAndSetValue(selectors.dateSelector,date)
},
setPublishTime: async function(time) {
    let timeSelector = await driver.$('[data-testid="news_time"] input');
    await timeSelector.waitForExist(1000);
    await timeSelector.setValue(time);
},
save: async function() {
    await waitHelpers.waitAndClick(submitNewsBtn);
},
createNews: async function({title, content, date, time}) {
    await this.goToNewNews();
    await this.setTitle(title)
    await this.setContent(content)
    await this.setPublishDate(date);
    await this.setPublishTime(time);
    await this.save();
},
performCreateNews: async function(title) {
    await this.createNews({
        title: title,
        content: "Here are some announcements for my pupils"
    });
},
performCreateNewsLater: async function(title) {
    await this.createNews({
        title: title,
        content: "Here are some announcements for my pupils",
        date: dateTimeHelpers.setDate(0,1,1,'.', false)
    });
}
}
