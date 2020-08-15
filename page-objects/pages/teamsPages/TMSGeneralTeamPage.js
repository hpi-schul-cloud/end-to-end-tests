/*[url/teams/[teamId]]*/
'use strict';

const { CLIENT } = require("../../../shared-objects/servers");

module.exports ={
    // team settings icon
    teamSettings: 'a[data-testid="team_settings"]',

    // options within team settings
    administrateTeamMembers: 'a[data-testid="administrate_team_members"]'
    //editTeam: 'a[data-testid="needs_to_be_created"]'
    //deleteTeam: 'a[data-testid="needs_to_be_created"]'
}
