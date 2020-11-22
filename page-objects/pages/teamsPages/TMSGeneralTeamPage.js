/*[url/teams/[teamId]]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const teamSettings = 'a[data-testid="team_settings"]';
const manageTeamMembers = 'a[data-testid="administrate_team_members"]';

async function clickSettings() {
	await elementHelpers.clickAndWait(teamSettings);
}

async function clickManageTeamMembers() {
	await elementHelpers.clickAndWait(manageTeamMembers);
}

module.exports = {
	clickSettings,
	clickManageTeamMembers,
};
