/*[url/teams/[teamId]/members]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');

const addAttendeeSubmitBtn = '.add-member-modal  button.btn-submit';

const addInternalAttendeesBtn = 'button.btn-add-member';
const multipleChoiceSelectForTeamAttendees = '[data-testid="select_team_members_add"]';

async function clickAddInternalAttendeesBtn() {
	await elementHelpers.clickAndWait(addInternalAttendeesBtn);
}

async function addTeamAttendee(lastname, firstname) {
	await elementHelpers.selectOptionByText(multipleChoiceSelectForTeamAttendees, lastname + ', ' + firstname);
}

async function clickSubmitAddTeamAttendeeBtn() {
	await elementHelpers.clickAndWait(addAttendeeSubmitBtn);
}

async function getUsersDetailsList(whichCell) {
	let names = await elementHelpers.getTextFromAllElements(whichCell);
	return names;
}

module.exports = {
	clickAddInternalAttendeesBtn,
	addTeamAttendee,
	clickSubmitAddTeamAttendeeBtn,
};
