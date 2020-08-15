/*[url/teams/[teamId]/members]*/
'use strict';

const { CLIENT } = require("../../../shared-objects/servers");

module.exports ={
	// team members buttons
	addInternalMembers: 'button[data-testid="internal_team_members"]',
    /*data testid needs to be created*/
    /*addExternalMembers: 'button[data-testid="needs_to_be_created"]',*/

    // team members internal options
	selectTeamMembers: 'select[data-testid="select_team_members_add"]'
}
