/*[url/teams]*/
'use strict';


const waitHelpers= require('../../../runtime/helpers/waitHelpers');
const navigationLeftPage = require('../NavigationLeftPage');
const namesContainer = '.row.tasks.card-deck-row';
const addTeamBtn = "[data-testid='add-team-btn']";


module.exports = {
	goToTeams: async function () {
		return navigationLeftPage.clickNavItemTeams();
	},
	goToAddTeam: async function () {
		//@Todo Conversion to Team list -> click on Button "Team anlegen"
		await this.goToTeams();
		await waitHelpers.waitAndClick(addTeamBtn);


	},
	// assertion helper in steps:
	getTeamNames: async function () {
		await this.goToTeams();
		let container = await driver.$(namesContainer);
		let elements = await container.$$('div');
		const namePromises = elements.map(async element => await element.getText());
		const teamNames = await Promise.all(namePromises);
		return teamNames;
	},
}
