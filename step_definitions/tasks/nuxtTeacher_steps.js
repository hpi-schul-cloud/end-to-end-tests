'use strict'

const { When } = require("@cucumber/cucumber");
const TASKPage = require("../../page-objects/pages/TASKPage");
const TASKListPage = require("../../page-objects/pages/TASKListPage");

When(/^.* clicks on student submitted the task$/, async function (){
    await TASKListPage.studentSubmittedTask();
});

When(/^.* student graded for Task19$/, async function(){
    await TASKPage.isGradedTask();
})
