'use strict';

const { expect } = require('chai');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../runtime/helpers/waitHelpers');

async function loadPageFromNavigationItem(selector) {
	const link = await elementHelpers.getLink(selector);
	await elementHelpers.loadPage(link);
	await waitHelpers.waitUntilPageLoads();
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
const navItemString2ndLevel = "li[data-testid='XXX'] > a";
const navItemLogo = navItemString1stLevel.replace('XXX', 'Startseite');
const navItemDashboard = navItemString1stLevel.replace('XXX', 'Übersicht');
const navItemCourses = navItemString1stLevel.replace('XXX', 'Kurse');
const navItemTasks = navItemString1stLevel.replace('XXX', 'Aufgaben');
const navItemTasksAsked = navItemString2ndLevel.replace('XXX', 'Gestellte Aufgaben');
const navItemTasksPrivate = navItemString2ndLevel.replace('XXX', 'Entwürfe');
const navItemTasksArchive = navItemString2ndLevel.replace('XXX', 'Archiv');
const navItemTeams = navItemString1stLevel.replace('XXX', 'Teams');
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
const navItemManagementStudents = navItemString2ndLevel.replace('XXX', 'Schüler:innen');
const navItemManagementStudentsOld = navItemString2ndLevel.replace('XXX', 'Schüler:innen');
const navItemManagementTeachers = '[data-testid="global.sidebar.teacher"] > a';
const navItemManagementTeachersOld = navItemString2ndLevel.replace('XXX', 'Lehrkräfte');
const navItemManagementCourses = '[data-testid="global.sidebar.courses"] > a';
const navItemManagementCoursesOld = navItemString2ndLevel.replace('XXX', 'Kurse');
const navItemManagementTeams = '[data-testid="global.sidebar.teams"] > a';
const navItemManagementTeamsOld = navItemString2ndLevel.replace('XXX', 'Teams');
const navItemManagementClasses = '[data-testid="global.sidebar.classes"] > a';
const navItemManagementClassesOld = navItemString2ndLevel.replace('XXX', 'Klassen');
const navItemManagementSchool = '[data-testid="global.sidebar.school"] > a';
const navItemManagementSchoolOld = navItemString2ndLevel.replace('XXX', 'Schule');
const navItemHelparea = navItemString1stLevel.replace('XXX', 'Hilfebereich');
const navItemHelparticles = navItemString2ndLevel.replace('XXX', 'Hilfeartikel');
const navItemHelpTrainings = navItemString2ndLevel.replace('XXX', 'Fortbildungen');
const navItemHelpContact = navItemString2ndLevel.replace('XXX', 'Kontakt');

const item = '.sidebar-list .link-name';
const subitem = '.subitem .link-name';

async function clickNavItemLogo() {
	await loadPageFromNavigationItem(navItemLogo);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemDashboard() {
	await loadPageFromNavigationItem(navItemDashboard);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemCourses() {
	await loadPageFromNavigationItem(navItemCourses);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemTasks() {
	await loadPageFromNavigationItem(navItemTasks);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemTasksAsked() {
	await loadPageFromNavigationItem(navItemTasksAsked);
	await waitHelpers.waitUntilPageLoads();
}
async function clickNavItemTasksPrivate() {
	await loadPageFromNavigationItem(navItemTasksPrivate);
	await waitHelpers.waitUntilPageLoads();
}
async function clickNavItemTasksArchive() {
	await loadPageFromNavigationItem(navItemTasksArchive);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemTeams() {
	await loadPageFromNavigationItem(navItemTeams);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemFiles() {
	await loadPageFromNavigationItem(navItemFiles);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemFilesMy() {
	await loadPageFromNavigationItem(navItemFilesMy);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemFilesCourses() {
	await loadPageFromNavigationItem(navItemFilesCourses);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemFilesTeams() {
	await loadPageFromNavigationItem(navItemFilesTeams);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemFilesShared() {
	await loadPageFromNavigationItem(navItemFilesShared);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemNews() {
	await loadPageFromNavigationItem(navItemNews);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemCalendar() {
	await loadPageFromNavigationItem(navItemCalendar);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemContent() {
	await loadPageFromNavigationItem(navItemLearnstore);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemAddons() {
	await loadPageFromNavigationItem(navItemAddons);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemManagement() {
	await loadPageFromNavigationItem(navItemManagement);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemManageStudents() {
	try {
		await loadPageFromNavigationItem(navItemManagementStudentsOld);
		await waitHelpers.waitUntilPageLoads();
	} catch (e) {
		await loadPageFromNavigationItem(navItemManagementStudents);
		await waitHelpers.waitUntilPageLoads();
	}
}

async function clickNavItemManageTeachers() {
	try {
		await loadPageFromNavigationItem(navItemManagementTeachersOld);
		await waitHelpers.waitUntilPageLoads();
	} catch (e) {
		await loadPageFromNavigationItem(navItemManagementTeachers);
		await waitHelpers.waitUntilPageLoads();
	}
}

async function clickNavItemManageCourses() {
	try {
		await loadPageFromNavigationItem(navItemManagementCoursesOld);
		await waitHelpers.waitUntilPageLoads();
	} catch (e) {
		await loadPageFromNavigationItem(navItemManagementCourses);
		await waitHelpers.waitUntilPageLoads();
	}
}

async function clickNavItemManageClasses() {
	try {
		await loadPageFromNavigationItem(navItemManagementClassesOld);
		await waitHelpers.waitUntilPageLoads();
	} catch (e) {
		await loadPageFromNavigationItem(navItemManagementClasses);
		await waitHelpers.waitUntilPageLoads();
	}
}

async function clickNavItemManageTeams() {
	try {
		await loadPageFromNavigationItem(navItemManagementTeamsOld);
		await waitHelpers.waitUntilPageLoads();
	} catch (e) {
		await loadPageFromNavigationItem(navItemManagementTeams);
		await waitHelpers.waitUntilPageLoads();
	}
}

async function clickNavItemManageSchool() {
	try {
		await loadPageFromNavigationItem(navItemManagementSchoolOld);
		await waitHelpers.waitUntilPageLoads();
	} catch (e) {
		await loadPageFromNavigationItem(navItemManagementSchool);
		await waitHelpers.waitUntilPageLoads();
	}
}

async function clickNavItemHelpArea() {
	await loadPageFromNavigationItem(navItemHelparea);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemHelpArticles() {
	await loadPageFromNavigationItem(navItemHelparticles);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemHelpTrainings() {
	await loadPageFromNavigationItem(navItemHelpTrainings);
	await waitHelpers.waitUntilPageLoads();
}

async function clickNavItemHelpContact() {
	await loadPageFromNavigationItem(navItemHelpContact);
	await waitHelpers.waitUntilPageLoads();
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
	clickNavItemHelpArea,
	clickNavItemHelpArticles,
	clickNavItemHelpTrainings,
	clickNavItemHelpContact,
	areSubMenuItemsVisible,
	areMenuItemsVisible,
};
