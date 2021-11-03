/*[url/teams/[teamId]]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const teamSettings = 'a[data-testid="team_settings"]';
const manageTeamMembers = 'a[data-testid="administrate_team_members"]';
const editTeam = 'i.fa-edit';
const deleteTeam = 'i.fa-trash';
const deleteButtonConfirmation = '[data-testid="btn-submit-action"]';

async function clickSettings() {
	await elementHelpers.clickAndWait(teamSettings);
}

async function clickManageTeamMembers() {
	await elementHelpers.clickAndWait(manageTeamMembers);
}

async function clickEditTeam() {
	await clickSettings();
	await elementHelpers.clickAndWait(editTeam);
}

async function clickDeleteTeam() {
	await clickSettings();
	await elementHelpers.clickAndWait(deleteTeam);
	await elementHelpers.clickAndWait(deleteButtonConfirmation);
}

module.exports = {
	clickEditTeam,
	clickSettings,
	clickManageTeamMembers,
	clickDeleteTeam,
};
