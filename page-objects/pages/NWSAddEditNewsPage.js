/*[url/news/[newsId]/edit] | [url/news/[newsId]/new]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const { CLIENT } = require("../../shared-objects/servers");
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers');
const waitHelpers = require('../../runtime/helpers/waitHelpers');

const selectors = {
    timeNewsMustBePublished: 'input[data-testid="news_date_to_be_displayed"]',
    submitNewsBtn: 'button[data-testid="btn_news_submit"]',
    titleField: 'input.h1',
    contentField: '.editor [contenteditable="true"]',
    dateSelector: '[data-testid="news_date"] input',
};

module.exports = {
selectors,
goToNewNews: async function() {
    let url = `${CLIENT.URL}/news/new`;
    await elementHelpers.loadPage(url, 100);
},
setTitle: async function(title){
    await waitHelpers.waitAndSetValue(selectors.titleField, title)
},
setContent: async function(content){
    await waitHelpers.waitAndSetValue(selectors.contentField, content);
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
    let add = await driver.$(selectors.submitNewsBtn);
    await add.click();
},
createNews: async function({title, content, date, time}) {
    await this.goToNewNews();
    if(title){
        await this.setTitle(title)
    }
    if(content){
        await this.setContent(content)
    }
    if(date){
        await this.setPublishDate(date);
    }
    if(time){
        await this.setPublishTime(time);
    }
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
