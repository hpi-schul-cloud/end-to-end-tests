'use strict';

const { expect } = require('chai');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../runtime/helpers/waitHelpers');

async function loadPageFromNavigationItem(selector) {
	const link = await elementHelpers.getLink(selector);
	await elementHelpers.loadPage(link);
}

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
	ADMINSCHOOL: 'admSchool',
	HELPAREA: 'helparea',
	HELPARTICLE: 'helparticle',
	TRAININGS: 'trainings',
	CONTACT: 'contact',
};

const navItemString1stLevel = "[data-testid='XXX']";
const navItemString2ndLevel = "li[data-testid='XXX']";
const navItemLogo = navItemString1stLevel.replace('XXX', 'Startseite');
const navItemDashboard = navItemString1stLevel.replace('XXX', 'Übersicht');
const navItemCourses = navItemString1stLevel.replace('XXX', 'Kurse');
const navItemTasks = navItemString1stLevel.replace('XXX', 'Aufgaben');
const navItemTasksAsked = navItemString2ndLevel.replace('XXX', 'Gestellte Aufgaben');
const navItemTasksPrivate = navItemString2ndLevel.replace('XXX', 'Entwürfe');
const navItemTasksArchive = navItemString2ndLevel.replace('XXX', 'Archiv');
const navItemTeamsOld = navItemString1stLevel.replace('XXX', 'Teams');
const navItemTeamsNuxt = '#__layout aside div:nth-child(3)';
const navItemFiles = navItemString1stLevel.replace('XXX', 'Meine Dateien');
const navItemFilesMy = navItemString2ndLevel.replace('XXX', 'persönliche Dateien');
const navItemFilesCourses = navItemString2ndLevel.replace('XXX', 'Kurse');
const navItemFilesTeams = navItemString2ndLevel.replace('XXX', 'Teams');
const navItemFilesShared = navItemString2ndLevel.replace('XXX', 'geteilte Dateien');
const navItemNews = navItemString1stLevel.replace('XXX', 'Neuigkeiten');
const navItemCalendar = navItemString1stLevel.replace('XXX', 'Termine');
const navItemLearnstore = navItemString1stLevel.replace('XXX', 'Lern-Store');
const navItemAddons = navItemString1stLevel.replace('XXX', 'Add-ons');
const navItemHelpDesk = navItemString1stLevel.replace('XXX', 'Helpdesk');
const navItemManagement = navItemString1stLevel.replace('XXX', 'Verwaltung');
const navItemManagementStudentsAdmin = navItemString2ndLevel.replace('XXX', 'Schüler');
const navItemManagementStudentsTeacher = navItemString2ndLevel.replace('XXX', 'Schüler:innen');
const navItemManagementTeachersNuxt = navItemString2ndLevel.replace('XXX', 'Lehrer:innen');
const navItemManagementTeachersOld = '[data-testid="global.sidebar.teacher"]';
const navItemManagementCourses = navItemString2ndLevel.replace('XXX', 'Kurse');
const navItemManagementClassesNuxt = '[data-testid="global.sidebar.classes"]';
const navItemManagementClassesOld = navItemString2ndLevel.replace('XXX', 'Klassen');
const navItemManagementTeams = navItemString2ndLevel.replace('XXX', 'Teams');
const navItemManagementSchool = navItemString2ndLevel.replace('XXX', 'Schule');
const navItemHelparea = navItemString1stLevel.replace('XXX', 'Hilfebereich');
const navItemHelparticles = navItemString2ndLevel.replace('XXX', 'Hilfeartikel');
const navItemHelpTrainings = navItemString2ndLevel.replace('XXX', 'Fortbildungen');
const navItemHelpContact = navItemString2ndLevel.replace('XXX', 'Kontakt');

const item = '.sidebar-list .link-name';
const subitem = '.subitem .link-name';

async function clickNavItemLogo() {
	await loadPageFromNavigationItem(navItemLogo);
}

async function clickNavItemDashboard() {
	await loadPageFromNavigationItem(navItemDashboard);
}

async function clickNavItemCourses() {
	await loadPageFromNavigationItem(navItemCourses);
}

async function clickNavItemTasks() {
	await loadPageFromNavigationItem(navItemTasks);
}

async function clickNavItemTasksAsked() {
	await loadPageFromNavigationItem(navItemTasksAsked);
}
async function clickNavItemTasksPrivate() {
	await loadPageFromNavigationItem(navItemTasksPrivate);
}
async function clickNavItemTasksArchive() {
	await loadPageFromNavigationItem(navItemTasksArchive);
}

async function clickNavItemTeams() {
	await loadPageFromNavigationItem(navItemTeams);
}

async function clickNavItemFiles() {
	await loadPageFromNavigationItem(navItemFiles);
}

async function clickNavItemFilesMy() {
	await loadPageFromNavigationItem(navItemFilesMy);
}

async function clickNavItemFilesCourses() {
	await loadPageFromNavigationItem(navItemFilesCourses);
}

async function clickNavItemFilesTeams() {
	await loadPageFromNavigationItem(navItemFilesTeams);
}

async function clickNavItemFilesShared() {
	await loadPageFromNavigationItem(navItemFilesShared);
}

async function clickNavItemNews() {
	await loadPageFromNavigationItem(navItemNews);
}

async function clickNavItemCalendar() {
	await loadPageFromNavigationItem(navItemCalendar);
}

async function clickNavItemContent() {
	await loadPageFromNavigationItem(navItemLearnstore);
}

async function clickNavItemAddons() {
	await loadPageFromNavigationItem(navItemAddons);
}

async function clickNavItemManagement() {
	await loadPageFromNavigationItem(navItemManagement);
}

async function clickNavItemManageStudents() {
	await loadPageFromNavigationItem(navItemManagementStudents);
}

async function clickNavItemManageTeachers() {
	await loadPageFromNavigationItem(navItemManagementTeachers);
}

async function clickNavItemManageCourses() {
	await loadPageFromNavigationItem(navItemManagementCourses);
}

async function clickNavItemManageClasses() {
	await loadPageFromNavigationItem(navItemManagementClasses);
}

async function clickNavItemManageTeams() {
	await loadPageFromNavigationItem(navItemManagementTeams);
}

async function clickNavItemManageSchool() {
	await loadPageFromNavigationItem(navItemManagementSchool);
}

async function clickNavItemHelpDesk() {
	await loadPageFromNavigationItem(navItemHelpDesk);
}

async function clickNavItemHelpArea() {
	await loadPageFromNavigationItem(navItemHelparea);
}

async function clickNavItemHelpArticles() {
	await loadPageFromNavigationItem(navItemHelparticles);
}

async function clickNavItemHelpTrainings() {
	await loadPageFromNavigationItem(navItemHelpTrainings);
}

async function clickNavItemHelpContact() {
	await loadPageFromNavigationItem(navItemHelpContact);
}

async function getListOfAllItems() {
	return elementHelpers.getTextFromAllElements(item);
}

async function getListOfSubItems() {
	return elementHelpers.getTextFromAllElements(subitem);
}

async function areSubMenuItemsVisible(listOfExpectedSubItems) {
	listOfExpectedSubItems = listOfExpectedSubItems.split(',').map((item) => {
		return item.trim();
	});
	const listOfSubItems = await getListOfSubItems();
	const isSame =
		listOfExpectedSubItems.length == listOfSubItems.length &&
		listOfSubItems.every(function (element, index) {
			return element === listOfSubItems[index];
		});
	const msg = 'List of expected sub items does not match with the current one\n';
	const resultMsg = 'Expected: ' + listOfExpectedSubItems + '\n  Actual: ' + listOfSubItems;
	expect(isSame, msg + resultMsg).to.equal(true);
}

async function areMenuItemsVisible(listOfExpectedItems) {
	listOfExpectedItems = listOfExpectedItems.split(',').map((item) => {
		return item.trim();
	});
	const listOfItems = await getListOfAllItems();
	const isSame =
		listOfExpectedItems.length == listOfItems.length &&
		listOfExpectedItems.every(function (element, index) {
			return element === listOfItems[index];
		});
	const msg = 'List of expected sub items does not match with the current one\n';
	const resultMsg = 'Expected: ' + listOfExpectedItems + '\n  Actual: ' + listOfItems;
	expect(isSame, msg + resultMsg).to.equal(true);
}

module.exports = {
	navItemsEnum,
	clickNavItemLogo,
	clickNavItemDashboard,
	clickNavItemCourses,
	clickNavItemTasks,
	clickNavItemTasksAsked,
	clickNavItemTasksPrivate,
	clickNavItemTasksArchive,
	clickNavItemTeams,
	clickNavItemFiles,
	clickNavItemFilesMy,
	clickNavItemFilesCourses,
	clickNavItemFilesTeams,
	clickNavItemFilesShared,
	clickNavItemNews,
	clickNavItemCalendar,
	clickNavItemContent,
	clickNavItemAddons,
	clickNavItemManagement,
	clickNavItemManageStudents,
	clickNavItemManageTeachers,
	clickNavItemManageCourses,
	clickNavItemManageClasses,
	clickNavItemManageTeams,
	clickNavItemManageSchool,
	clickNavItemHelpDesk,
	clickNavItemHelpArea,
	clickNavItemHelpArticles,
	clickNavItemHelpTrainings,
	clickNavItemHelpContact,
	areSubMenuItemsVisible,
	areMenuItemsVisible,
};
