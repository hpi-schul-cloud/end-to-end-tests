'use strict';

const { expect } = require('chai');
const elementHelpers = require('../../runtime/helpers/elementHelpers');

async function clickElementFromNavigation(selector) {
	await elementHelpers.clickAndWait(selector)
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

async function clickNavItemCourses() {
	await clickElementFromNavigation(navItemCourses);
}

async function clickNavItemTasks() {
	await clickElementFromNavigation(navItemTasks);
}

async function clickNavItemTasksAsked() {
	await clickElementFromNavigation(navItemTasksAsked);
}
async function clickNavItemTasksPrivate() {
	await clickElementFromNavigation(navItemTasksPrivate);
}
async function clickNavItemTasksArchive() {
	await clickElementFromNavigation(navItemTasksArchive);
}

async function clickNavItemTeams() {
	await clickElementFromNavigation(navItemTeams);
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

	try {
		await clickElementFromNavigation(navItemManagementStudentsOld);
	} catch (e) {
		await clickElementFromNavigation(navItemManagementStudents);
	}
}

async function clickNavItemManageTeachers() {
	try {
		await clickElementFromNavigation(navItemManagementTeachersOld);
	} catch (e) {
		await clickElementFromNavigation(navItemManagementTeachers);
	}
}

async function clickNavItemManageCourses() {
	try {
		await clickElementFromNavigation(navItemManagementCoursesOld);
	} catch (e) {
		await clickElementFromNavigation(navItemManagementCourses);
	}
}

async function clickNavItemManageClasses() {
	try {
		await clickElementFromNavigation(navItemManagementClassesOld);
	} catch (e) {
		await clickElementFromNavigation(navItemManagementClasses);
	}
}

async function clickNavItemManageTeams() {
	try {
		await clickElementFromNavigation(navItemManagementTeamsOld);
	} catch (e) {
		await clickElementFromNavigation(navItemManagementTeams);
	}
}

async function clickNavItemManageSchool() {
	try {
		await clickElementFromNavigation(navItemManagementSchoolOld);
	} catch (e) {
		await clickElementFromNavigation(navItemManagementSchool);
	}

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
