/*[url/news/[newsId]/edit] | [url/news/[newsId]/new]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const { CLIENT } = require("../../shared-objects/servers");
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers');

const timeNewsMustBePublished = 'input[data-testid="news_date_to_be_displayed"]';
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
        let titleField = await driver.$(titleField);
        await titleField.waitForExist(1000);
        await titleField.setValue(title);
    },
    setContent: async function (content) {
        let contentField = await driver.$(contentField);
        await contentField.waitForExist(1000);
        await contentField.setValue(content);
    },
    setPublishDate: async function (date) {
        let dateSelector = await driver.$(dateSelector);
        await dateSelector.waitForExist(1000);
        await dateSelector.setValue(date);
    },
    setPublishTime: async function (time) {
        let timeSelector = await driver.$(timeSelector);
        await timeSelector.waitForExist(1000);
        await timeSelector.setValue(time);
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
    }
    //?performCreateNews:
    //?performCreateNewsLater:
}
