/*[url/teams/[teamId]/members]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const { CLIENT } = require("../../../shared-objects/servers");

const containerBtn = '.modal.fade.add-member-modal.in';
const submitBtn = 'button[type="submit"]';

// team members buttons
const addInternalMembers = 'button[data-testid="internal_team_members"]';
/*data testid needs to be created
const addExternalMembers = 'button[data-testid="needs_to_be_created"]';*/

// team members internal options
const multipleChoiceSelectForTeamMembers = '[data-testid="select_team_members_add"]';
const selectTeamMembers = 'select[data-testid="select_team_members_add"]';


module.exports = {
	clickAddInternalMembers: async function () {
		let addBtn = await driver.$(addInternalMembers);
		await addBtn.click();
		await driver.pause(1500);
	},
	// add members to the team: steps in browser
	addTeamMember: async function (lastname, firstname) {
		await elementHelpers.selectOptionByText(multipleChoiceSelectForTeamMembers, lastname +", " + firstname);
	},
	
	clickSubmitAddTeamMember: async function () {
		let containerBtnElement = await driver.$(containerBtn);
		let submitBtnElement = await containerBtnElement.$(submitBtn);
		await submitBtnElement.click();
	},
}
