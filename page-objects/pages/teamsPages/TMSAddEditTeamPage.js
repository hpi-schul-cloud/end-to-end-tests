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
	orangeColor: "span[data-color='rgb(255, 173, 66)']",
	blueColor: "span[data-color='rgb(25, 118, 210)']",
	greenColor: "span[data-color='rgb(46, 125, 50)']",
	yellowColor: "span[data-color='rgb(255, 217, 90)']",

};

function getColorFromTable(color){
	let colorItem = '';
	switch(color){
		case 'orange':
		colorItem = teamColour.orangeColor;
		break;
		case 'blue':
		colorItem = teamColour.blueColor;
		break;
		case 'green':
		colorItem = teamColour.greenColor;
		break;
		case 'yellow':
		colorItem = teamColour.yellowColor;
		break;
		default:
			console.error(`This color: ${color} does not exist on the list of possible choices`);
			break;
		
	}
	return colorItem;
}


// submit button
const createTeamBtn = 'button[data-testid="create_team_btn"]';

async function setTeamName(name) {
	await waitHelpers.waitAndSetValue(teamName, name);
}

async function setTeamDescription(description) {
	await waitHelpers.waitAndSetValue(teamDescription, description);
}

async function selectColor(color) {
	let colorSelect = await driver.$('.sp-dd');
	await elementHelpers.click(colorSelect);
	let colorSelector = getColorFromTable(color);
	await elementHelpers.click(colorSelector);
}

async function clickCreateTeamSubmitButton() {
	await elementHelpers.clickAndWait(createTeamBtn);
}

async function createTeamWithName(teamname, description, color) {
	await TMSTeamListPage.goToTeams();
	await TMSTeamListPage.clickAddTeamBtn();
	await setTeamName(teamname);
	await setTeamDescription(description);
	await selectColor(color);
	await clickCreateTeamSubmitButton();
}

async function createTeamAndGoToInternalMembersManagement(teamname, description, color) {
	await createTeamWithName(teamname, description, color);
	await TMSGeneralTeamPage.clickSettings();
	await TMSGeneralTeamPage.clickManageTeamMembers();
	await TMSTeamMembersPage.clickAddInternalAttendeesBtn();
}

module.exports = {
	createTeamWithName,
	createTeamAndGoToInternalMembersManagement,
	setTeamName,
	setTeamDescription,
	selectColor,
	clickCreateTeamSubmitButton,
};
