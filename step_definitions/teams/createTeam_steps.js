'use strict';

const TMSAddEditTeamPage = require('../../page-objects/pages/teamsPages/TMSAddEditTeamPage.js');
const TMSTeamListPage = require('../../page-objects/pages/teamsPages/TMSTeamListPage.js');
const TMSTeamMembersPage = require('../../page-objects/pages/teamsPages/TMSTeamMembersPage.js');

//WHEN
When(/^.*creates a new team with name '([^']*)' and description '([^']*)' and color '([^']*)'$/, async function (teamName, description, colour) {
	await TMSAddEditTeamPage.createTeamAndGoToInternalMembersManagement(teamName, description, colour);
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

//THEN
Then(/^.*team with name '([^']*)' is be visible on the list$/, async function (teamName) {
	await TMSTeamListPage.isTeamVisible(teamName, true);
});

Then(/^.*team with name '([^']*)' has colour '([^']*)'$/, async function (teamName, teamColour) {
	await TMSTeamListPage.isTeamColour(teamName, teamColour);
});

Then(/^.*team with name '([^']*)' member number is '([^']*)'$/, async function (teamName, memberCount) {
	await TMSTeamListPage.isTeamMemberNumber(teamName, memberCount);
});

Then(/^.*team with name '([^']*)', colour '([^']*)' and  member number '([^']*)' is visible on the list$/, async function (teamName, teamColour, memberCount) {
	await TMSTeamListPage.isTeamVisible(teamName, true);
	await TMSTeamListPage.isTeamColour(teamName, teamColour);
	await TMSTeamListPage.isTeamMemberNumber(teamName, memberCount);
});

Then(/^.*team members: '([^']*)' are listed$/,  async function (listOfMembers) {
	await TMSTeamListPage.areTeamMembersOnTheList(listOfMembers, true);
});

Then(/^.*team members: '([^']*)' are not listed$/,  async function (listOfMembers) {
	await TMSTeamListPage.areTeamMembersOnTheList(listOfMembers, false);
});

Then(/^.* goes to Teams Page$/, async function () {
	await TMSTeamListPage.goToTeams();
});

When(/^.* chooses team with name '([^']*)'$/, function (teamName) {
	return TMSTeamListPage.clickOnChosenTeam(teamName);
});

Then(/^.* team with name '([^']*)' is visible on the list$/, async function (teamName) {
	return TMSTeamListPage.isTeamVisible(teamName, true);
});

When(/^.* chooses team colour '([^']*)'$/, function (teamColour) {
	return TMSAddEditTeamPage.setTeamColour(teamColour);
});

Then(/^.* team name '([^']*)' with description correctly displayed '([^']*)'$/, async function (
	teamName,
	expectedDescription
) {
	await TMSTeamListPage.isTeamDescription(teamName, expectedDescription);
});
