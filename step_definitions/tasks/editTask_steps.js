'use strict';

const TASKListPage = require("../../page-objects/pages/TASKListPage");

Then(/^.* hover over task '([^']*)'$/, async function(taskName){
    await TASKListPage.hoverOverTaskAndClickMenu(taskName);
})

Then(/^.* edit the task '([^']*)'$/, async function(taskName){
    await TASKListPage.clickTaskEditAction();
})

Then(/^.* mark task '([^']*)' completed$/, async function(taskName){
    await TASKListPage.clickTaskCompletedAction();
})