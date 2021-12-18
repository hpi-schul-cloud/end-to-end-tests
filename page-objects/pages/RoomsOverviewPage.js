/*[url/rooms-overview*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const navigationLeftPage = require('./NavigationLeftPage');

async function goToRoomsOverview() {
	await navigationLeftPage.loadNavItemRoomsOverview();
}

/*
* to be commented in after implementation of rooms-overview logic
async function goToRoomsOverview() {
    await navigationLeftPage.clickNavItemRoomsOverview();
}
*/

module.exports = {
    goToRoomsOverview,
}
