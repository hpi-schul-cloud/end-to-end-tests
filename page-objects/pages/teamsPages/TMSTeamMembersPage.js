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
	await driver.pause(3000);
	await waitHelpers.waitUntilPageLoads();
	await elementHelpers.selectOptionsByText(multipleChoiceSelectForTeamAttendees, `${firstname} ${lastname}`);
}

async function clickSubmitAddTeamAttendeeBtn() {
	await elementHelpers.clickAndWait(addAttendeeSubmitBtn);
	await waitHelpers.waitUntilPageLoads();
}

module.exports = {
	clickAddInternalAttendeesBtn,
	addTeamAttendee,
	clickSubmitAddTeamAttendeeBtn,
};
