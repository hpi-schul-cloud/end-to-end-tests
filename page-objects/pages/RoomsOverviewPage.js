/*[url/rooms-overview*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const navigationLeftPage = require('./NavigationLeftPage');

const elementsContainer = ".rooms-container"
const rowsSelector = '.room-overview-row'
const columsSelector = ".room-overview-col"



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


async function goToRoomsOverview() {
	await navigationLeftPage.loadNavItemRoomsOverview();
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
            let nameOfCurrentElementSel = await driver.$(`${elementsContainer} > ${rowsSelector}:nth-child(${i}) > ${columsSelector}:nth-child(${j}) > div div:nth-child(2)`);
            let nameOfCurrentElement = await nameOfCurrentElementSel.getText();
            coursesOnThePage.push(nameOfCurrentElement)
        }
    }
    return coursesOnThePage;
}

async function isCourseNameDisplayedOnTheList(name) {
    let allCourseNamesOnTheRoomsOverview = await getListOfElementsRoomsOverview();
    expect(allCourseNamesOnTheRoomsOverview).to.include(name)
}

async function getSelectorOfTheCourseByName(nameOfCourse) {
    const rows = await getNumberOfRowsRoomsOverview();
    for (var i=1; i<=rows; i++) {
        let currentRow = `${rowsSelector}:nth-child(${i})`;
        let columnsEls = await driver.$$(`${elementsContainer} > ${currentRow} > ${columsSelector}`);
        let columns= columnsEls.length;
        for (var j=1; j<=columns; j++ ) {
            var count = 0;
            let nameOfCurrentElementSel = await driver.$(`${elementsContainer} > ${rowsSelector}:nth-child(${i}) > ${columsSelector}:nth-child(${j}) > div div:nth-child(2)`);
            let nameOfCurrentElement = await nameOfCurrentElementSel.getText();
            if (nameOfCurrentElement==nameOfCourse) {
                return `${elementsContainer} > ${rowsSelector}:nth-child(${i}) > ${columsSelector}:nth-child(${j})  > div > span > div.v-avatar`;
            }
        }
    }
    const msg = 'Course with name: ' + nameOfCourse + ' was not found. \n';
    expect(count, msg).not.to.equal(0);
}

async function isCourseColour(courseName, colour) {
	const courseSel = await getSelectorOfTheCourseByName(courseName);
    const colourId = await getColourId(colour);
	expect(expectedColourNumber, msg + resultMsg).to.include(actualColourNumber);
}

function getColourId(colourName) {
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
			console.error(`This colour: ${colourName} does not exist on the list of possible choices`);
			break;
	}
	return colourId;
}

/* private helper method which counts the number of rows on the page and therefore the number of "subcontainers" of the elements */

async function getNumberOfRowsRoomsOverview() {
    let numberOfRowsRoomsOverview = await driver.$$(rowsSelector);
    return numberOfRowsRoomsOverview.length;
}


/* to be commented in after implementation of rooms-overview logic
async function goToRoomsOverview() {
    await navigationLeftPage.clickNavItemRoomsOverview();
}
*/

module.exports = {
    goToRoomsOverview,
    getListOfElementsRoomsOverview,
    isCourseNameDisplayedOnTheList,
    isCourseColour

}
