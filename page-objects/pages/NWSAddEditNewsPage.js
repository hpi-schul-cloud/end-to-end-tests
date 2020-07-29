/*[url/news/[newsId]/edit] | [url/news/[newsId]/new]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const { CLIENT } = require("../../shared-objects/servers");
const Login = require('../../shared-objects/loginData');
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers');

module.exports = {
goToNewNews: async function() {
    let url = `${CLIENT.URL}/news/new`;
    await elementHelpers.loadPage(url, 100);
},
setTitle: async function(title){
    let titleField = await driver.$('input.h1');
    await titleField.waitForExist(1000);
    await titleField.setValue(title);
},
setContent: async function(content){
    let contentField = await driver.$('.editor [contenteditable="true"]');
    await contentField.waitForExist(1000);
    await contentField.setValue(content);
},
setPublishDate: async function(date) {
    let dateSelector = await driver.$('[data-testid="news_date"] input');
    await dateSelector.waitForExist(1000);
    await dateSelector.setValue(date);
},
setPublishTime: async function(time) {
    let timeSelector = await driver.$('[data-testid="news_time"] input');
    await timeSelector.waitForExist(1000);
    await timeSelector.setValue(time);
},
save: async function() {
    let add = await driver.$(Login.elem.submitNewsBtn);
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
