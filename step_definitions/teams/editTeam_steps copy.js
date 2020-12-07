'use strict';

const TMSAddEditTeamPage = require('../../page-objects/pages/teamsPages/TMSAddEditTeamPage.js');
const TMSTeamListPage = require('../../page-objects/pages/teamsPages/TMSTeamListPage.js');
const TMSGeneralTeamPage = require('../../page-objects/pages/teamsPages/TMSGeneralTeamPage.js');

When(/^.* clicks on Edit-team button$/, async function () {
	await TMSGeneralTeamPage.clickEditTeam();
});

When(/^.* changes name of Team '([^']*)'$/, async function (changeName) {
	await TMSAddEditTeamPage.setTeamName(changeName);
});

When(/^.* changes team description '([^']*)'$/, async function (description) {
	await TMSAddEditTeamPage.setTeamDescription(description);
});

When(/^.* clicks on Save-changes in team button$/, async function () {
	await TMSAddEditTeamPage.clickCreateTeamSubmitButton();
});
