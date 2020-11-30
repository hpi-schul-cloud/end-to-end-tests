/*[url/teams/[teamId]/members]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');

const addAttendeeSubmitBtn = '.add-member-modal  button.btn-submit';

const addInternalAttendeesBtn = 'button.btn-add-member';
const multipleChoiceSelectForTeamAttendees = 'div.form-group.form-users > div';
const studentsList = '.active-result';

async function clickAddInternalAttendeesBtn() {
	await elementHelpers.clickAndWait(addInternalAttendeesBtn);
}

async function addTeamAttendee(lastname, firstname) {
	await elementHelpers.selectOptionByText(multipleChoiceSelectForTeamAttendees, lastname + ', ' + firstname);
}

async function clickSubmitAddTeamAttendeeBtn() {
	await elementHelpers.clickAndWait(addAttendeeSubmitBtn);
}

module.exports = {
	clickAddInternalAttendeesBtn,
	addTeamAttendee,
	clickSubmitAddTeamAttendeeBtn,
};
