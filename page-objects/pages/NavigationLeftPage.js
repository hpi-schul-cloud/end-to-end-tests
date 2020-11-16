'use strict';

const { expect } = require('chai');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../runtime/helpers/waitHelpers');

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
	CONTACT: 'contact',
};
const navItemStringStart1stLevel = '/html/body/aside/nav/ul/li/a';
const navItemStringStart2ndLevel = '/html/body/aside/nav/ul/li/ul/li/a';
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

const item = '.sidebar-list .link-name';
const subitem = '.subitem .link-name';

module.exports = {
	navItemsEnum,
	clickNavItemLogo: async function () {
		await elementHelpers.clickAndWait(navItemLogo);
	},
	clickNavItemDashboard: async function () {
		await elementHelpers.clickAndWait(navItemDashboard);
	},
	clickNavItemCourses: async function () {
		await elementHelpers.clickAndWait(navItemCourses);
	},
	clickNavItemTasks: async function () {
		await elementHelpers.clickAndWait(navItemTasks);
		await waitHelpers.waitUntilAjaxIsFinished();
	},
	clickNavItemTasksAsked: async function () {
		await elementHelpers.clickAndWait(navItemTasksAsked);
		await waitHelpers.waitUntilAjaxIsFinished();
	},
	clickNavItemTasksPrivate: async function () {
		await elementHelpers.clickAndWait(navItemTasksPrivate);
		await waitHelpers.waitUntilAjaxIsFinished();
	},
	clickNavItemTasksArchive: async function () {
		await elementHelpers.clickAndWait(navItemTasksArchive);
		await waitHelpers.waitUntilAjaxIsFinished();
	},
	clickNavItemTeams: async function () {
		await elementHelpers.clickAndWait(navItemTeams);
	},
	clickNavItemFiles: async function () {
		await elementHelpers.clickAndWait(navItemFiles);
	},
	clickNavItemFilesMy: async function () {
		await elementHelpers.clickAndWait(navItemFilesMy);
	},
	clickNavItemFilesCourses: async function () {
		await elementHelpers.clickAndWait(navItemFilesCourses);
	},
	clickNavItemFilesTeams: async function () {
		await elementHelpers.clickAndWait(navItemFilesTeams);
	},
	clickNavItemFilesShared: async function () {
		await elementHelpers.clickAndWait(navItemFilesShared);
	},
	clickNavItemNews: async function () {
		await elementHelpers.clickAndWait(navItemNews);
	},
	clickNavItemCalendar: async function () {
		await elementHelpers.clickAndWait(navItemCalendar);
	},
	clickNavItemContent: async function () {
		await elementHelpers.clickAndWait(navItemLearnstore);
	},
	clickNavItemAddons: async function () {
		await elementHelpers.clickAndWait(navItemAddons);
	},
	clickNavItemAdministration: async function () {
		await elementHelpers.clickAndWait(navItemAdministration);
	},
	clickNavItemAdminStudents: async function () {
		await elementHelpers.clickAndWait(navItemAdministrationStudents);
	},
	clickNavItemAdminTeachers: async function () {
		await elementHelpers.clickAndWait(navItemAdministrationTeachers);
	},
	clickNavItemAdminCourses: async function () {
		await elementHelpers.clickAndWait(navItemAdministrationCourses);
	},
	clickNavItemAdminClasses: async function () {
		await elementHelpers.clickAndWait(navItemAdministrationClasses);
	},
	clickNavItemAdminTeams: async function () {
		await elementHelpers.clickAndWait(navItemAdministrationTeams);
	},
	clickNavItemAdminSchool: async function () {
		await elementHelpers.clickAndWait(navItemAdministrationSchool);
	},
	clickNavItemHelpDesk: async function () {
		await elementHelpers.clickAndWait(navItemHelpDesk);
	},
	clickNavItemHelpArea: async function () {
		await elementHelpers.clickAndWait(navItemHelparea);
	},
	clickNavItemHelpArticles: async function () {
		await elementHelpers.clickAndWait(navItemHelparticles);
	},
	clickNavItemHelpTrainings: async function () {
		await elementHelpers.clickAndWait(navItemHelpTrainings);
	},
	clickNavItemHelpContact: async function () {
		await elementHelpers.clickAndWait(navItemHelpContact);
	},

	getListOfAllItems: async function () {
		await waitHelpers.waitUntilElementIsPresent(item);
		const listOfItemElements = await driver.$$(item);
		const listOfItemsTitles = elementHelpers.getTextListFromListOfElements(listOfItemElements);
		return listOfItemsTitles;
	},

	getListOfSubItems: async function () {
		await waitHelpers.waitUntilElementIsPresent(subitem);
		const listOfSubItemsElements = await driver.$$(subitem);
		const listOfSubItemsTitles = elementHelpers.getTextListFromListOfElements(listOfSubItemsElements);
		return listOfSubItemsTitles;
    },

	areSubMenuItemsVisible: async function (listOfExpectedSubItems) {
        listOfExpectedSubItems = listOfExpectedSubItems.split(",").map(item => {return item.trim();});
		const listOfSubItems = await this.getListOfSubItems();
		const isSame =
			listOfExpectedSubItems.length == listOfSubItems.length &&
			listOfSubItems.every(function (element, index) {
				return element  === listOfSubItems[index];
            });
		const msg = 'List of expected sub items does not match with the current one';
		const resultMsg = '\nExpected: ' + listOfExpectedSubItems + '\n  Actual: ' + listOfSubItems;
        expect(isSame, msg + resultMsg).to.equal(true);
	},

	areMenuItemsVisible: async function (listOfExpectedItems) {
        listOfExpectedItems = listOfExpectedItems.split(",").map(item => {return item.trim();});
		const listOfItems = await this.getListOfAllItems();
		const isSame =
			listOfExpectedItems.length == listOfItems.length &&
			listOfExpectedItems.every(function (element, index) {
				return element === listOfItems[index];
			});
		const msg = 'List of expected sub items does not match with the current one';
		const resultMsg = '\nExpected: ' + listOfExpectedItems + '\n  Actual: ' + listOfItems;
        expect(isSame, msg + resultMsg).to.equal(true);
	},
};
