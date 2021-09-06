'use strict'

const { default: dragAndDrop } = require("webdriverio/build/commands/element/dragAndDrop");
const TASKPage = require("../../page-objects/pages/TASKPage");
const TASKListPage = require("../../page-objects/pages/TASKListPage");


When(/^.*clicks the current task tab$/, async function (){
    await TASKPage.gotoNuxtTasksTab();
});

When(/^.*click on without duedate task section$/, async function (){
    await TASKPage.taskWithoutDueDate();
});

When(/^.*click to the task$/, async function (){
    await TASKListPage.clickTaskWithoutDuedate();
});

//THEN
Then(/^.*click to the Abgabe tab$/, async function () {
    await TASKPage.clickStudentSubmissionTab();
});

When(/^.*sets submission text '(.*)'$/, async function (submissionText) {
    await TASKPage.setTextSubmision(submissionText);
});

When(/^.*click on submit button$/, async function (){
    await TASKPage.clickSaveAndSendSubmissionBtn();
});

When(/^.*click again to current task in side navigation menu$/, async function (){
    await TASKPage.gotoNuxtTasksTab();
});

When(/^.*click to the completed task tab$/, async function (){
    await TASKPage.clickCompletedTab();
});

When(/^.*click at ungraded task$/, async function (){
    await TASKListPage.clickUngradedTask();
});