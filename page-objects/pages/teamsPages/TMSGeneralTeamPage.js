/*[url/teams/[teamId]]*/
'use strict';
const selectors = {
  teamSettings: 'a[data-testid="team_settings"]',
  administrateTeamMembers: 'a[data-testid="administrate_team_members"]',
  editTeam: 'a[data-testid="needs_to_be_created"]',
  deleteTeam: 'a[data-testid="needs_to_be_created"]',
}

module.exports = {
  clickSettings: async function () {
    let settingsBtn = await driver.$(selectors.teamSettings);
    await settingsBtn.click();
  },
  clickAdministrateTeammembers: async function () {
    let administrateBtn = await driver.$(selectors.administrateTeamMembers);
    await administrateBtn.click();
  },
}
