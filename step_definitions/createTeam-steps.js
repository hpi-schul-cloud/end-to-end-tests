'use strict';

const TMSAddEditTeamPage = require('../page-objects/pages/teamsPages/TMSAddEditTeamPage.js');
const TMSTeamListPage = require('../page-objects/pages/teamsPages/TMSTeamListPage.js');
const TMSTeamMembersPage = require('../page-objects/pages/teamsPages/TMSTeamMembersPage.js');
let teamName;

When(/^.*creates a new team with name (.*)$/, function (teamname) {
    teamName = teamname;
    return TMSAddEditTeamPage.createTeamAndGoToInternalMembersAdministration(teamName);
});
When(/^.*adds a student to team with lastname: (.*) and firstname: (.*)$/, async function (lastname, firstname) {
    await TMSTeamMembersPage.addTeamAttendee(lastname, firstname);
});

When(/^.*clicks submit add team member button$/, async function () {
	await TMSTeamMembersPage.clickSubmitAddTeamAttendeeBtn();
});

Then(/^.*team should be displayed on the team page$/, async function () {
    await TMSTeamListPage.isTeamOnList(teamName);
});
