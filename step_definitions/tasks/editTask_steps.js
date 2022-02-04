'use strict';

const TASKListPage = require("../../page-objects/pages/TASKListPage");

Then(/^.* hover over task '([^']*)'$/, async function(taskName){
    await TASKListPage.hoverOverTaskAndClickMenu(taskName);
})

Then(/^.* '([^']*)' task '([^']*)'$/, async function(button, taskName){
    await TASKListPage.clickTaskOnActionMenu(button);
})
