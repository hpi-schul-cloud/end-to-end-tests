/*[url/teams]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const { CLIENT } = require("../../../shared-objects/servers");

const url = `${CLIENT.URL}/teams`;
const addTeamURL = `${CLIENT.URL}/teams/add`;
const teamsContainer = 'div[data-testid="courses"]';

module.exports = {
	goToTeams: async function () {
		return elementHelpers.loadPage(url, 20);
	},
	goToAddTeam: async function () {
		//@Todo Conversion to Team list -> click on Button "Team anlegen"
		await driver.pause(2000);
		return elementHelpers.loadPage(addTeamURL, 20);
	},
	// assertion helper in steps:
	getTeamNames: async function () {
		await elementHelpers.loadPage(url, 20);
		let container = await driver.$('.row.tasks.card-deck-row');
		let elements = await container.$$('div');
		const namePromises = elements.map(async element => await element.getText());
		const teamNames = await Promise.all(namePromises);
		return teamNames;
	},
}
