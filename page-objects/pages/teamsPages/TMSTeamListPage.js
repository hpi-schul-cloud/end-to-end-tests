/*[url/teams]*/
'use strict';


const waitHelpers= require('../../../runtime/helpers/waitHelpers');
const elementHelpers= require('../../../runtime/helpers/elementHelpers');
const navigationLeftPage = require('../NavigationLeftPage');
const namesContainer = '.row.tasks.card-deck-row';
const addTeamBtn = "[data-testid='add-team-btn']";
const teamColor = ".sc-card-header[style='background:#ffad42']";
const teamIcon = "a[aria-label='test team Teilnehmer 3']"
//const memberModal = "#member-modal-body";

module.exports = {


	goToTeams: async function () {
		return navigationLeftPage.clickNavItemTeams();
	},
	goToAddTeam: async function () {
		//@Todo Conversion to Team list -> click on Button "Team anlegen"
		await this.goToTeams();
		await elementHelpers.clickAndWait(addTeamBtn);


	},

	getTeamColor: async function() {
		if(elementHelpers.isElementPresent(teamColor)){
			return true;
		} else return false;
	},

	getTeamMemberIcon: async function(teamname){
		const teamMemberIcon = ".btn-member[" + teamname + " Teilnehmer 3]"
		
		if(elementHelpers.isElementPresent(teamMemberIcon)){
			return true;
		} else return false;
	},

	// assertion helper in steps:
	getTeamNames: async function () {
		await driver.pause(1000);

		await this.goToTeams();
		let container = await driver.$(namesContainer);
		let elements = await container.$$('div');
		const namePromises = elements.map(async element => await element.getText());
		const teamNames = await Promise.all(namePromises);
		return teamNames;
	},

	openMemberIcon: async function(teamname){
		let clickable = elementHelpers.isElementClickable(".btn-member");
		console.log(clickable);

	}
}
