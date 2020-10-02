/*[url/news/[newsId]/edit] | [url/news/[newsId]/new]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const { CLIENT } = require("../../shared-objects/servers");
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers');

const submitNewsBtn = 'button[data-testid="btn_news_submit"]';
const titleField = 'input.h1';
const contentField = '.editor [contenteditable="true"]';
const dateSelector = '[data-testid="news_date"] input';
const timeSelector = '[data-testid="news_time"] input';


module.exports = {
    goToNewNews: async function () {
        let url = `${CLIENT.URL}/news/new`;
        await elementHelpers.loadPage(url, 100);
    },
    setTitle: async function (title) {
        let titleFieldInput = await driver.$(titleField);
        await titleFieldInput.waitForExist(1000);
        await titleFieldInput.setValue(title);
    },
    setContent: async function (content) {
        let contentFieldInput = await driver.$(contentField);
        await contentFieldInput.waitForExist(1000);
        await contentFieldInput.setValue(content);
    },
    setPublishDate: async function (date) {
        let dateField = await driver.$(dateSelector);
        await dateField.waitForExist(1000);
        await dateField.setValue(date);
    },
    setPublishTime: async function (time) {
        let timeField = await driver.$(timeSelector);
        await timeField.waitForExist(1000);
        await timeField.setValue(time);
    },
    save: async function () {
        let add = await driver.$(submitNewsBtn);
        await add.click();
    },
    createNews: async function ({ title, content, date, time }) {
        await this.goToNewNews();
        if (title) {
            await this.setTitle(title)
        }
        if (content) {
            await this.setContent(content)
        }
        if (date) {
            await this.setPublishDate(date);
        }
        if (time) {
            await this.setPublishTime(time);
        }
        await this.save();
    },
    performCreateNews: async function (title) {
        await this.createNews({
            title: title,
            content: "Here are some announcements for my pupils"
        });
    },
    performCreateNewsLater: async function (title) {
        await this.createNews({
            title: title,
            content: "Here are some announcements for my pupils",
            date: dateTimeHelpers.setDate(0, 1, 1, '.', false)
        });
    }
}
