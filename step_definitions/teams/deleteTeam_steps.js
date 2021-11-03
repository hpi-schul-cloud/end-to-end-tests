'use strict';

const TMSGeneralTeamPage = require('../../page-objects/pages/teamsPages/TMSGeneralTeamPage.js');

When(/^.* clicks on Delete-team button$/, async function () {
	await TMSGeneralTeamPage.clickDeleteTeam();
});
