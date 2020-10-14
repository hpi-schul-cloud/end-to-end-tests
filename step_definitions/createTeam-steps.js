'use strict';

const TMSAddEditTeamPage = require('../page-objects/pages/teamsPages/TMSAddEditTeamPage.js');
const TMSTeamListPage = require('../page-objects/pages/teamsPages/TMSTeamListPage.js');
const TMSTeamMembersPage = require('../page-objects/pages/teamsPages/TMSTeamMembersPage.js');
let teamName;

When(/^.*creates a new team with name (.*) and color orange$/, function (teamname) {
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

Then(/^.*team should be displayed with the correct color$/, async function () {
	let colorIsOrange = await TMSTeamListPage.getTeamColor();
	await expect(colorIsOrange).to.be.true;
});

Then(/^the correct number of students in the team should be displayed$/, async function () {
	let numberIsCorrect = await TMSTeamListPage.getTeamMemberIcon(teamName);
	await expect(numberIsCorrect).to.be.true;
});

Then(
	/^by clicking the students icon the popup opens and shows all team members with surname and lastname$/,
	async function () {
		await TMSTeamListPage.openMemberIcon();
	}
);
