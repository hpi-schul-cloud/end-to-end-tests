/*[url/teams/[teamId]/members]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const selectors = {
	multipleChoiceSelectForTeamMembers = '[data-testid="select_team_members_add"]',
	addInternalMembers: 'button[data-testid="internal_team_members"]',
	//addExternalMembers: 'button[data-testid="needs_to_be_created"]',
	selectTeamMembers: 'select[data-testid="select_team_members_add"]',
	containerBtn: '.modal.fade.add-member-modal.in', 
	submitBtn: 'button[type="submit"]',



}


module.exports = {
	clickAddInternalMembers: async function () {
		let addBtn = await driver.$(selectors.addInternalMembers);
		await addBtn.click();
		await driver.pause(1500);
	},
	// add members to the team: steps in browser
	addTeamMembersSteps: async function (fullname) {
		return elementHelpers.selectOptionByText(selectors.multipleChoiceSelectForTeamMembers, fullname);
	},
	addTwoTeamMemebers: async function (teammember1, teammember2) {
		await this.addTeamMembersSteps(teammember1);
		await this.addTeamMembersSteps(teammember2);
		await this.submitAddTeammemberAfterAllMemebersWereAdded();
		await driver.pause(1500);
	},
	submitAddTeammemberAfterAllMemebersWereAdded: async function () {
		let containerBtn = await driver.$(selectors.containerBtn);
		let submitBtn = await containerBtn.$(selectors.submitBtn);
		await submitBtn.click();
	},
}
