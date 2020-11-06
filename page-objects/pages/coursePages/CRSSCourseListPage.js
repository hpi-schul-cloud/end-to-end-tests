/*[url/courses]*/
'use strict';
const navigationTopPage = require('../NavigationTopPage');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const startPage = require('../../../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin');
const loginPage = require('../../../page-objects/pages/generalPagesBeforeLogin/LoginPage');
const navigationLeftPage = require('../NavigationLeftPage');
const CRSSGeneralCoursePage = require('./CRSSGeneralCoursePage');
const courseListPage = require('../../../page-objects/pages/coursePages/CRSSCourseListPage');

const courseDescription = '.ckcontent';
const courseHeader = '.sc-card-header';
const searchCourseFiled = '.input-group .search-field';
const courseWrapper = '.sc-card-wrapper';
const titleOfCourse = '.title';
const memberBtn = '.btn-member';
const importCourseBtn = '[data-testid="import-course-btn"]';
const createCourseBtn = '[data-testid="create-course-btn"]';
const listOfMembersSel = '#member-modal-body > ol > li';
const popupMembers = ".member-modal.in[role='dialog']";
const closeMemberModalBtn = ".member-modal button.close";


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
	await navigationLeftPage.clickNavItemCourses();
}

async function areImportAndCreateCourseBtnsVisible() {
	await waitHelpers.waitUntilElementIsVisible(importCourseBtn);
	await waitHelpers.waitUntilElementIsVisible(createCourseBtn);
}

async function isCourseDisplayedCorrectlyInSection(courseName, section) {
	const listOfCourseTitlesForSection = await getListOfCourseTitlesInSection(section);
	const msg = "Course with name: '" + courseName + "' is not last on the list: " + listOfCourseTitlesForSection;
	expect(listOfCourseTitlesForSection[listOfCourseTitlesForSection.length - 1], msg).to.equal(courseName);
}

async function isCourseOnListInSection(coursename, section) {
	const allCourses = await getListOfCourseTitlesInSection(section);
	return allCourses.includes(coursename);
}

async function clickCreateCourseBtn() {
	await elementHelpers.clickAndWait(createCourseBtn);
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
	await goToCourses();
	await waitHelpers.waitAndSetValue(searchCourseFiled, courseName);
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

async function getListOfCourseMembers() {
	await waitHelpers.waitUntilElementIsVisible(popupMembers);
	return elementHelpers.getTextFromAllElements(listOfMembersSel);
}

async function areMembersOnTheListInCourseForSection(listOfMembers) {
	let names = await getListOfCourseMembers();
	listOfMembers = listOfMembers.split(',');
	const msg = `Members: ${listOfMembers} are not visible on the list \n`;
	const resultMsg = `Actual list of members: ${names}`;
	expect(names, msg + resultMsg).to.have.members(listOfMembers);
}

async function closeMemberModal() {
	await elementHelpers.clickAndWait(closeMemberModalBtn);
}

async function isCorrectNumberOfMembersInCourseForSection(courseName, membersList, section) {
	const expectedCourseMembersCount = membersList.length;
	const actualCourseMembersCount = await getCountOfMemebersInGivenCourseInSection(courseName, section);
	const msg = 'Course with name: ' + courseName + ' has wrong members count (Members icon). \n';
	const resultMsg = 'Expected: ' + expectedCourseMembersCount + ', Actual: ' + actualCourseMembersCount;
	expect(actualCourseMembersCount, msg + resultMsg).to.equal(expectedCourseMembersCount);
}

async function getListOfCoursesInSection(section) {
	return elementHelpers.getListOfAllElements(section + ' ' + courseWrapper);
}

async function getIndexOfGivenCourseInSection(courseName, section) {
	const listOfCourseTitlesForSection = await getListOfCourseTitlesInSection(section);
	var index = listOfCourseTitlesForSection.indexOf(courseName);
	return index;
}

async function getCourseWithNameInSection(courseName, section) {
	let index = await getIndexOfGivenCourseInSection(courseName, section);
	const list = await getListOfCoursesInSection(section);
	const element = list[index];
	const headerContainer = await element.$(courseHeader);
	const descriptionContainer = await element.$(courseDescription);
	const membersContainer = await element.$(memberBtn);
	return {
		courseName: await headerContainer.getText(),
		courseDescription: await descriptionContainer.getText(),
		courseColour: (await headerContainer.getCSSProperty('background-color')).parsed.hex.toUpperCase(),
		courseMembersCount: await membersContainer.getText(),
	};
}

async function getWrapperOfCourseInSection(courseName, section) {
	var index = await getIndexOfGivenCourseInSection(courseName, section);
	const list = await getListOfCoursesInSection(section);
	const errorMsg = "Can't find course: '" + courseName + "' in section: " + section + '\n';
	const resultMsg = 'Actual list of courses: [' + list + ']';
	if (index == -1) throw errorMsg + resultMsg;
	const element = list[index];
	return element;
}

async function getListOfCourseTitlesInSection(section) {
	return elementHelpers.getTextFromAllElements(section + ' ' + courseWrapper + ' ' + titleOfCourse);
}

async function getCountOfCoursesWhichTitlesContainTextForSection(text, section) {
	let listOfCourseNames = await getListOfCourseTitlesInSection(section);
	var re = new RegExp(text, 'gi');
	const matchingNames = listOfCourseNames.filter((n) => n.match(re));
	return matchingNames.length;
}

async function clickOnCourseInSection(courseName, section) {
	const courseIndex = await getIndexOfGivenCourseInSection(courseName, section);
	const courseList = await getListOfCoursesInSection(section);
	if (courseIndex == -1) {
		throw (
			"Can't find course: '" +
			courseName +
			"' in section: " +
			section +
			'\n' +
			'Actual list of courses: [' +
			courseList +
			']'
		);
	}

	const element = courseList[courseIndex];
	await elementHelpers.clickAndWait(element);
}

async function getCountOfMemebersInGivenCourseInSection(courseName, section) {
	const course = await getCourseWithNameInSection(courseName, section);
	const actualCountOfCourseMembers = parseInt(course.courseMembersCount);
	return actualCountOfCourseMembers;
}

async function clickPupilIconInCourseInSection(courseName, section) {
	const courseWrapper = await getWrapperOfCourseInSection(courseName, section);
	let pupilIcon = await courseWrapper.$(memberBtn);
	await elementHelpers.clickAndWait(pupilIcon);
}

async function goToTasksOfTheCourse(coursename, section) {
	await goToCourses();
	await clickOnCourseInSection(coursename, section);
	await CRSSGeneralCoursePage.openHomeworksTab();
}

async function studentLogsInAndGoesToTasksOfTheCourse(username, password, coursename, section) {
	await navigationTopPage.performLogout();
	await startPage.clickLoginBtn();
	await loginPage.performLogin(username, password);
	await loginPage.performLoginActions({ shouldAcceptDataProtection: true, shouldSetOwnPassword: true, password });
	await goToTasksOfTheCourse(coursename, section);
}

async function isCountOfCourseMembers(courseName, expectedCountOfCourseMembers, section) {
	const actualCountOfCourseMembers = await getCountOfMemebersInGivenCourseInSection(courseName, section);
	const msg = 'Course with name: ' + courseName + ' has wrong members count. \n';
	const resultMsg = 'Expected: ' + expectedCountOfCourseMembers + ', Actual: ' + actualCountOfCourseMembers;
	expect(actualCountOfCourseMembers, msg + resultMsg).to.equal(parseInt(expectedCountOfCourseMembers));
}

async function isCourseDescription(courseName, expectedDescription, section) {
	const course = await getCourseWithNameInSection(courseName, section);
	const actualDescription = course.courseDescription;
	const msg = 'Course with name: ' + courseName + ' has wrong description. \n';
	const resultMsg = 'Expected: ' + expectedDescription + ', Actual: ' + actualDescription;
	expect(actualDescription, msg + resultMsg).to.equal(expectedDescription);
}

async function isCourseColour(courseName, expectedColour, section) {
	const course = await getCourseWithNameInSection(courseName, section);
	const actualColourNumber = course.courseColour;
	const expectedColourNumber = getColourSelector(expectedColour);
	const msg = 'Course with name: ' + courseName + ' has wrong colour. \n';
	const resultMsg = 'Expected: ' + expectedColour + ', Actual: ' + actualColourNumber;
	expect(expectedColourNumber, msg + resultMsg).to.include(actualColourNumber);
}

async function isCorrectNumberOfDisplayedResults(courseName, section) {
	let a = await getCountOfCoursesWhichTitlesContainTextForSection(courseName, section);
	let b = await getCountOfDisplayedCoursesForSection(section);
	expect(a).to.equal(b);
}

async function isCountOfCoursesWithNameOnList(courseName, expectedCount, section) {
	let actualCount = await getCountOfCoursesWhichTitlesContainTextForSection(courseName, section);
	const msg = 'Incorrect courses count with name: ' + courseName + '\n';
	const resultMsg = 'Expected: ' + expectedCount + ', Actual: ' + actualCount;
	expect(parseInt(expectedCount), msg + resultMsg).to.equal(actualCount);
}

async function isCountOfDisplayedCoursesForSection(expectedCount, section) {
	let actualCount = await getCountOfDisplayedCoursesForSection(section);
	const msg = 'Incorrect course count on list \n';
	const resultMsg = 'Expected: ' + expectedCount + ', Actual: ' + actualCount;
	expect(parseInt(expectedCount), msg + resultMsg).to.equal(actualCount);
}

/**
 * Use this method to check the visiblity of a course
 * set expectedValue = 'true' to check if visible
 * set expectedValue = 'false' to check if invisible
 */

async function isCourseVisible(courseName, section, expectedValue) {
	const defaultString = `Course with name: ${courseName}`;

	const msg = expectedValue
		? `${defaultString} should be visible on the list`
		: `${defaultString} should not be visible on the list`;

	const resultMsg = 'Actual list of courses: ' + (await getListOfCourseTitlesInSection(section));
	const isCourseOnList = await isCourseOnListInSection(courseName, section);

	expectedValue
		? expect(isCourseOnList, msg + resultMsg).to.be.true
		: expect(isCourseOnList, msg + resultMsg).to.be.false;
}

module.exports = {
	section,
	goToCourses,
	goToTasksOfTheCourse,
	studentLogsInAndGoesToTasksOfTheCourse,
	clickCreateCourseBtn,
	clickOnCourseInSection,
	clickPupilIconInCourseInSection,
	closeMemberModal,
	setCourseNameIntoSearchInputField,
	areImportAndCreateCourseBtnsVisible,
	areMembersOnTheListInCourseForSection,
	isCorrectNumberOfMembersInCourseForSection,
	isCourseDisplayedCorrectlyInSection,
	isCourseOnListInSection,
	isCourseColour,
	isCourseDescription,
	isCountOfCourseMembers,
	isCorrectNumberOfDisplayedResults,
	isCountOfDisplayedCoursesForSection,
	isCountOfCoursesWithNameOnList,
	isCourseVisible,
};
