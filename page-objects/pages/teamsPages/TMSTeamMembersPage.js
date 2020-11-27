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
	await elementHelpers.clickAndWait(multipleChoiceSelectForTeamAttendees);
	const listOfMembers = await driver.$$(studentsList);
	let fullName = lastname + ', ' + firstname;
	for(let i = 0 ; i < listOfMembers.length ; i++){
		let item = await listOfMembers[i].getText();
		if(fullName.includes(item)){
			await listOfMembers[i].click();
			break;
		}
	}
}

async function clickSubmitAddTeamAttendeeBtn() {
	await elementHelpers.clickAndWait(addAttendeeSubmitBtn);
}

module.exports = {
	clickAddInternalAttendeesBtn,
	addTeamAttendee,
	clickSubmitAddTeamAttendeeBtn,
};
