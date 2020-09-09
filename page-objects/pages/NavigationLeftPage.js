'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');
let navItemStringStart1stLevel = "/html/body/aside/nav/ul/li/a";
let navItemStringStart2ndLevel = "/html/body/aside/nav/ul/li/ul/li/a";
let stringContains = "[contains(@title,'XXX')]";
let navItemStringDefault1stLevel = navItemStringStart1stLevel + stringContains;
let navItemStringDefault2ndLevel = navItemStringStart2ndLevel + stringContains;

module.exports = {
    navItemsEnum: {
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
    },
    selectors: {
        navItemLogo: navItemStringStart1stLevel + "[contains(@class,'sc-branding')]",
        navItemDashboard: navItemStringDefault1stLevel.replace('XXX', 'Übersicht'),
        navItemCourses: navItemStringDefault1stLevel.replace('XXX', 'Kurse'),
        navItemTasks: navItemStringDefault1stLevel.replace('XXX', 'Aufgaben'),
        navItemTasksAsked: navItemStringDefault2ndLevel.replace('XXX', 'Gestellte Aufgaben'),
        navItemTasksPrivate: navItemStringDefault2ndLevel.replace('XXX', 'Entwürfe'),
        navItemTasksArchive: navItemStringDefault2ndLevel.replace('XXX', 'Archiv'),
        navItemTeams: navItemStringDefault1stLevel.replace('XXX', 'Teams'),
        navItemFiles: navItemStringDefault1stLevel.replace('XXX', 'Meine Dateien'),
        navItemFilesMy: navItemStringDefault2ndLevel.replace('XXX', 'persönliche Dateien'),
        navItemFilesCourses: navItemStringDefault2ndLevel.replace('XXX', 'Kurs'),
        navItemFilesTeams: navItemStringDefault2ndLevel.replace('XXX', 'Teams'),
        navItemFilesShared: navItemStringDefault2ndLevel.replace('XXX', 'geteilte Dateien'),
        navItemNews: navItemStringDefault1stLevel.replace('XXX', 'Neuigkeiten'),
        navItemCalendar: navItemStringDefault1stLevel.replace('XXX', 'Termine'),
        navItemLearnstore: navItemStringDefault1stLevel.replace('XXX', 'Lern-Store'),
        navItemAddons: navItemStringDefault1stLevel.replace('XXX', 'Add-ons'),
        navItemHelpDesk: navItemStringDefault1stLevel.replace('XXX', 'Helpdesk'),
        navItemAdministration: navItemStringDefault1stLevel.replace('XXX', 'Verwaltung'),
        navItemAdministrationStudents: '[data-testid="Schüler"]',
        navItemAdministrationTeachers: '[data-testid="Lehrer"]',
        navItemAdministrationCourses: '[data-testid="Kurse"]',
        navItemAdministrationClasses: '[data-testid="Klassen"]',
        navItemAdministrationTeams: '[data-testid="Teams"]',
        navItemAdministrationSchool: '[data-testid="Schule"]',
        navItemHelparea: navItemStringDefault1stLevel.replace('XXX', 'Hilfebereich'),
        navItemHelparticles: navItemStringDefault2ndLevel.replace('XXX', 'Hilfeartikel'),
        navItemHelpTrainings: navItemStringDefault2ndLevel.replace('XXX', 'Fortbildungen'),
        navItemHelpContact: navItemStringDefault2ndLevel.replace('XXX', 'Kontakt'),
    },
    clickNavItemLogo: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemLogo);
    },
    clickNavItemDashboard: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemDashboard);
    },
    clickNavItemCourses: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemCourses);
    },
    clickNavItemTasks: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemTasks);
    },
    clickNavItemTasksAsked: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemTasksAsked);
    },
    clickNavItemTasksPrivate: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemTasksPrivate);
    },
    clickNavItemTasksArchive: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemTasksArchive);
    },
    clickNavItemTeams: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemTeams);
    },
    clickNavItemFiles: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemFiles);
    },
    clickNavItemFilesMy: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemFilesMy);
    },
    clickNavItemFilesCourses: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemFilesCourses);
    },
    clickNavItemFilesTeams: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemFilesTeams);
    },
    clickNavItemFilesShared: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemFilesShared);
    },
    clickNavItemNews: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemNews);
    },
    clickNavItemCalendar: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemCalendar);
    },
    clickNavItemContent: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemLearnstore);
    },
    clickNavItemAddons: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemAddons);
    },
    clickNavItemAdministration: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemAdministration);
    },
    clickNavItemAdminStudents: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemAdministrationStudents);
    },
    clickNavItemAdminTeachers: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemAdministrationTeachers);
    },
    clickNavItemAdminCourses: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemAdministrationCourses);
    },
    clickNavItemAdminClasses: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemAdministrationClasses);
    },
    clickNavItemAdminTeams: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemAdministrationTeams);
    },
    clickNavItemAdminSchool: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemAdministrationSchool);
    },
    clickNavItemHelpDesk: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemHelpDesk);
    },
    clickNavItemHelpArea: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemHelparea);
    },
    clickNavItemHelpArticles: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemHelparticles);
    },
    clickNavItemHelpTrainings: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemHelpTrainings);
    },
    clickNavItemHelpContact: async function () {
        await waitHelpers.waitAndClick(this.selectors.navItemHelpContact);
    },
}