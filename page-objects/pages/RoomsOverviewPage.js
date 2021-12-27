/*[url/rooms-overview*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const navigationLeftPage = require('./NavigationLeftPage');

const elementsContainer = ".rooms-container"
const rowsSelector = '.room-overview-row'
const columsSelector = ".room-overview-col"
const nameOfTheCourseSelector = ".justify-center.mt-1.sub-title"


async function goToRoomsOverview() {
	await navigationLeftPage.loadNavItemRoomsOverview();
}

/* returns array of strings, also empty */
async function getListOfElementsRoomsOverview() {
    const rows = await getNumberOfRowsRoomsOverview();
    let coursesOnThePage = [];
    for (var i=0; i<=rows; i++) {
        let currentRow = `${rowsSelector}:nth-child(${i})`;
        let columns = await driver.$$(`${currentRow} > ${columsSelector}`);
        for (var j=0; j<=columns; j++ ) {
            let nameOfCurrentElementSel = await driver.$(`${rowsSelector}:nth-child(${i}) > div:nth-child(${j}) > ${nameOfTheCourseSelector}`);
            let nameOfCurrentElement = await nameOfCurrentElementSel.getValue();
            coursesOnThePage.push(nameOfCurrentElement)
        }
    } 
    return coursesOnThePage;
}

async function isCourseNameDisplayedOnTheList(name) {
    let allCourseNamesOnTheRoomsOverview = await getListOfElementsRoomsOverview();
    expect(allCourseNamesOnTheRoomsOverview).to.include(name)
}

/* private helper method which counts the number of rows on the page and therefore the number of "subcontainers" of the elements */

async function getNumberOfRowsRoomsOverview() {
    let numberOfRowsRoomsOverview = await driver.$$(rowsSelector);
    return numberOfRowsRoomsOverview;
}

/* to be commented in after implementation of rooms-overview logic
async function goToRoomsOverview() {
    await navigationLeftPage.clickNavItemRoomsOverview();
}
*/

module.exports = {
    goToRoomsOverview,
    getListOfElementsRoomsOverview,
    isCourseNameDisplayedOnTheList

}
