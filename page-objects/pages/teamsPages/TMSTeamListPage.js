/*[url/teams]*/
'use strict';

const elementHelpers= require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const navigationLeftPage = require('../NavigationLeftPage');
const teamNameContainer = '.tasks .title';
const addTeamBtn = "[data-testid='add-team-btn']";
<<<<<<< HEAD
const teamColor = ".sc-card-header[style='background:#ffad42']";
const teamIcon = "a[aria-label='test team Teilnehmer 3']"
const member = ".additionalInfo:nth-child(3)"
//const memberModal = "#member-modal-body";

module.exports = {


	goToTeams: async function () {
		return navigationLeftPage.clickNavItemTeams();
	},
	goToAddTeam: async function () {
		//@Todo Conversion to Team list -> click on Button "Team anlegen"
		await this.goToTeams();
		await elementHelpers.clickAndWait(addTeamBtn);
=======

async function goToTeams() {
	return navigationLeftPage.clickNavItemTeams();
}

async function goToAddTeam() {
	await goToTeams();
	await elementHelpers.clickAndWait(addTeamBtn);
}
>>>>>>> develop

async function getListOfTeamNames() {
	await waitHelpers.waitUntilAjaxIsFinished();
	await goToTeams();
	const selector = teamNameContainer;
	try {
		await waitHelpers.waitUntilElementIsVisible(selector);
	} catch (err) {
		return [];
	}
	const listOfTitleElements = await driver.$$(selector);
	const titleList = await elementHelpers.getTextListFromListOfElements(listOfTitleElements);
	return titleList;
}

async function isTeamOnList(teamName) {
	const listOfTeamNames = await getListOfTeamNames();
	const msg = "Team with name: '" + teamName + "' is not visible on the list \n";
	const resultMsg = 'Expected: ' + teamName + ', Actual: ' + listOfTeamNames;
	expect(listOfTeamNames, msg + resultMsg).to.include(teamName);
}

<<<<<<< HEAD
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

	openMemberIcon: async function(){

		await elementHelpers.click(member);

	},
=======
module.exports = {
	goToTeams,
	goToAddTeam,
	isTeamOnList,
>>>>>>> develop
}
