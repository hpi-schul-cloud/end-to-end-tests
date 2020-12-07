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
	await elementHelpers.clickAndWait(navItemLogo);
}

async function clickNavItemDashboard() {
	await elementHelpers.clickAndWait(navItemDashboard);
}

async function clickNavItemCourses() {
	await elementHelpers.clickAndWait(navItemCourses);
}

async function clickNavItemTasks() {
	await elementHelpers.clickAndWait(navItemTasks);
	await waitHelpers.waitUntilAjaxIsFinished();
}

async function clickNavItemTasksAsked() {
	await elementHelpers.clickAndWait(navItemTasksAsked);
	await waitHelpers.waitUntilAjaxIsFinished();
}

async function clickNavItemTasksPrivate() {
	await elementHelpers.clickAndWait(navItemTasksPrivate);
	await waitHelpers.waitUntilAjaxIsFinished();
}

async function clickNavItemTasksArchive() {
	await elementHelpers.clickAndWait(navItemTasksArchive);
	await waitHelpers.waitUntilAjaxIsFinished();
}

async function clickNavItemTeams() {
	// For nuxt and old client
	try {
		await elementHelpers.clickAndWait(navItemTeamsNuxt);
	} catch (e) {
		await elementHelpers.click(navItemTeamsOld);
	}
}

async function clickNavItemFiles() {
	await elementHelpers.clickAndWait(navItemFiles);
}

async function clickNavItemFilesMy() {
	await elementHelpers.clickAndWait(navItemFilesMy);
}

async function clickNavItemFilesCourses() {
	await elementHelpers.clickAndWait(navItemFilesCourses);
}

async function clickNavItemFilesTeams() {
	await elementHelpers.clickAndWait(navItemFilesTeams);
}

async function clickNavItemFilesShared() {
	await elementHelpers.clickAndWait(navItemFilesShared);
}

async function clickNavItemNews() {
	await elementHelpers.clickAndWait(navItemNews);
}

async function clickNavItemCalendar() {
	await elementHelpers.clickAndWait(navItemCalendar);
}

async function clickNavItemContent() {
	await elementHelpers.clickAndWait(navItemLearnstore);
}

async function clickNavItemAddons() {
	await elementHelpers.clickAndWait(navItemAddons);
}

async function clickNavItemManagement() {
	await elementHelpers.clickAndWait(navItemManagement);
}

async function clickNavItemManageStudents() {
	// For teachers it's called Schüler:innen for admins it's called Schüler
	try {
		await elementHelpers.clickAndWait(navItemManagementStudentsAdmin);
	} catch (e) {
		await elementHelpers.click(navItemManagementStudentsTeacher);
	}
}

async function clickNavItemManageTeachers() {
	// For nuxt and old client
	try {
		await elementHelpers.clickAndWait(navItemManagementTeachersNuxt);
	} catch (e) {
		await elementHelpers.click(navItemManagementTeachersOld);
	}
}

async function clickNavItemManageCourses() {
	await elementHelpers.clickAndWait(navItemManagementCourses);
}

async function clickNavItemManageClasses() {
	// For nuxt and old client
	try {
		await elementHelpers.clickAndWait(navItemManagementClassesNuxt);
	} catch (e) {
		await elementHelpers.click(navItemManagementClassesOld);
	}
}

async function clickNavItemManageTeams() {
	await elementHelpers.clickAndWait(navItemManagementTeams);
}

async function clickNavItemManageSchool() {
	await elementHelpers.clickAndWait(navItemManagementSchool);
}

async function clickNavItemHelpDesk() {
	await elementHelpers.clickAndWait(navItemHelpDesk);
}

async function clickNavItemHelpArea() {
	await elementHelpers.clickAndWait(navItemHelparea);
}

async function clickNavItemHelpArticles() {
	await elementHelpers.clickAndWait(navItemHelparticles);
}

async function clickNavItemHelpTrainings() {
	await elementHelpers.clickAndWait(navItemHelpTrainings);
}

async function clickNavItemHelpContact() {
	await elementHelpers.clickAndWait(navItemHelpContact);
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
