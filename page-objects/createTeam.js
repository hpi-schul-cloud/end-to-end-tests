'use strict';
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const teamData = require('../shared-objects/teamsData');

const multipleChoiceSelectForTeamMembers = '[data-testid="select_team_members_add"]';

module.exports = {
	goToTeams: async function() {
		let url = teamData.url;
		await elementHelpers.loadPage(url, 20);
	},
	addTeam: async function() {
		let url = teamData.addTeamURL;
		await elementHelpers.loadPage(url, 20);
		await driver.pause(2000);
	},
	setTeamName: async function(name) {
		let nameField = await driver.$(teamData.teamName);
		await nameField.setValue(name);
	},
	confirmTeamCreate: async function() {
		let confirmBtnContainer = await driver.$('.section-course');
		let confirmBtn = await confirmBtnContainer.$('button[type="submit"]');
		await confirmBtn.click();
	},
	//create Team with a certain name:
	createTeamSteps: async function(name) {
		await this.addTeam();
		await this.setTeamName(name);
		await this.confirmTeamCreate();
	},
	clickSettings: async function() {
		let settingsBtn = await driver.$(teamData.teamSettings);
		await settingsBtn.click();
	},
	clickAdministrateTeammembers: async function() {
		let administrateBtn = await driver.$(teamData.administrateTeamMembers);
		await administrateBtn.click();
	},
	clickAddInternamMembers: async function() {
		let addBtn =  await driver.$(teamData.addInternamMembers);
		await addBtn.click();
		await driver.pause(1500);
	},
	// function that should be called once (steps in browser):
	createTeamAndGoToSettings: async function(teamname) {
		await this.createTeamSteps(teamname);
		await this.clickSettings();
		await this.clickAdministrateTeammembers();
		await this.clickAddInternamMembers();

	},

	// add members to the team: steps in browser
	addTeamMembersSteps: async function(fullname) {
		await elementHelpers.selectOptionByText(multipleChoiceSelectForTeamMembers, fullname);
	},

	submitAddTeammemberAfterAllMemebersWereAdded: async function() {
		let containerBtn = await driver.$('.modal.fade.add-member-modal.in');
		let submitBtn = await containerBtn.$('button[type="submit"]');
		await submitBtn.click();
	},
	addTwoTeamMemebers: async function(teammember1, teammember2) {
		await this.addTeamMembersSteps(teammember1);
		await this.addTeamMembersSteps(teammember2);
		await this.submitAddTeammemberAfterAllMemebersWereAdded();
		await driver.pause(1500);
	},
	// assertion helper in steps:
	getTeamNames: async function() {
		let teamsPage = teamData.url;
		await elementHelpers.loadPage(teamsPage, 20);
		let container = await driver.$('.row.tasks.card-deck-row');
		let elements = await container.$$('div');
		const namePromises = elements.map(async element => await element.getText());
		const teamNames = await Promise.all(namePromises);
		return teamNames;
	},

}
