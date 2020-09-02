/*[url/login]*/
'use strict';
const {CLIENT} = require("../../../shared-objects/servers");
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');


const urlLogout = `${CLIENT.URL}/logout`;

module.exports = {
    goToLogoutPage: async function () {
		await elementHelpers.loadPage(urlLogout, 20);
	},

}