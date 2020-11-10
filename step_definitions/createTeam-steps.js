'use strict';

const TMSAddEditTeamPage = require('../page-objects/pages/teamsPages/TMSAddEditTeamPage.js');
const TMSTeamListPage = require('../page-objects/pages/teamsPages/TMSTeamListPage.js');
const TMSTeamMembersPage = require('../page-objects/pages/teamsPages/TMSTeamMembersPage.js');

When(/^.*creates a new team with name '([^']*)' and description '([^']*)' and color orange$/, function (teamName, description) {
	return TMSAddEditTeamPage.createTeamAndGoToInternalMembersAdministration(teamName, description);
});

When(/^.*adds a student to team with lastname: '([^']*)' and firstname: '([^']*)'$/, async function (lastname, firstname) {
	await TMSTeamMembersPage.addTeamAttendee(lastname, firstname);
});

When(/^.*clicks Submit-add-team-member button$/, async function () {
	await TMSTeamMembersPage.clickSubmitAddTeamAttendeeBtn();
});

When(/^.*clicks on Member icon in team with name '([^']*)'$/, async function (teamName) {
	await TMSTeamListPage.clickMemberIconInTeam(teamName); 
});

Then(/^.*team with name '([^']*)' is be visible on the list$/, async function (teamName) {
	await TMSTeamListPage.isTeamOnList(teamName);
});

Then(/^.*team with name '([^']*)' has colour '([^']*)'$/, async function (teamName, teamColour) {
	await TMSTeamListPage.isTeamColour(teamName, teamColour);
});

Then(/^.*team with name '([^']*)' member number is '([^']*)'$/, async function (teamName, memberCount) {
	await TMSTeamListPage.isTeamMemberNumber(teamName, memberCount);
});

Then(/^.*team with name '([^']*)', colour '([^']*)' and  member number '([^']*)' is visible on the list$/, async function (teamName, teamColour, memberCount) {
	await TMSTeamListPage.isTeamOnList(teamName);
	await TMSTeamListPage.isTeamColour(teamName, teamColour);
	await TMSTeamListPage.isTeamMemberNumber(teamName, memberCount);
});

Then(
	/^.*team members: '([^']*)' are listed$/,  async function (listOfMembers) {
		await TMSTeamListPage.areMembersOnTheList(listOfMembers);
	}
);
