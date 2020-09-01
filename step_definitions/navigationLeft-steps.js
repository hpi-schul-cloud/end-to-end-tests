"use strict";

const leftNavigation = require('../page-objects/pages/NavigationLeftPage.js');
const leftMenuItems = leftNavigation.navItemsEnum;

Then('click left navigation item {string}', function (string) {

    let navigationItem = string;
    switch (navigationItem) {

        case leftMenuItems.LOGO:
            return leftNavigation.clickNavItemLogo();
        case leftMenuItems.DASHBOARD:
            return leftNavigation.clickNavItemDashboard();
        case leftMenuItems.COURSES:
            return leftNavigation.clickNavItemCourses();
        case leftMenuItems.TEAMS:
            return leftNavigation.clickNavItemTeams();
        case leftMenuItems.HOMEWORK:
            return leftNavigation.clickNavItemTasks();
        case leftMenuItems.ASKEDHOMEWORK:
            return leftNavigation.clickNavItemTasksAsked();
        case leftMenuItems.PRIVATEHOMEWORK:
            return leftNavigation.clickNavItemTasksPrivate();
        case leftMenuItems.ARCHIVEDHOMEWORK:
            return leftNavigation.clickNavItemTasksArchive();
        case leftMenuItems.FILES:
            return leftNavigation.clickNavItemFiles();
        case leftMenuItems.MYFILES:
            return leftNavigation.clickNavItemFilesMy();
        case leftMenuItems.COURSEFILES:
            return leftNavigation.clickNavItemFilesCourses();
        case leftMenuItems.TEAMFILES:
            return leftNavigation.clickNavItemFilesTeams();
        case leftMenuItems.SHAREDFILES:
            return leftNavigation.clickNavItemFilesShared();
        case leftMenuItems.NEWS:
            return leftNavigation.clickNavItemNews();
        case leftMenuItems.CALENDAR:
            return leftNavigation.clickNavItemCalendar();
        case leftMenuItems.CONTENT:
            return leftNavigation.clickNavItemContent();
        case leftMenuItems.ADDONS:
            return leftNavigation.clickNavItemAddons();
        case leftMenuItems.HELPDESK:
            return leftNavigation.clickNavItemHelpDesk();
        case leftMenuItems.ADMINISTRATION:
            return leftNavigation.clickNavItemAdministration();
        case leftMenuItems.ADMINSTUDENTS:
            return leftNavigation.clickNavItemAdminStudents();
        case leftMenuItems.ADMINTEACHERS:
            return leftNavigation.clickNavItemAdminTeachers();
        case leftMenuItems.ADMINCLASSES:
            return leftNavigation.clickNavItemAdminClasses();
        case leftMenuItems.ADMINCOURSES:
            return leftNavigation.clickNavItemAdminCourses();
        case leftMenuItems.ADMINTEAMS:
            return leftNavigation.clickNavItemAdminTeams();
        case leftMenuItems.ADMINCSCHOOL:
            return leftNavigation.clickNavItemAdminSchool();
        case leftMenuItems.HELPAREA:
            return leftNavigation.clickNavItemHelpArea();
        case leftMenuItems.HELPARTICLE:
            return leftNavigation.clickNavItemHelpArticles();
        case leftMenuItems.TRAININGS:
            return leftNavigation.clickNavItemHelpTrainings();
        case leftMenuItems.CONTACT:
            return leftNavigation.clickNavItemHelpContact();
        default:
            return Error("no such element found in 'click left navigation item {string}' " + navigationItem);

    }

});
