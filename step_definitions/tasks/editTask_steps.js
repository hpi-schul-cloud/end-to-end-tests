'use strict';

const TASKListPage = require("../../page-objects/pages/TASKListPage");

Then(/^.* hover over task '([^']*)'$/, async function(taskName){
    await TASKListPage.hoverOverTaskAndClickMenu(taskName);
})

