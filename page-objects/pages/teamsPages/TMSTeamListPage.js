/*[url/teams]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const navigationLeftPage = require('../NavigationLeftPage');
const teamNameContainer = '.tasks .title';
const addTeamBtn = "[data-testid='add-team-btn']";
const addTeamWhenZeroTeamsBtn = 'a.btn-add';
const teamWrapper = '.section-teams .sc-card-wrapper';
const teamTitleSel = '.title';
const memberBtn = '.btn-member';
const popupMembers = ".member-modal.in[role='dialog']";
const listOfMembersSel = '#member-modal-body > ol > li';
const teamHeader = '.sc-card-header';
const teamDescription = '.ckcontent';

const teamColourCSS = {
	orangeColour: 'background:#FFAD42',
	blueColour: 'background:#1976D2',
	greenColour: 'background:#2E7D32',
	yellowColour: 'background:#FFD95A',
};

function getColourCSS(colour) {
	let colourItem = '';
	switch (colour) {
		case 'orange':
			colourItem = teamColourCSS.orangeColour;
			break;
		case 'blue':
			colourItem = teamColourCSS.blueColour;
			break;
		case 'green':
			colourItem = teamColourCSS.greenColour;
			break;
		case 'yellow':
			colourItem = teamColourCSS.yellowColour;
			break;
		default:
			console.error(`This color: ${colour} does not exist on the list of possible choices`);
			break;
	}
	return colourItem;
}

async function goToTeams() {
	await waitHelpers.waitUntilPageLoads();
	return navigationLeftPage.clickNavItemTeams();
}

async function clickAddTeamBtn() {
	try {
		await elementHelpers.clickAndWait(addTeamBtn);
	} catch (e) {
		await elementHelpers.clickAndWait(addTeamWhenZeroTeamsBtn);
	}
}

async function getListOfTeamNames() {
	await waitHelpers.waitUntilPageLoads();
	await goToTeams();
	return elementHelpers.getTextFromAllElements(teamNameContainer);
}

async function getTeamMemberIcon(teamname) {
	const teamMemberIcon = '.btn-member[' + teamname + ' Teilnehmer 3]';

	if (elementHelpers.isElementPresent(teamMemberIcon)) {
		return true;
	} else return false;
}

async function getTeamWithName(teamName) {
	let index = await getTeamIndex(teamName);
	const list = await getListOfTeams();
	const element = list[index];
	const headerContainer = await element.$(teamHeader);
	const descriptionContainer = await element.$(teamDescription);
	const membersContainer = await element.$(memberBtn);
	return {
		teamName: await headerContainer.getText(),
		teamDescription: await descriptionContainer.getText(),
		teamColour: (await headerContainer.getCSSProperty('background-color')).parsed.hex.toUpperCase(),
		teamMembersCount: await membersContainer.getText(),
	};
}

async function isTeamDescription(teamName, expectedDescription) {
	const team = await getTeamWithName(teamName);
	const actualDescription = team.teamDescription;
	const msg = `Team with name: ${teamName} has wrong description. \n`;
	const resultMsg = `Expected: ${expectedDescription} , Actual: ${actualDescription}`;
	expect(expectedDescription, msg + resultMsg).to.include(actualDescription);
}

async function isTeamColour(teamName, expectedColour) {
	const team = await getTeamWithName(teamName);
	const actualColourNumber = team.teamColour;
	const expectedColourNumber = getColourCSS(expectedColour);
	const msg = `Team with name: ${teamName} has wrong colour. \n`;
	const resultMsg = `Expected: ${expectedColour} , Actual: ${actualColourNumber}`;
	expect(expectedColourNumber, msg + resultMsg).to.include(actualColourNumber);
}

async function isTeamMemberNumber(teamName, expectedNumber) {
	const team = await getTeamWithName(teamName);
	const actualNum = team.teamMembersCount;
	const msg = `Team with name: ${teamName} has wrong member number. \n`;
	const resultMsg = `Expected: ${expectedNumber} , Actual: ${actualNum}`;
	expect(expectedNumber, msg + resultMsg).to.include(actualNum);
}

async function getListOfTeams() {
	return elementHelpers.getListOfAllElements(teamWrapper);
}

async function getListOfTeamTitles() {
	return elementHelpers.getTextFromAllElements(teamWrapper + ' ' + teamTitleSel);
}

async function getTeamIndex(teamName) {
	const listOfTeamTitlesForSection = await getListOfTeamTitles();
	var index = listOfTeamTitlesForSection.indexOf(teamName);
	return index;
}

async function getWrapperOfTeam(teamName) {
	var index = await getTeamIndex(teamName);
	const list = await getListOfTeams();
	const errorMsg = `Can't find team: ${teamName} \n`;
	const resultMsg = `Actual list of teams: ${list}`;
	if (index == -1) throw errorMsg + resultMsg;
	const element = list[index];
	return element;
}
async function getListOfTeamMembers() {
	await waitHelpers.waitUntilElementIsVisible(popupMembers);
	return elementHelpers.getTextFromAllElements(listOfMembersSel);
}

async function areTeamMembersOnTheList(listOfMembers, expectedResult) {
	let actualListOfTeamMembers = await getListOfTeamMembers();
	listOfMembers = listOfMembers.split(',');
	const msg = `Members: ${actualListOfTeamMembers} should be visible on the list \n`;
	const resultMsg = `Actual list of team members: ${actualListOfTeamMembers}`;
	expectedResult
		? expect(actualListOfTeamMembers, msg + resultMsg).to.have.members(listOfMembers)
		: expect(actualListOfTeamMembers, msg + resultMsg).to.not.have.members(listOfMembers);
}

async function clickMemberIconInTeam(teamName) {
	const teamWrapper = await getWrapperOfTeam(teamName);
	let pupilIcon = await teamWrapper.$(memberBtn);
	await elementHelpers.clickAndWait(pupilIcon);
}

async function clickOnChosenTeam(teamName) {
	const element = await getWrapperOfTeam(teamName);
	await elementHelpers.clickAndWait(element);
}

async function isTeamVisible(teamName, expectedValue) {
	const defaultString = `Team with name: ${teamName}`;

	const msg = expectedValue
		? `${defaultString} should be visible on the list`
		: `${defaultString} should not be visible on the list`;

	const resultMsg = 'Actual list of teams: ' + (await getListOfTeamTitles());
	const isTeam = await isTeamOnList(teamName);
	expect(isTeam, msg + resultMsg).to.equal(expectedValue);
}

async function isTeamOnList(teamName) {
	const allTeams = await getListOfTeamTitles();
	return allTeams.includes(teamName);
}

module.exports = {
	clickMemberIconInTeam,
	clickOnChosenTeam,
	goToTeams,
	clickAddTeamBtn,
	isTeamColour,
	isTeamDescription,
	isTeamMemberNumber,
	isTeamVisible,
	areTeamMembersOnTheList,
	getTeamMemberIcon,
};
