"use strict";

const leftNavigation = require('../page-objects/pages/NavigationLeftPage.js');

Then('click left navigation item {string}', function (string) {
    let navigationItem = string;
    switch (navigationItem) {
        case "logo":
            return leftNavigation.clickNavItemLogo();
        case "dashboard":
            return leftNavigation.clickNavItemDashboard();
        case "courses":
            return leftNavigation.clickNavItemCourses();
        case "teams":
            return leftNavigation.clickNavItemTeams();
        case "homework":
            return leftNavigation.clickNavItemTasks();
        case "asked homework":
            return leftNavigation.clickNavItemTasksAsked();
        case "private homework":
            return leftNavigation.clickNavItemTasksPrivate();
        case "archived homework":
            return leftNavigation.clickNavItemTasksArchive();
        case "files":
            return leftNavigation.clickNavItemFiles();
        case "my files":
            return leftNavigation.clickNavItemFilesMy();
        case "course files":
            return leftNavigation.clickNavItemFilesCourses();
        case "team files":
            return leftNavigation.clickNavItemFilesTeams();
        case "shared files":
            return leftNavigation.clickNavItemFilesShared();
        case "news":
            return leftNavigation.clickNavItemNews();
        case "calendar":
            return leftNavigation.clickNavItemCalendar();
        case "content":
            return leftNavigation.clickNavItemContent();
        case "addons":
            return leftNavigation.clickNavItemAddons();
        case "helpdesk":
            return leftNavigation.clickNavItemHelpDesk();
        case "administration":
            return leftNavigation.clickNavItemAdministration();
        case "admStudents":
            return leftNavigation.clickNavItemAdminStudents();
        case "admTeachers":
            return leftNavigation.clickNavItemAdminTeachers();
        case "admClasses":
            return leftNavigation.clickNavItemAdminClasses();
        case "admCourses":
            return leftNavigation.clickNavItemAdminCourses();
        case "admTeams":
            return leftNavigation.clickNavItemAdminTeams();
        case "admSchool":
            return leftNavigation.clickNavItemAdminSchool();
        case "helparea":
            return leftNavigation.clickNavItemHelpArea();
        case "help articles":
            return leftNavigation.clickNavItemHelpArticles();
        case "trainigs":
            return leftNavigation.clickNavItemHelpTrainings();
        case "contact":
            return leftNavigation.clickNavItemHelpContact();
        default:
            return;
    }
});