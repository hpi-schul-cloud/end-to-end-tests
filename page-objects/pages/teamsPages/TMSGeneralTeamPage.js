/*[url/teams/[teamId]]*/
'use strict';

const { CLIENT } = require("../../../shared-objects/servers");

// team settings icon
const teamSettings = 'a[data-testid="team_settings"]';

// options within team settings
const administrateTeamMembers = 'a[data-testid="administrate_team_members"]';
//const editTeam = 'a[data-testid="needs_to_be_created"]';
//const deleteTeam = 'a[data-testid="needs_to_be_created"]';

module.exports = {
  clickSettings: async function () {
    let settingsBtn = await driver.$(teamSettings);
    await settingsBtn.click();
  },
  clickAdministrateTeamMembers: async function () {
    let administrateBtn = await driver.$(administrateTeamMembers);
    await administrateBtn.click();
  },
}
