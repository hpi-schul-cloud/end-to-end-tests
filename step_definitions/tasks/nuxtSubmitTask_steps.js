'use strict'

const { default: dragAndDrop } = require("webdriverio/build/commands/element/dragAndDrop");
const TASKPage = require("../../page-objects/pages/TASKPage");
const TASKListPage = require("../../page-objects/pages/TASKListPage");


When(/^.* clicks the current task tab$/, async function (){
    await TASKPage.goToNuxtTasksTab();
});

When(/^.* clicks task Task19$/, async function (){
    await TASKListPage.clickTaskWithoutDuedate();
});

When(/^.* clicks on submit button$/, async function (){
    await TASKPage.clickSaveAndSendSubmissionBtn();
});

When(/^.* clicks completed task tab$/, async function (){
    await TASKPage.clickCompletedTab();
});

When(/^.* clicks at Task19$/, async function (){
    await TASKListPage.clickUngradedTask();
});
