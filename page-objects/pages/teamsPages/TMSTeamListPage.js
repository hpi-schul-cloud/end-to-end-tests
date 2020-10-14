/*[url/teams]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const navigationLeftPage = require('../NavigationLeftPage');
const teamNameContainer = '.tasks .title';
const addTeamBtn = "[data-testid='add-team-btn']";
const teamColor = ".sc-card-header[style='background:#ffad42']";
const teamIcon = "a[aria-label='test team Teilnehmer 3']";
const member = '.btn-member[aria-label="test team Teilnehmer 3"]';

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

async function getTeamColor() {
	if (elementHelpers.isElementPresent(teamColor)) {
		return true;
	} else return false;
}

async function getTeamMemberIcon(teamname) {
	const teamMemberIcon = '.btn-member[' + teamname + ' Teilnehmer 3]';

	if (elementHelpers.isElementPresent(teamMemberIcon)) {
		return true;
	} else return false;
}

// assertion helper in steps:
async function getTeamNames() {
	await driver.pause(1000);

	await this.goToTeams();
	let container = await driver.$(namesContainer);
	let elements = await container.$$('div');
	const namePromises = elements.map(async (element) => await element.getText());
	const teamNames = await Promise.all(namePromises);
	return teamNames;
}

async function openMemberIcon() {
	await elementHelpers.click(teamIcon);
	// Test to check if it's really the selectors fault...
	//const test = driver.$(addTeamBtn);
	//await elementHelpers.clickAndWait(test);
}
module.exports = {
	goToTeams,
	goToAddTeam,
	isTeamOnList,
	getTeamColor,
	getTeamMemberIcon,
	openMemberIcon,
};
