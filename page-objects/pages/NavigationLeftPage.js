'use strict';

const elementHelpers = require("../../runtime/helpers/elementHelpers");

const navItemsEnum = {
    LOGO: 'logo',
    DASHBOARD: 'dashboard',
    COURSES: 'courses',
    TEAMS: 'teams',
    HOMEWORK: 'homework',
    ASKEDHOMEWORK: 'asked homework',
    PRIVATEHOMEWORK: 'private homework',
    ARCHIVEDHOMEWORK: 'archived homework',
    FILES: 'files',
    MYFILES: 'my files',
    COURSEFILES: 'course files',
    TEAMFILES: 'team files',
    SHAREDFILES: 'shared files',
    NEWS: 'news',
    CALENDAR: 'calendar',
    ADDONS: 'addons',
    CONTENT: 'content',
    HELPDESK: 'helpdesk',
    ADMINISTRATION: 'administration',
    ADMINSTUDENTS: 'admStudents',
    ADMINTEACHERS: 'admTeachers',
    ADMINCLASSES: 'admClasses',
    ADMINCOURSES: 'admCourses',
    ADMINTEAMS: 'admTeams',
    ADMINCSCHOOL: 'admSchool',
    HELPAREA: 'helparea',
    HELPARTICLE: 'helparticle',
    TRAININGS: 'trainings',
    CONTACT: 'contact'
};
const navItemStringStart1stLevel = "/html/body/aside/nav/ul/li/a";
const navItemStringStart2ndLevel = "/html/body/aside/nav/ul/li/ul/li/a";
const stringContains = "[contains(@title,'XXX')]";
const navItemStringDefault1stLevel = navItemStringStart1stLevel + stringContains;
const navItemStringDefault2ndLevel = navItemStringStart2ndLevel + stringContains;
const navItemLogo = navItemStringStart1stLevel + "[contains(@class,'sc-branding')]";
const navItemDashboard = navItemStringDefault1stLevel.replace('XXX', 'Übersicht');
const navItemCourses = navItemStringDefault1stLevel.replace('XXX', 'Kurse');
const navItemTasks = navItemStringDefault1stLevel.replace('XXX', 'Aufgaben');
const navItemTasksAsked = navItemStringDefault2ndLevel.replace('XXX', 'Gestellte Aufgaben');
const navItemTasksPrivate = navItemStringDefault2ndLevel.replace('XXX', 'Entwürfe');
const navItemTasksArchive = navItemStringDefault2ndLevel.replace('XXX', 'Archiv');
const navItemTeams = navItemStringDefault1stLevel.replace('XXX', 'Teams');
const navItemFiles = navItemStringDefault1stLevel.replace('XXX', 'Meine Dateien');
const navItemFilesMy = navItemStringDefault2ndLevel.replace('XXX', 'persönliche Dateien');
const navItemFilesCourses = navItemStringDefault2ndLevel.replace('XXX', 'Kurs');
const navItemFilesTeams = navItemStringDefault2ndLevel.replace('XXX', 'Teams');
const navItemFilesShared = navItemStringDefault2ndLevel.replace('XXX', 'geteilte Dateien');
const navItemNews = navItemStringDefault1stLevel.replace('XXX', 'Neuigkeiten');
const navItemCalendar = navItemStringDefault1stLevel.replace('XXX', 'Termine');
const navItemLearnstore = navItemStringDefault1stLevel.replace('XXX', 'Lern-Store');
const navItemAddons = navItemStringDefault1stLevel.replace('XXX', 'Add-ons');
const navItemHelpDesk = navItemStringDefault1stLevel.replace('XXX', 'Helpdesk');
const navItemAdministration = navItemStringDefault1stLevel.replace('XXX', 'Verwaltung');
const navItemAdministrationStudents = navItemStringDefault2ndLevel.replace('XXX', 'Schüler');
const navItemAdministrationTeachers = navItemStringDefault2ndLevel.replace('XXX', 'Lehrer');
const navItemAdministrationCourses = navItemStringDefault2ndLevel.replace('XXX', 'Kurse');
const navItemAdministrationClasses = navItemStringDefault2ndLevel.replace('XXX', 'Klassen');
const navItemAdministrationTeams = navItemStringDefault2ndLevel.replace('XXX', 'Teams');
const navItemAdministrationSchool = navItemStringDefault2ndLevel.replace('XXX', 'Schule');
const navItemHelparea = navItemStringDefault1stLevel.replace('XXX', 'Hilfebereich');
const navItemHelparticles = navItemStringDefault2ndLevel.replace('XXX', 'Hilfeartikel');
const navItemHelpTrainings = navItemStringDefault2ndLevel.replace('XXX', 'Fortbildungen');
const navItemHelpContact = navItemStringDefault2ndLevel.replace('XXX', 'Kontakt');

module.exports = {
    navItemsEnum,
    clickNavItemLogo: async function () {
        await elementHelpers.click(navItemLogo);
    },
    clickNavItemDashboard: async function () {
        await elementHelpers.click(navItemDashboard);
    },
    clickNavItemCourses: async function () {
        await elementHelpers.click(navItemCourses);
    },
    clickNavItemTasks: async function () {
        await elementHelpers.click(navItemTasks);
    },
    clickNavItemTasksAsked: async function () {
        await elementHelpers.click(navItemTasksAsked);
    },
    clickNavItemTasksPrivate: async function () {
        await elementHelpers.click(navItemTasksPrivate);
    },
    clickNavItemTasksArchive: async function () {
        await elementHelpers.click(navItemTasksArchive);
    },
    clickNavItemTeams: async function () {
        await elementHelpers.click(navItemTeams);
    },
    clickNavItemFiles: async function () {
        await elementHelpers.click(navItemFiles);
    },
    clickNavItemFilesMy: async function () {
        await elementHelpers.click(navItemFilesMy);
    },
    clickNavItemFilesCourses: async function () {
        await elementHelpers.click(navItemFilesCourses);
    },
    clickNavItemFilesTeams: async function () {
        await elementHelpers.click(navItemFilesTeams);
    },
    clickNavItemFilesShared: async function () {
        await elementHelpers.click(navItemFilesShared);
    },
    clickNavItemNews: async function () {
        await elementHelpers.click(navItemNews);
    },
    clickNavItemCalendar: async function () {
        await elementHelpers.click(navItemCalendar);
    },
    clickNavItemContent: async function () {
        await elementHelpers.click(navItemLearnstore);
    },
    clickNavItemAddons: async function () {
        await elementHelpers.click(navItemAddons);
    },
    clickNavItemAdministration: async function () {
        await elementHelpers.click(navItemAdministration);
    },
    clickNavItemAdminStudents: async function () {
        await elementHelpers.click(navItemAdministrationStudents);
    },
    clickNavItemAdminTeachers: async function () {
        await elementHelpers.click(navItemAdministrationTeachers);
    },
    clickNavItemAdminCourses: async function () {
        await elementHelpers.click(navItemAdministrationCourses);
    },
    clickNavItemAdminClasses: async function () {
        await elementHelpers.click(navItemAdministrationClasses);
    },
    clickNavItemAdminTeams: async function () {
        await elementHelpers.click(navItemAdministrationTeams);
    },
    clickNavItemAdminSchool: async function () {
        await elementHelpers.click(navItemAdministrationSchool);
    },
    clickNavItemHelpDesk: async function () {
        await elementHelpers.click(navItemHelpDesk);
    },
    clickNavItemHelpArea: async function () {
        await elementHelpers.click(navItemHelparea);
    },
    clickNavItemHelpArticles: async function () {
        await elementHelpers.click(navItemHelparticles);
    },
    clickNavItemHelpTrainings: async function () {
        await elementHelpers.click(navItemHelpTrainings);
    },
    clickNavItemHelpContact: async function () {
        await elementHelpers.click(navItemHelpContact);
    },
}
