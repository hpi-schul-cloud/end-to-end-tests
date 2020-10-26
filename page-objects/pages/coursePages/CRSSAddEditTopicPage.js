/*[url/courses]/[courseId]/topics/add] | [url/courses]/[courseId]/topics/edit]*/
'use strict';
const {CLIENT} = require("../../../shared-objects/servers");
const elementHelpers = require("../../../runtime/helpers/elementHelpers");
const waitHelpers = require("../../../runtime/helpers/waitHelpers");

const topicNameInput = ".form-group > .form-control";
const createTopicBtn = ".btn.btn-primary.btn-submit";
const lernStoreUrl = `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`;
const textFieldSel = '.card .ck-content';
const textFieldValueSel = '.card .ck-content p';
const contentTitleSelector = '.card .card-header .form-control';
const textBtn = ".btn-group > button:nth-child(1)";
const topicSelector = '#topic-list .card';
const sectionTopicTitleSelector = '.section-title #page-title';
const topicSuccessTextSelector = '.first-topic-success';
const pencilBtnSelector = ".fa-pencil";
const blankContentTitleSel = '.card input[placeholder][value=""]';
const contentTitleValue = '.section-course .content-block .h4';
const textValue = '.section-course .content-block .row';
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


async function setTopic(topicName) {
	await waitHelpers.waitAndSetValue(topicNameInput, topicName);
}

async function clickCreateTopicButton() {
	await elementHelpers.clickAndWait(createTopicBtn);
}

async function addText(contentTitle, text) {
	await elementHelpers.clickAndWait(textBtn);
	await waitHelpers.waitUntilElementIsPresent(blankContentTitleSel);
	await waitHelpers.waitAndSetValue(contentTitleSelector, contentTitle);
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
	await driver.pause(9000);
	await driver.switchWindow(lernStoreUrl);
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

async function isTopicOnTopicList(name) {
	const listOfTopicTitles = await topicTitleList();
	const msg = 'Topic with name [' + name + '] is not visible on the list \n';
	const resultMsg = ', List of task titles: ' + listOfTopicTitles;
	expect(listOfTopicTitles, msg + resultMsg).to.include(name);
}

async function isTopicNotOnTopicList(name) {
	const listOfTopicTitles = await topicTitleList();
	const msg = 'Topic with name [' + name + '] is visible on the list \n';
	const resultMsg = ', List of task titles: ' + listOfTopicTitles;
	expect(listOfTopicTitles, msg + resultMsg).to.not.include(name);
}

async function isItTheFirstTopicAdded() {
	if (await topicTitleList().length === 1) {
		await waitHelpers.waitUntilElementIsVisible(topicSuccessTextSelector);
	}
}

async function clickOnTopicWithName(name) {
	let listOfTopicElements = await elementHelpers.getListOfAllElements(topicSelector)
	let listOfTopic = await elementHelpers.getTextFromAllElements(topicSelector);
	await elementHelpers.clickAndWait(listOfTopicElements[listOfTopic.indexOf(name)]);
}

async function isTopicTitleVisible(name) {
	const listOfTopicTitles = await elementHelpers.getTextFromAllElements(sectionTopicTitleSelector);
	const msg = 'Topic with name [' + name + '] is not visible on the topic page \n';
	const resultMsg = ', List of topics titles: ' + listOfTopicTitles;
	expect(listOfTopicTitles, msg + resultMsg).to.include(name);
}

async function topicTitleList() {
	return elementHelpers.getTextFromAllElements(topicSelector);
}

async function clickOnTopicEditPencilButton(name) {
	let listOfTopicElements = await elementHelpers.getListOfAllElements(topicSelector);
	let topicTitleList = await elementHelpers.getTextFromAllElements(topicSelector);
	await elementHelpers.clickAndWait(listOfTopicElements[topicTitleList.indexOf(name)].$(pencilBtnSelector));
}

async function isContentTopicTitleVisible(contentTitle) {
	const listOfContentsTopicTitles = await elementHelpers.getTextFromAllElements(contentTitleValue);
	const msg = 'Topic with content title [' + contentTitle + '] is not visible on the topic page \n';
	const resultMsg = ', List of content topics titles: ' + listOfContentsTopicTitles;
	expect(listOfContentsTopicTitles, msg + resultMsg).to.include(contentTitle);
}

async function isTopicDescriptionVisible(description) {
	const listOfTopicDescriptions = await elementHelpers.getTextFromAllElements(textValue);
	const msg = 'Topic with description [' + description + '] is not visible on the topic page \n';
	const resultMsg = ', List of descriptions: ' + listOfTopicDescriptions;
	expect(listOfTopicDescriptions, msg + resultMsg).to.include(description);
}

async function setContentByTitle(contentTitle, changeContentTitle) {
	const contentTitleValueSel = '.card input[placeholder][value="' + contentTitle + '"]';
	await waitHelpers.waitAndSetValue(contentTitleValueSel, changeContentTitle);
}

async function setDescription(changeDescription) {
	const contentDescription = await waitHelpers.waitUntilElementIsEnabled(textFieldValueSel);
	await contentDescription.clearValue();
	await waitHelpers.waitAndSetValue(textFieldSel, changeDescription);
}

module.exports = {
	setTopic,
	clickCreateTopicButton,
	addText,
	addGeoGebra,
	addMaterial,
	addEtherpad,
	isTopicOnTopicList,
	isTopicNotOnTopicList,
	isItTheFirstTopicAdded,
	clickOnTopicWithName,
	isTopicTitleVisible,
	clickOnTopicEditPencilButton,
	isContentTopicTitleVisible,
	isTopicDescriptionVisible,
	setContentByTitle,
	setDescription,
}
