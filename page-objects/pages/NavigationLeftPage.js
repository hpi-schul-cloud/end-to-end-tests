'use strict';

const { expect } = require('chai');
const elementHelpers = require('../../runtime/helpers/elementHelpers');

async function clickElementFromNavigation(selector) {
	await elementHelpers.clickAndWait(selector)
}

const navItemsEnum = {
	LOGO: 'logo',
	DASHBOARD: 'dashboard',
	ROOMS_OVERVIEW: 'Course-Overview',
	TEAMS: 'teams',
	TASKS: 'tasks',
	FILES: 'files',
	MYFILES: 'my files',
	COURSEFILES: 'course files',
	TEAMFILES: 'team files',
	SHAREDFILES: 'shared files',
	NEWS: 'news',
	CALENDAR: 'calendar',
	CONTENT: 'content',
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
const navItemRoomsOverview = navItemString1stLevel.replace('XXX', 'Course-Overview');
const navItemTeams = navItemString1stLevel.replace('XXX', 'Teams');
const navItemTasks = navItemString1stLevel.replace('XXX', 'Aufgaben');
const navItemFiles = navItemString1stLevel.replace('XXX', 'Meine Dateien');
const navItemFilesMy = navItemString2ndLevel.replace('XXX', 'persönliche Dateien');
const navItemFilesCourses = navItemString2ndLevel.replace('XXX', 'Kurse');
const navItemFilesTeams = navItemString2ndLevel.replace('XXX', 'Teams');
const navItemFilesShared = navItemString2ndLevel.replace('XXX', 'geteilte Dateien');
const navItemNews = navItemString1stLevel.replace('XXX', 'Neuigkeiten');
const navItemCalendar = navItemString1stLevel.replace('XXX', 'Termine');
const navItemLearnstore = navItemString1stLevel.replace('XXX', 'Lern-Store');
const navItemAddons = navItemString1stLevel.replace('XXX', 'Add-ons');
const navItemManagement = navItemString1stLevel.replace('XXX', 'Verwaltung');
const navItemManagementStudents = navItemString2ndLevel.replace('XXX', 'Schüler:innen');
const navItemManagementTeachers = navItemString2ndLevel.replace('XXX', 'Lehrkräfte');
const navItemManagementCourses = navItemString2ndLevel.replace('XXX', 'Kurse');
const navItemManagementTeams = navItemString2ndLevel.replace('XXX', 'Teams');
const navItemManagementClasses = navItemString2ndLevel.replace('XXX', 'Klassen');
const navItemManagementSchool = navItemString2ndLevel.replace('XXX', 'Schule');
const navItemHelparea = navItemString1stLevel.replace('XXX', 'Hilfebereich');
const navItemHelparticles = navItemString2ndLevel.replace('XXX', 'Hilfeartikel');
const navItemHelpTrainings = navItemString2ndLevel.replace('XXX', 'Fortbildungen');
const navItemHelpContact = navItemString2ndLevel.replace('XXX', 'Kontakt');

const item = '.sidebar-list .link-name';
const subitem = '.subitem .link-name';


async function clickNavItemLogo() {
	await clickElementFromNavigation(navItemLogo);
}

async function clickNavItemDashboard() {
	await clickElementFromNavigation(navItemDashboard);
}

async function clickNavItemRoomsOverview() {
	await clickElementFromNavigation(navItemRoomsOverview);
}

async function clickNavItemTeams() {
	await clickElementFromNavigation(navItemTeams);
}

async function clickNavItemTasks() {
	await clickElementFromNavigation(navItemTasks);
}

async function clickNavItemFiles() {
	await clickElementFromNavigation(navItemFiles);
}

async function clickNavItemFilesMy() {
	await clickElementFromNavigation(navItemFilesMy);
}

async function clickNavItemFilesCourses() {
	await clickElementFromNavigation(navItemFilesCourses);
}

async function clickNavItemFilesTeams() {
	await clickElementFromNavigation(navItemFilesTeams);
}

async function clickNavItemFilesShared() {
	await clickElementFromNavigation(navItemFilesShared);
}

async function clickNavItemNews() {
	await clickElementFromNavigation(navItemNews);
}

async function clickNavItemCalendar() {
	await clickElementFromNavigation(navItemCalendar);
}

async function clickNavItemContent() {
	await clickElementFromNavigation(navItemLearnstore);
}

async function clickNavItemAddons() {
	await clickElementFromNavigation(navItemAddons);
}

async function clickNavItemManagement() {
	await clickElementFromNavigation(navItemManagement);
}

async function clickNavItemManageStudents() {
	await clickElementFromNavigation(navItemManagementStudents);
}

async function clickNavItemManageTeachers() {
	await clickElementFromNavigation(navItemManagementTeachers);
}

async function clickNavItemManageCourses() {
	await clickElementFromNavigation(navItemManagementCourses);
}

async function clickNavItemManageClasses() {
	await clickElementFromNavigation(navItemManagementClasses);
}

async function clickNavItemManageTeams() {
	await clickElementFromNavigation(navItemManagementTeams);
}

async function clickNavItemManageSchool() {
	await clickElementFromNavigation(navItemManagementSchool);
}

async function clickNavItemHelpArea() {
	await clickElementFromNavigation(navItemHelparea);
}

async function clickNavItemHelpArticles() {
	await clickElementFromNavigation(navItemHelparticles);
}

async function clickNavItemHelpTrainings() {
	await clickElementFromNavigation(navItemHelpTrainings);
}

async function clickNavItemHelpContact() {
	await clickElementFromNavigation(navItemHelpContact);
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
	clickNavItemTeams,
	clickNavItemTasks,
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
	clickNavItemRoomsOverview,
};
