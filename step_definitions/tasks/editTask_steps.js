'use strict';

const TASKListPage = require("../../page-objects/pages/TASKListPage");

Then(/^.* hover over at task '([^']*)'$/, async function(taskName){
    await TASKListPage.hoverOverTask(taskName);
})

Then(/^.* edit the task '([^']*)'$/, async function(taskName){
    await TASKListPage.taskHoverOverFunctions();
})