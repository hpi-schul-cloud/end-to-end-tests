/*[url/teams/[teamId]/members]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');

const addAttendeeSubmitBtn = '.add-member-modal  button.btn-submit';

const tableOfUsersContainer = "tbody[data-testid='students_names_container']";
const tableOfUsers = 'tbody[data-testid="students_names_container"] > tr';
const firstNameCell = '[data-testid="students_names_container"] td:nth-child(1)';
const lastNameCell = '[data-testid="students_names_container"] td:nth-child(2)';

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

async function isStudentinTeamVisible(userFirstName, userLastName, expectedValue) {
		await waitHelpers.waitUntilElementIsVisible(tableOfUsers);
		let firstNames = await getUsersDetailsList(firstNameCell);
		let lastNameCells = await getUsersDetailsList(lastNameCell);
		let isUserExists = false;

		for (let index = 1; index <= lastNameCells.length; index++) {
			let FNamePromise = await driver.$(tableOfUsersContainer + '> tr:nth-child('+index+') > td:nth-child(1)');
			let LNamePromise = await driver.$(tableOfUsersContainer + '> tr:nth-child('+index+') > td:nth-child(2)');
			let FName = await FNamePromise.getText();
			let LName = await LNamePromise.getText();
			userFirstName === FName && userLastName === LName? isUserExists = true : '';
		}
		expect(isUserExists).to.equal(expectedValue);
}

module.exports = {
	clickAddInternalAttendeesBtn,
	addTeamAttendee,
	isStudentinTeamVisible,
	clickSubmitAddTeamAttendeeBtn,
};
