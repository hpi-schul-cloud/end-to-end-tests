/*[url/news/[newsId]/edit] | [url/news/[newsId]/new]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const { CLIENT } = require("../../shared-objects/servers");
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers');

const selectors = {
    timeNewsMustBePublished: 'input[data-testid="news_date_to_be_displayed"]',
    submitNewsBtn: 'button[data-testid="btn_news_submit"]',
    titleField: 'input.h1',
    contentField: '.editor [contenteditable="true"]',
    dateSelector: '[data-testid="news_date"] input',
    timeSelector: '[data-testid="news_time"] input',
};

module.exports = {
selectors,
goToNewNews: async function() {
    let url = `${CLIENT.URL}/news/new`;
    await elementHelpers.loadPage(url, 100);
},
setTitle: async function(title){
    let titleField = await driver.$(selectors.titleField);
    await titleField.waitForExist(1000);
    await titleField.setValue(title);
},
setContent: async function(content){
    let contentField = await driver.$(selectors.contentField);
    await contentField.waitForExist(1000);
    await contentField.setValue(content);
},
setPublishDate: async function(date) {
    let dateSelector = await driver.$(selectors.dateSelector);
    await dateSelector.waitForExist(1000);
    await dateSelector.setValue(date);
},
setPublishTime: async function(time) {
    let timeSelector = await driver.$(selectors.timeSelector);
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
