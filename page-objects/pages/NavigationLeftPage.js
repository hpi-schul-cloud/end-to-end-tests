'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');
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
        await waitHelpers.waitAndClick(navItemLogo);
    },
    clickNavItemDashboard: async function () {
        await waitHelpers.waitAndClick(navItemDashboard);
    },
    clickNavItemCourses: async function () {
        await waitHelpers.waitAndClick(navItemCourses);
    },
    clickNavItemTasks: async function () {
        await waitHelpers.waitAndClick(navItemTasks);
    },
    clickNavItemTasksAsked: async function () {
        await waitHelpers.waitAndClick(navItemTasksAsked);
    },
    clickNavItemTasksPrivate: async function () {
        await waitHelpers.waitAndClick(navItemTasksPrivate);
    },
    clickNavItemTasksArchive: async function () {
        await waitHelpers.waitAndClick(navItemTasksArchive);
    },
    clickNavItemTeams: async function () {
        await waitHelpers.waitAndClick(navItemTeams);
    },
    clickNavItemFiles: async function () {
        await waitHelpers.waitAndClick(navItemFiles);
    },
    clickNavItemFilesMy: async function () {
        await waitHelpers.waitAndClick(navItemFilesMy);
    },
    clickNavItemFilesCourses: async function () {
        await waitHelpers.waitAndClick(navItemFilesCourses);
    },
    clickNavItemFilesTeams: async function () {
        await waitHelpers.waitAndClick(navItemFilesTeams);
    },
    clickNavItemFilesShared: async function () {
        await waitHelpers.waitAndClick(navItemFilesShared);
    },
    clickNavItemNews: async function () {
        await waitHelpers.waitAndClick(navItemNews);
    },
    clickNavItemCalendar: async function () {
        await waitHelpers.waitAndClick(navItemCalendar);
    },
    clickNavItemContent: async function () {
        await waitHelpers.waitAndClick(navItemLearnstore);
    },
    clickNavItemAddons: async function () {
        await waitHelpers.waitAndClick(navItemAddons);
    },
    clickNavItemAdministration: async function () {
        await waitHelpers.waitAndClick(navItemAdministration);
    },
    clickNavItemAdminStudents: async function () {
        await waitHelpers.waitAndClick(navItemAdministrationStudents);
    },
    clickNavItemAdminTeachers: async function () {
        await waitHelpers.waitAndClick(navItemAdministrationTeachers);
    },
    clickNavItemAdminCourses: async function () {
        await waitHelpers.waitAndClick(navItemAdministrationCourses);
    },
    clickNavItemAdminClasses: async function () {
        await waitHelpers.waitAndClick(navItemAdministrationClasses);
    },
    clickNavItemAdminTeams: async function () {
        await waitHelpers.waitAndClick(navItemAdministrationTeams);
    },
    clickNavItemAdminSchool: async function () {
        await waitHelpers.waitAndClick(navItemAdministrationSchool);
    },
    clickNavItemHelpDesk: async function () {
        await waitHelpers.waitAndClick(navItemHelpDesk);
    },
    clickNavItemHelpArea: async function () {
        await waitHelpers.waitAndClick(navItemHelparea);
    },
    clickNavItemHelpArticles: async function () {
        await waitHelpers.waitAndClick(navItemHelparticles);
    },
    clickNavItemHelpTrainings: async function () {
        await waitHelpers.waitAndClick(navItemHelpTrainings);
    },
    clickNavItemHelpContact: async function () {
        await waitHelpers.waitAndClick(navItemHelpContact);
    },
    /*checkIfTabsAreVisible: async function (itemsToCompare, items) {
        let expectations = itemsToCompare.hashes();
        for (let i = 0; i < items.length; i++) {
            let actualLabelText = await items[i].getText();
            await items[i].waitForEnabled(DELAY_100_MILLISECOND);
            expect(actualLabelText).to.equal(expectations[i].tabs);
        }
    },*/
}