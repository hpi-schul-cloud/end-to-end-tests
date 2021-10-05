'use strict'

const { When } = require("@cucumber/cucumber");
const TASKPage = require("../../page-objects/pages/TASKPage");
const TASKListPage = require("../../page-objects/pages/TASKListPage");

When(/^.* clicks on student submitted the task$/, async function (){
    await TASKListPage.studentSubmittedTask();
});

When(/^.* checks the graded column$/, async function(){
    await TASKPage.isTaskGraded();
})
