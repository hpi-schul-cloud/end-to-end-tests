'use strict';

const TASKListPage = require("../../page-objects/pages/TASKListPage");

Then(/^.* hover over task '([^']*)'$/, async function(taskName){
    await TASKListPage.hoverOverAtTask(taskName);
})

Then(/^.* edit the task '([^']*)'$/, async function(taskName){
    await TASKListPage.taskHoverOverFunctions();
})