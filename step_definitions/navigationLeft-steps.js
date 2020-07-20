"use strict";

const leftNavigation = require('../page-objects/pages/NavigationLeftPage.js');

Then(/^click all left menu items$/, async function() {
    await leftNavigation.clickNavItemLogo();
    await leftNavigation.clickNavItemDashboard();
    await leftNavigation.clickNavItemCourses();
    await leftNavigation.clickNavItemTeams();
    await leftNavigation.clickNavItemTasks();
    await leftNavigation.clickNavItemFiles();
    await leftNavigation.clickNavItemNews();
    await leftNavigation.clickNavItemCalendar();
    //await leftNavigation.clickNavItemContent(); /*client-/server-configuration is not correct for now*/
    //await leftNavigation.clickNavItemAddons();  /*client-/server-configuration is not correct for now*/
    await leftNavigation.clickNavItemAdministration();
    await leftNavigation.clickNavItemHelparea();
    });

Then(/^click navigation item tasks$/, function() {
    return leftNavigation.clickNavItemTasks();
    });