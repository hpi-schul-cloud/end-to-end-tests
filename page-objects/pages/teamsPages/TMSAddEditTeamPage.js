/*[url/teams/[teamId]/edit]*/
'use strict';

const TMSTeamListPage = require('../../../page-objects/pages/teamsPages/TMSTeamListPage.js');
const TMSGeneralTeamPage = require('../../../page-objects/pages/teamsPages/TMSGeneralTeamPage.js');
const TMSTeamMembersPage = require('../../../page-objects/pages/teamsPages/TMSTeamMembersPage.js');
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');

const teamName = 'input[data-testid="team_name"]';
const createTeamBtn = 'button[data-testid="create_team_btn"]';

async function setTeamName(name) {
	await waitHelpers.waitAndSetValue(teamName, name);
}

async function clickCreateTeamSubmitButton() {
	await elementHelpers.clickAndWait(createTeamBtn);
}

async function createTeamWithName(teamname) {
	await TMSTeamListPage.goToAddTeam();
	await setTeamName(teamname);
	await clickCreateTeamSubmitButton();
}

async function createTeamAndGoToInternalMembersAdministration(teamname) {
	await createTeamWithName(teamname);
	await TMSGeneralTeamPage.clickSettings();
	await TMSGeneralTeamPage.clickAdministrateTeamMembers();
	await TMSTeamMembersPage.clickAddInternalAttendeesBtn();
}

module.exports = {
	createTeamWithName,
	createTeamAndGoToInternalMembersAdministration,
};
