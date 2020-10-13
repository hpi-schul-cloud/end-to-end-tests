/*[url/teams]*/
'use strict';

const elementHelpers= require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const navigationLeftPage = require('../NavigationLeftPage');
const teamNameContainer = '.tasks .title';
const addTeamBtn = "[data-testid='add-team-btn']";

async function goToTeams() {
	return navigationLeftPage.clickNavItemTeams();
}

async function goToAddTeam() {
	await goToTeams();
	await elementHelpers.clickAndWait(addTeamBtn);
}

async function getListOfTeamNames() {
	await waitHelpers.waitUntilAjaxIsFinished();
	await goToTeams();
	const selector = teamNameContainer;
	try {
		await waitHelpers.waitUntilElementIsVisible(selector);
	} catch (err) {
		return [];
	}
	const listOfTitleElements = await driver.$$(selector);
	const titleList = await elementHelpers.getTextListFromListOfElements(listOfTitleElements);
	return titleList;
}

async function isTeamOnList(teamName) {
	const listOfTeamNames = await getListOfTeamNames();
	const msg = "Team with name: '" + teamName + "' is not visible on the list \n";
	const resultMsg = 'Expected: ' + teamName + ', Actual: ' + listOfTeamNames;
	expect(listOfTeamNames, msg + resultMsg).to.include(teamName);
}

module.exports = {
	goToTeams,
	goToAddTeam,
	isTeamOnList,
}
