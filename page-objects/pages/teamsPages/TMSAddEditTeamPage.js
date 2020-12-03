/*[url/teams/[teamId]/edit]*/
'use strict';

const TMSTeamListPage = require('../../../page-objects/pages/teamsPages/TMSTeamListPage.js');
const TMSGeneralTeamPage = require('../../../page-objects/pages/teamsPages/TMSGeneralTeamPage.js');
const TMSTeamMembersPage = require('../../../page-objects/pages/teamsPages/TMSTeamMembersPage.js');
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');

const teamName = 'input[data-testid="team_name"]';
const teamDescription = '#teamDesc';
const teamColour = {
	orangeColour: "span[data-color='rgb(255, 173, 66)']",
	blueColour: "span[data-color='rgb(25, 118, 210)']",
	greenColour: "span[data-color='rgb(46, 125, 50)']",
	yellowColour: "span[data-color='rgb(255, 217, 90)']",

};
const createTeamBtn = 'button[data-testid="create_team_btn"]';
const colourSelect = '.sp-dd';

function getColourFromTable(colour){
	let colourItem = '';
	switch(colour){
		case 'orange':
		colourItem = teamColour.orangeColour;
		break;
		case 'blue':
		colourItem = teamColour.blueColour;
		break;
		case 'green':
		colourItem = teamColour.greenColour;
		break;
		case 'yellow':
		colourItem = teamColour.yellowColour;
		break;
		default:
			console.error(`This color: ${colour} does not exist on the list of possible choices`);
			break;
		
	}
	return colourItem;
}

async function setTeamName(name) {
	await waitHelpers.waitAndSetValue(teamName, name);
}

async function setTeamDescription(description) {
	await waitHelpers.waitAndSetValue(teamDescription, description);
}

async function setTeamColour(colour) {
	await elementHelpers.click(colourSelect);
	let colourSelector = getColourFromTable(colour);
	await elementHelpers.click(colourSelector);
}

async function clickCreateTeamSubmitButton() {
	await elementHelpers.clickAndWait(createTeamBtn);
}

async function createTeamWithName(teamname, description, colour) {
	await TMSTeamListPage.goToTeams();
	await TMSTeamListPage.clickAddTeamBtn();
	await setTeamName(teamname);
	await setTeamDescription(description);
	await setTeamColour(colour);
	await clickCreateTeamSubmitButton();
}

async function createTeamAndGoToInternalMembersManagement(teamname, description, colour) {
	await createTeamWithName(teamname, description, colour);
	await TMSGeneralTeamPage.clickSettings();
	await TMSGeneralTeamPage.clickManageTeamMembers();
	await TMSTeamMembersPage.clickAddInternalAttendeesBtn();
}

module.exports = {
	createTeamWithName,
	createTeamAndGoToInternalMembersManagement,
	setTeamName,
	setTeamDescription,
	setTeamColour,
	clickCreateTeamSubmitButton,
};
