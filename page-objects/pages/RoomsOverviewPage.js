/*[url/rooms-overview*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const sharedHelpers = require('../../runtime/helpers/sharedHelpers');
const navigationLeftPage = require('./NavigationLeftPage');
const generalCoursePage = require('../pages/coursePages/CRSSGeneralCoursePage');
const elementsContainer = ".rooms-container"
const rowsSelector = '.room-overview-row'
const columsSelector = ".room-overview-col"
const createCourseBtn = '[data-testid="add-course-button"]';
const toAllCourses = '[data-testid="go-to-all-courses"]';

const roomsOverviewAvatarColours = {
	grey: 'rgb(84, 97, 110)',
	pink: 'rgb(236, 64, 122)',
	red: 'rgb(213, 0, 0)',
	orange: 'rgb(239, 108, 0)',
	moose: 'rgb(130, 119, 23)',
	grasgreen: 'rgb(104, 159, 56)',
	seagreen: 'rgb(0, 150, 136)',
	skyblue: 'rgb(0, 145, 234)',
	blue: 'rgb(48, 79, 254)',
	lila: 'rgb(213, 0, 249)',
	violet: 'rgb(156, 39, 176)',
	brown: 'rgb(121, 85, 72)',
}

/* to be removed after implementation of rooms-overview logic
async function goToRoomsOverview() {
	await navigationLeftPage.loadNavItemRoomsOverview();
}
*/

async function goToRoomsOverview() {
    await navigationLeftPage.clickNavItemRoomsOverview();
}

/* returns array of strings, also empty */
async function getListOfElementsRoomsOverview() {
    const rows = await getNumberOfRowsRoomsOverview();
    let coursesOnThePage = [];
    for (var i=1; i<=rows; i++) {
        let currentRow = `${rowsSelector}:nth-child(${i})`;
        let columnsEls = await driver.$$(`${elementsContainer} > ${currentRow} > ${columsSelector}`);
        let columns= columnsEls.length;
        for (var j=1; j<=columns; j++ ) {
            let nameOfCurrentElementSel = await sharedHelpers.getElement(`${elementsContainer} > ${rowsSelector}:nth-child(${i}) > ${columsSelector}:nth-child(${j}) > div div:nth-child(2)`);
            let nameOfCurrentElement = await nameOfCurrentElementSel.getText();
            coursesOnThePage.push(nameOfCurrentElement)
        }
    }
    return coursesOnThePage;
}

async function isCourseNameDisplayedOnTheList(courseName, expectedValue) {
	await driver.pause(3000);
	let allCourseNamesOnTheRoomsOverview = await getListOfElementsRoomsOverview();
	const defaultString = `Course with name: ${courseName}`;

	const msg = expectedValue
		? `${defaultString} should be visible on the list`
		: `${defaultString} should not be visible on the list`;

	const resultMsg = 'Actual list of courses: ' + allCourseNamesOnTheRoomsOverview;
	const isCourseOnList = await allCourseNamesOnTheRoomsOverview.includes(courseName);
	expect(isCourseOnList, msg + resultMsg).to.equal(expectedValue);
}

/* returns a string (basic selector) of the element matching the name in the parameter. Can be modified to get more precise information.*/
async function getBasicSelectorOfTheCourseByName(nameOfCourse) {
	const rows = await getNumberOfRowsRoomsOverview();
    for (var i=1; i<=rows; i++) {
        let currentRow = `${rowsSelector}:nth-child(${i})`;
        let columnsEls = await driver.$$(`${elementsContainer} > ${currentRow} > ${columsSelector}`);
        let columns= columnsEls.length;
        for (var j=1; j<=columns; j++ ) {
            var count = 0;
            let nameOfCurrentElementSel = await sharedHelpers.getElement(`${elementsContainer} > ${rowsSelector}:nth-child(${i}) > ${columsSelector}:nth-child(${j}) > div div:nth-child(2)`);
            let nameOfCurrentElement = await nameOfCurrentElementSel.getText();
            if (nameOfCurrentElement==nameOfCourse) {
				return `${elementsContainer} > ${rowsSelector}:nth-child(${i}) > ${columsSelector}:nth-child(${j})`;
            }
        }
    }
    const msg = 'Course with name: ' + nameOfCourse + ' was not found. \n';
    expect(count, msg).not.to.equal(0);
}

async function getCourseColourSel(courseName) {
	let basicSel = await getBasicSelectorOfTheCourseByName(courseName);
	return `${basicSel} > div > span > div.v-avatar`
}

async function isCourseColour(courseName, colour) {
	const courseColourSelString = await getCourseColourSel(courseName);
	const courseColourSel = await sharedHelpers.getElement(courseColourSelString);
	const colourIdInTheSelector = await courseColourSel.getAttribute("style");
	const colourId = await getColourId(colour);
	expect(colourIdInTheSelector).to.include(colourId);
}

async function clickCreateCourseBtn() {
	await elementHelpers.clickAndWait(createCourseBtn);
}

async function clickOnTheElementWithName(courseName) {
	let selectorOfTheCourseStr = await getBasicSelectorOfTheCourseByName(courseName);
	await elementHelpers.clickAndWait(selectorOfTheCourseStr);
}

async function getColourId(colourName) {
	let colourId;
	switch (colourName) {
		case 'grey':
			colourId = roomsOverviewAvatarColours.grey;
			break;
		case 'pink':
			colourId = roomsOverviewAvatarColours.pink;
			break;
		case 'red':
			colourId = roomsOverviewAvatarColours.red;
			break;
		case 'orange':
			colourId = roomsOverviewAvatarColours.orange;
			break;
		case 'moose':
			colourId = roomsOverviewAvatarColours.moose;
			break;
		case 'grasgreen':
			colourId = roomsOverviewAvatarColours.grasgreen;
			break;
		case 'seagreen':
			colourId = roomsOverviewAvatarColours.seagreen;
			break;
		case 'skyblue':
			colourId = roomsOverviewAvatarColours.skyblue;
			break;
		case 'blue':
			colourId = roomsOverviewAvatarColours.blue;
			break;
		case 'lila':
			colourId = roomsOverviewAvatarColours.lila;
			break;
		case 'violet':
			colourId = roomsOverviewAvatarColours.violet;
			break;
		case 'brown':
			colourId =roomsOverviewAvatarColours.brown;
			break;
		default:
			console.error(`This colour: ${colourName} does not exist on the list of possible choices!`);
			break;
	}
	return colourId;
}

/* private helper method which counts the number of rows on the page and therefore the number of "subcontainers" of the elements */
async function getNumberOfRowsRoomsOverview() {
	await driver.pause(3000);
    let numberOfRowsRoomsOverview = await driver.$$(rowsSelector);
	return numberOfRowsRoomsOverview.length;
}

async function goToallCourses() {
	await elementHelpers.clickAndWait(toAllCourses)
}

async function isNumberOfCourseMembers(courseName, expectedNumberOfMembers) {
	await navigationLeftPage.clickNavItemRoomsOverview()
	await clickOnTheElementWithName(courseName);
	await generalCoursePage.clickEditCourse();
	const numOfMembers = await generalCoursePage.getNumberOfCourseMembers();
	const membersToString = numOfMembers.toString();
	expect(membersToString).to.equal(expectedNumberOfMembers);
}

module.exports = {
    goToRoomsOverview,
    getListOfElementsRoomsOverview,
    isCourseNameDisplayedOnTheList,
	isCourseColour,
	clickOnTheElementWithName,
	clickCreateCourseBtn,
	goToallCourses,
	isNumberOfCourseMembers,
}
