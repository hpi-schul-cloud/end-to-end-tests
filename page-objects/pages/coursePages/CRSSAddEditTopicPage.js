/*[url/courses]/[courseId]/topics/add] | [url/courses]/[courseId]/topics/edit]*/
'use strict';
const {CLIENT} = require("../../../shared-objects/servers");
const elementHelpers = require("../../../runtime/helpers/elementHelpers");
const waitHelpers = require("../../../runtime/helpers/waitHelpers");

const topicNameInput = ".form-group > .form-control";
const saveTopicBtn = ".btn.btn-primary.btn-submit";
const lernStoreUrl = `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`;
const textFieldSel = '.ck-content';
const textBtn = ".btn-group > button:nth-child(1)";
const topicName = "p.topic-label";
const editTopicButton = "a[title='Edit topic']";
//geoGebra:
const geogebraBtn = ".btn-group > button:nth-child(2)";
const titleInput = "input[placeholder='Titel des Abschnitts']";
const geoGebraIdInput = "input[placeholder^='GeoGebra']";
// material:
const materialBtn = ".btn-group > button:nth-child(3)";
const addMaterialBtn = ".btn.btn-secondary.btn-add";
const materialContainerSel = ".div.ajaxcontent > div";
const btnContainerMaterial = ".fa.fa-plus-square";
//etherpad:
const etherpadBtn = ".btn-group > button:nth-child(4)";
const etherpadNameField = "#content-blocks > div > div:nth-child(1) .form-control";
const etherpadDescriptionField = "div:nth-child(2) > textarea";

async function setTopic(topicname) {
	await waitHelpers.waitAndSetValue(topicNameInput, topicname);
}

async function clickSaveTopicButton() {
	await elementHelpers.clickAndWait(saveTopicBtn);
}

async function addText(text) {
	await elementHelpers.clickAndWait(textBtn);
	await waitHelpers.waitAndSetValue(textFieldSel, text);
}

async function addGeoGebra(geoGebraTitle, geogebraID) {
	await elementHelpers.clickAndWait(geogebraBtn);
	await waitHelpers.waitAndSetValue(titleInput, geoGebraTitle);
	await waitHelpers.waitAndSetValue(geoGebraIdInput, geogebraID);
}

async function addMaterial() {
	await elementHelpers.clickAndWait(materialBtn);
	await elementHelpers.click(addMaterialBtn);
	// window switch
	await driver.pause(9000);
	//await driver.switchWindow(lernStoreUrl);
	let browsers = await driver.getWindowHandles();
	await driver.switchWindow(browsers[1]);
	let materialContainer = await waitHelpers.waitUntilElementIsPresent(materialContainerSel);
	let btnContainer = await materialContainer.$(btnContainerMaterial);
	await btnContainer.clickAndWait();
}

async function addEtherpad(name, description) {
	await elementHelpers.clickAndWait(etherpadBtn);
	await waitHelpers.waitAndSetValue(etherpadNameField, name);
	await waitHelpers.waitAndSetValue(etherpadDescriptionField, description);
}

async function isTopicCreated(name) {
	expect(await elementHelpers.getElementText(topicName)).to.equal(name)
}

async function clickEditTopicButton() {
	await elementHelpers.clickAndWait(editTopicButton);
}

async function clickOnTopicWithName(name) {
	const courseIndex = await getIndexOfGivenTopic(name);
	if (courseIndex == -1) throw "Can't find course: " + name;
	const courseList = await getListOfTopic(name);
	let elem = courseList[courseIndex]
	// const element = courseList[courseIndex];
	await elementHelpers.clickAndWait(elem);
}

async function getIndexOfGivenTopic(courseName, section) {
	const listOfCourseTitlesForSection = await getListOfTopic(section);
	var index = listOfCourseTitlesForSection.indexOf(courseName);
	return index;
}

async function getListOfTopic(section) {
	await waitHelpers.waitUntilPageLoads();
	const selector = "#topic-list .card-header .topic-label";
	try {
		await waitHelpers.waitUntilElementIsVisible(selector);
	} catch (err) {
		return [];
	}
	const listOfCourseTitleElements = await driver.$$(selector);
	let courseTitleList = await elementHelpers.getTextListFromListOfElements(listOfCourseTitleElements);
	return courseTitleList;
}

async function getIndexOfTopic(topicName) {

}

module.exports = {
	setTopic,
	clickSaveTopicButton,
	addText,
	addGeoGebra,
	addMaterial,
	addEtherpad,
	isTopicCreated,
	clickEditTopicButton,
	clickOnTopicWithName,
}
