/*[url/courses]*/
'use strict';
const { CLIENT } = require('../../../shared-objects/servers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const startPage = require('../../../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin');
const loginPage = require('../../../page-objects/pages/generalPagesBeforeLogin/LoginPage');
const logoutPage = require('../../../page-objects/pages/generalPagesBeforeLogin/LogoutPage');

const urlCourses = `${CLIENT.URL}/courses`;
const searchCourseFiled = '.input-group .search-field';
const courseWrapper = '.sc-card-wrapper';
const titleOfCourse = '.title';
const memberBtn = '.btn-member';
const importCourseBtn = '[data-testid="import-course-btn"]';
const createCourseBtn = '[data-testid="create-course-btn"]';
const createYourFirstCourseBtn = 'a.btn-primary.btn-add:not([data-testid="create-course-btn"])';
const container_of_element = '[data-testid="container_of_element"]';
const header_of_element = '[data-testid="header-of-element"]';
const listOfMembersSel = '#member-modal-body > ol > li';

const courseColour = {
	grey: 'background:#ACACAC',
	metallicGold: 'background:#ACACAC',
	blue: 'background:#00E5FF',
	green: 'background:#1DE9B6',
	darkGrey: 'background:#546E7A',
	goldenPoppy: 'background:#FFC400',
	martini: 'background:#BCAAA4',
	violetRed: 'background:#FF4081',
	corn: 'background:#FFEE58',
};

const section = {
	allCourses: '.section-courses',
	activeCourses: '.section-activeCourses',
	archievedCourses: '.section-archievedCourses',
};

async function goToCourses() {
	await elementHelpers.loadPage(urlCourses, 30);
}

async function areImportAndCreateCourseBtnsVisible() {
	expect(await elementHelpers.isElementPresent(importCourseBtn)).to.equal(true);
	expect(await elementHelpers.isElementPresent(createCourseBtn)).to.equal(true);
}

async function isCourseDisplayedCorrectly(courseName) {
	const activeCoursesContainer = await driver.$(section.activeCourses);
	const coursesOnThePage = await activeCoursesContainer.$$(titleOfCourse);
	const courseCount = await coursesOnThePage.length;
	const courseTitleCard = coursesOnThePage[courseCount - 1];
	const courseTitle = await courseTitleCard.getText();
	expect(courseTitle).to.equal(courseName);
}

async function isCourseOnListInSection(coursename, section) {
	const allCourses = await getListOfCourseTitlesInSection(section);
	return allCourses.includes(coursename);
}

async function isCorrectCourseColour(colour) {
	const activeCoursesContainer = await driver.$(section.activeCourses);
	const coursesOnThePage = await activeCoursesContainer.$$(container_of_element);
	const indexOfTheLastAddedCourse = await coursesOnThePage.length;
	const container = await driver.$(container_of_element + ':nth-child(' + indexOfTheLastAddedCourse + ')');
	const lastAddedCourse = await container.$(header_of_element);
	const styleArray = await lastAddedCourse.getHTML();
	const regexp = /background:#[A-F, 0-9]{6}/;
	const styleMatches = styleArray.match(regexp);
	const style = styleMatches[0];
	const colourNumber = getColourSelector(colour);
	expect(style).to.equal(colourNumber);
}

async function clickCreateCourseBtn() {
	await elementHelpers.click(createCourseBtn);
}

function getColourSelector(colourName) {
	let colourSelector;
	switch (colourName) {
		case 'grey':
			colourSelector = courseColour.grey;
			break;
		case 'metallicGold':
			colourSelector = courseColour.metallicGold;
			break;
		case 'blue':
			colourSelector = courseColour.blue;
			break;
		case 'green':
			colourSelector = courseColour.green;
			break;
		case 'darkGrey':
			colourSelector = courseColour.darkGrey;
			break;
		case 'goldenPoppy':
			colourSelector = courseColour.goldenPoppy;
			break;
		case 'martini':
			colourSelector = courseColour.martini;
			break;
		case 'violetRed':
			colourSelector = courseColour.violetRed;
			break;
		case 'corn':
			colourSelector = courseColour.corn;
			break;
		default:
			console.error(`This colour: ${colourName} does not exist on the list of possible choices`);
			break;
	}
	return colourSelector;
}

async function setCourseNameIntoSearchInputField(courseName) {
	await elementHelpers.fillInputField(searchCourseFiled, courseName);
}

async function getCountOfDisplayedCoursesForSection(section) {
	const elem = await getListOfCoursesInSection(section);
	var numberOfDisplayedCourses = 0;
	for (var i = 0; i < elem.length; i++) {
		if ((await elem[i].isDisplayed()) == true) {
			numberOfDisplayedCourses += 1;
		}
	}
	return numberOfDisplayedCourses;
}

async function getCourseWrapper(courseName) {
	const courseWrapper = await driver.$(
		'//*[contains(@class,"sc-card-wrapper") and contains(.//span, "' + courseName + '")]'
	);
	return courseWrapper;
}

async function getNamesOfMembers() {
	const listOfMembers = await driver.$$(listOfMembersSel);
	return elementHelpers.getTextListFromListOfElements(listOfMembers);
}

async function areMembersOnTheListInCourseForSection(courseName, members, section) {
	await clickPupilIconInCourseInSection(courseName, section);
	await driver.pause(1000);
	let names = await getNamesOfMembers();
	expect(names).to.have.members(members);
}

async function isCorrectNumberOfMembersInCourseForSection(courseName, members, section) {
	const numberOfExpectedMembers = members.length;
	const numberOfMembers = await getNumberOfMembersInGivenCourseInSection(courseName, section);
	expect(numberOfMembers).to.equal(numberOfExpectedMembers);
}

async function getListOfCoursesInSection(section) {
	await waitHelpers.waitUntilPageLoads();
	await waitHelpers.waitUntilElementIsPresent(section + ' ' + courseWrapper);
	const listOfCourses = await driver.$$(section + ' ' + courseWrapper);
	return listOfCourses;
}

async function getIndexOfGivenCourseInSection(courseName, section) {
	const listOfCourseTitlesForSection = await getListOfCourseTitlesInSection(section);
	var index = listOfCourseTitlesForSection.indexOf(courseName);
	return index;
}

async function getDescriptionCourse(index) {
	try {
		return await elementHelpers.getElementText(
			'.section-activeCourses div:nth-child(' + index + ') > article > div.sc-card-body.ckcontent'
		);
	} catch (error) {
		log.error('Can not get value: ' + error.message);
		throw error;
	}
}

async function getCourseName(index) {
	try {
		return await elementHelpers.getElementText(
			'.section-activeCourses div:nth-child(' + index + ') > article span.title'
		);
	} catch (error) {
		log.error('Can not get value: ' + error.message);
		throw error;
	}
}

async function getColorCourse(index) {
	try {
		let courseContainer = await driver.$(
			'.section-activeCourses div:nth-child(' + index + ') > article > div.sc-card-header'
		);
		const css = await courseContainer.getCSSProperty('background-color');
		let color = css.parsed.hex;
		return color;
	} catch (error) {
		log.error('Can not get value: ' + error.message);
		throw error;
	}
}

async function getWrapperOfCourseInSection(courseName, section) {
	var index = await getIndexOfGivenCourseInSection(courseName, section);
	if (index == -1) throw "Can't find course: " + courseName + ' in section: ' + section;

	const list = await getListOfCoursesInSection(section);
	const element = list[index];
	return element;
}

async function getListOfCourseTitlesInSection(section) {
	await waitHelpers.waitUntilPageLoads();
	const selector = section + ' ' + courseWrapper + ' ' + titleOfCourse;
	try {
		await waitHelpers.waitUntilElementIsPresent(selector);
	} catch (err) {
		return [];
	}
	const listOfCourseTitleElements = await driver.$$(selector);
	let courseTitleList = await Promise.all(listOfCourseTitleElements.map(async (element) => await element.getText()));
	return courseTitleList;
}

async function getCountOfCoursesWhichTitlesContainTextForSection(text, section) {
	let listOfCourseNames = await getListOfCourseTitlesInSection(section);
	var re = new RegExp(text, 'gi');
	const matchingNames = listOfCourseNames.filter((n) => n.match(re));
	return matchingNames.length;
}

async function clickOnCourseInSection(courseName, section) {
	const courseIndex = await getIndexOfGivenCourseInSection(courseName, section);
	if (courseIndex == -1) throw "Can't find course: " + courseName + ' in section: ' + section;

	const courseList = await getListOfCoursesInSection(section);
	const element = courseList[courseIndex];
	await elementHelpers.click(element);
}

async function getNumberOfMembersInGivenCourseInSection(courseName, section) {
	const courseWrapper = await getWrapperOfCourseInSection(courseName, section);
	await driver.pause(1000);
	const element = await courseWrapper.$(memberBtn);
	let text = await element.getText();
	let number = parseInt(text);
	return number;
}

async function clickPupilIconInCourseInSection(courseName, section) {
	const courseWrapper = await getWrapperOfCourseInSection(courseName, section);
	await driver.pause(1000);
	let pupilIcon = await courseWrapper.$(memberBtn);
	await pupilIcon.click();
	await driver.pause(500);
}

async function goToTasksOfTheCourse(coursename) {
	await goToCourses();
	await clickOnCourseInSection(coursename, section.activeCourses);
	await gotoTasksTab();
}

async function studentLogsInAndGoesToTasksOfTheCourse(username, password, coursename) {
	await logoutPage.goToLogoutPage();
	await startPage.performLogin(username, password);
	await loginPage.firstLoginStudent(username, password);
	await goToTasksOfTheCourse(coursename);
}

async function isTopicInCourseInSection(coursename, topicname, section) {
	await clickOnCourseInSection(coursename, section);
	let topicNames = await Promise.all(
		(await driver.$$('#topic-list > div > div > div')).map(async (element) => await element.getText())
	);
	await expect(topicNames).to.include(topicname);
}

async function areNotAnyStudentsInCopiedCourse(coursename) {
	let copiedName = coursename + ' - Kopie';
	let courseHasIndex = (await getIndexOfGivenCourseInSection(copiedName, section.activeCourses)) + 1;
	let areThereStudentsInCourseContainer = await driver.$(
		'.sc-card-wrapper.col-xl-3.col-lg-4.col-md-6.col-sm-12:nth-child(' +
			courseHasIndex +
			') .additionalInfo .btn-member'
	);
	let areThereStudentsInCourse = await areThereStudentsInCourseContainer.getText();
	let number = parseInt(areThereStudentsInCourse);
	await expect(number).to.equal(0);
}
module.exports = {
	section,
	goToCourses,
	areImportAndCreateCourseBtnsVisible,
	isCourseDisplayedCorrectly,
	isCourseOnListInSection,
	isCorrectCourseColour,
	clickCreateCourseBtn,
	getColourSelector,
	setCourseNameIntoSearchInputField,
	getCountOfDisplayedCoursesForSection,
	getCourseWrapper,
	getNamesOfMembers,
	areMembersOnTheListInCourseForSection,
	isCorrectNumberOfMembersInCourseForSection,
	getListOfCoursesInSection,
	getIndexOfGivenCourseInSection,
	getDescriptionCourse,
	getCourseName,
	getColorCourse,
	getWrapperOfCourseInSection,
	getListOfCourseTitlesInSection,
	getCountOfCoursesWhichTitlesContainTextForSection,
	clickOnCourseInSection,
	getNumberOfMembersInGivenCourseInSection,
	clickPupilIconInCourseInSection,
	goToTasksOfTheCourse,
	studentLogsInAndGoesToTasksOfTheCourse,
	isTopicInCourseInSection,
	areNotAnyStudentsInCopiedCourse,
};
