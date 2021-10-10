'use strict';

const TMSAddEditTeamPage = require('../../page-objects/pages/teamsPages/TMSAddEditTeamPage.js');
const TMSTeamListPage = require('../../page-objects/pages/teamsPages/TMSTeamListPage.js');
const TMSTeamMembersPage = require('../../page-objects/pages/teamsPages/TMSTeamMembersPage.js');

//WHEN
When(/^.*creates a new team with name '([^']*)' and description '([^']*)' and color '([^']*)'$/, (teamName, description, colour) => {
	TMSAddEditTeamPage.createTeamWithName(teamName, description, colour);
});

When(/^.*goes too the team member settings$/, async function () {
	TMSAddEditTeamPage.goToTeamMembersSettings();
});

When(/^.*adds a student with lastname: '([^']*)' and firstname: '([^']*)' to the team$/, (lastname, firstname) => {
	TMSTeamMembersPage.addTeamAttendee(lastname, firstname);
});

When(/^.*clicks Submit-add-team-member button$/, () => {
	 TMSTeamMembersPage.clickSubmitAddTeamAttendeeBtn();
});

When(/^.*clicks on Member icon in team with name '([^']*)'$/, (teamName) => {
	TMSTeamListPage.clickMemberIconInTeam(teamName);
});

//THEN
Then(/^.*team with name '([^']*)' is be visible on the list$/, (teamName) => {
	TMSTeamListPage.isTeamVisible(teamName, true);
});

Then(/^.*team with name '([^']*)' has colour '([^']*)'$/, (teamName, teamColour) => {
	TMSTeamListPage.isTeamColour(teamName, teamColour);
});

Then(/^.*team with name '([^']*)' member number is '([^']*)'$/, (teamName, memberCount) => {
	TMSTeamListPage.isTeamMemberNumber(teamName, memberCount);
});

Then(/^.*team with name '([^']*)', colour '([^']*)' and  member number '([^']*)' is visible on the list$/,(teamName, teamColour, memberCount) => {
	 TMSTeamListPage.isTeamVisible(teamName, true);
	 TMSTeamListPage.isTeamColour(teamName, teamColour);
	 TMSTeamListPage.isTeamMemberNumber(teamName, memberCount);
});

Then(/^.*team members: '([^']*)' are listed$/, (listOfMembers) => {
	TMSTeamListPage.areTeamMembersOnTheList(listOfMembers, true);
});

Then(/^.*team members: '([^']*)' are not listed$/,(listOfMembers) => {
	TMSTeamListPage.areTeamMembersOnTheList(listOfMembers, false);
});

Then(/^.* goes to Teams Page$/, () => {
	TMSTeamListPage.goToTeams();
});

When(/^.* chooses team with name '([^']*)'$/, (teamName) => {
	return TMSTeamListPage.clickOnChosenTeam(teamName);
});

Then(/^.* team with name '([^']*)' is visible on the list$/, (teamName) => {
	return TMSTeamListPage.isTeamVisible(teamName, true);
});

When(/^.* chooses team colour '([^']*)'$/, (teamColour) => {
	return TMSAddEditTeamPage.setTeamColour(teamColour);
});

Then(/^.* team name '([^']*)' with description correctly displayed '([^']*)'$/, (teamName, expectedDescription) => {
	TMSTeamListPage.isTeamDescription(teamName, expectedDescription);
});
