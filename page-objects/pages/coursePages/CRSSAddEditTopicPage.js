/*[url/courses]/[courseId]/topics/add] | [url/courses]/[courseId]/topics/edit]*/
'use strict';
const {CLIENT} = require("../../../shared-objects/servers");
const elementHelpers = require("../../../runtime/helpers/elementHelpers");
const waitHelpers = require("../../../runtime/helpers/waitHelpers");

const topicNameInput = ".form-group > .form-control";
const createTopicBtn = ".btn.btn-primary.btn-submit";
const saveChangesBtn = createTopicBtn;
const lernStoreUrl = `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`;

const contentTitleSelector = '.card .card-header .form-control';
const topicSelector = '#topic-list .card';
const topicTitleSel = '.section-title #page-title';
const topicSuccessTextSelector = '.first-topic-success';
const pencilBtnSelector = ".fa-pencil";
const blankContentTitleSel = '.card input[placeholder][value=""]';
const contentTitleValue = '.section-course .content-block .h4';
const textValue = '.section-course .content-block .row';

const textField = ".ck-content[role='textbox']";
const geogebraMaterialIdField = "input[name*='[materialId]']";
const etherpadDescriptionField = "textarea[name*='[description]']";
const taskUrlField =  ":not([type='hidden'])[name*='[url]']";

//geoGebra:
const geoGebraIdInput = "input[placeholder^='GeoGebra']";

// material:
const secondaryAddMaterialBtn = ".btn.btn-secondary.btn-add";
const materialContainerSel = ".div.ajaxcontent > div";
const btnContainerMaterial = ".fa.fa-plus-square";
//etherpad:
//lernstore
const btnAttachLernstoreMaterial = "#content-blocks .btn-secondary.btn-add";
const lernstoreBtn = ".btn-group > button:nth-child(3)";
const selectorIDContainer = "#content-blocks";

const content = {
	text: ".btn-group > button:nth-child(1)",
	geoGebra: ".btn-group > button:nth-child(2)",
	learningMaterial: ".btn-group > button:nth-child(3)",
	etherpad: ".btn-group > button:nth-child(4)",
	task: ".btn-group > button:nth-child(5)",
};

function getContentSelector(contentName) {
	let btnSel = '';
	switch (contentName.toLowerCase()) {
		case 'text':
			btnSel = content.text;
			break;
		case 'geogebra': case 'geogebra worksheet': case ' geogebra arbeitsblatt':
			btnSel = content.geoGebra;
			break;
		case 'material': case 'learning material': case 'lern-material':
			btnSel = content.learningMaterial;
			break;
		case 'etherpad':
			btnSel = content.etherpad;
			break;
		case 'task': case 'aufgabe':
			btnSel = content.task;
			break;
		default:
			console.error(`This content: ${contentName} does not exist on the list of possible choices`);
			break;
	}
	return btnSel;
};

async function setTopicName(topicName) {
	await waitHelpers.waitAndSetValue(topicNameInput, topicName);
}

async function clickSaveChanges() {
	await elementHelpers.clickAndWait(saveChangesBtn);
}

async function clickCreateTopicButton() {
	await elementHelpers.clickAndWait(createTopicBtn);
}

async function clickAddContent(contentName) {
	const content = getContentSelector(contentName);
	await elementHelpers.clickAndWait(content);
}

async function clickSecondaryAddContentLearningMaterial() {
	await elementHelpers.clickAndWait(secondaryAddMaterialBtn);
}

async function clickOnTopicWithName(name) {
	let listOfTopicElements = await elementHelpers.getListOfAllElements(topicSelector)
	let listOfTopic = await elementHelpers.getTextFromAllElements(topicSelector);
	await elementHelpers.clickAndWait(listOfTopicElements[listOfTopic.indexOf(name)]);
}

async function setContentTitle(contentTitle) {
	await waitHelpers.waitAndSetValue(contentTitleSelector, contentTitle);
}

async function setContentText(contentText) {
	await waitHelpers.waitAndSetValue(textField, contentText);
}

async function setGeogebraId(geogebraMaterialID) {
	await waitHelpers.waitAndSetValue(geogebraMaterialIdField, geogebraMaterialID);
}

async function setEtherpadDescription(etherpadDescription) {
	await waitHelpers.waitAndSetValue(etherpadDescriptionField, etherpadDescription);
}

async function setTaskUrl(taskUrl) {
	await waitHelpers.waitAndSetValue(taskUrlField, taskUrl);
}

async function openLearningStoreAndAddMaterial() {
	await clickSecondaryAddContentLearningMaterial();
	await driver.pause(9000);
	await driver.switchWindow(lernStoreUrl);
	let browsers = await driver.getWindowHandles();
	await driver.switchWindow(browsers[1]);
	let materialContainer = await waitHelpers.waitUntilElementIsPresent(materialContainerSel);
	let btnContainer = await materialContainer.$(btnContainerMaterial);
	await btnContainer.clickAndWait();
}

async function addText(contentTitle, contentDescription) {
	await clickAddContent("Text");
	await waitHelpers.waitUntilElementIsPresent(blankContentTitleSel);
	await setContentTitle(contentTitle);
	await setContentText(contentDescription);
}

async function addGeoGebra(contentTitle, geogebraID) {
	await clickAddContent("GeoGebra");
	await waitHelpers.waitUntilElementIsPresent(blankContentTitleSel);
	await setContentTitle(contentTitle);
	await setGeogebraId(geogebraID);
}

async function addMaterial() {
	await clickAddContent("Material");
	await waitHelpers.waitUntilElementIsPresent(blankContentTitleSel);
	await openLearningStoreAndAddMaterial();
}

async function addEtherpad(contentTitle, description) {
	await clickAddContent("Etherpad");
	await waitHelpers.waitUntilElementIsPresent(blankContentTitleSel);
	await setContentTitle(contentTitle)
	await setEtherpadDescription(description);
}

async function isFirstTopicAdded() {
	if (await getTopicTitleList().length === 1) {
		await waitHelpers.waitUntilElementIsVisible(topicSuccessTextSelector);
	}
}

async function getTopicTitleList() {
	return elementHelpers.getTextFromAllElements(topicSelector);
}

async function clickOnTopicEditPencilButton(name) {
	let listOfTopicElements = await elementHelpers.getListOfAllElements(topicSelector);
	let topicTitleList = await getTopicTitleList();
	await elementHelpers.clickAndWait(listOfTopicElements[topicTitleList.indexOf(name)].$(pencilBtnSelector));
}

async function isContentWithTitleVisibleOnTheList(contentTitle) {
	const listOfContentsTopicTitles = await elementHelpers.getTextFromAllElements(contentTitleValue);
	const msg = 'Topic with content title [' + contentTitle + '] is not visible on the topic page \n';
	const resultMsg = 'List of content topics titles: ' + listOfContentsTopicTitles;
	expect(listOfContentsTopicTitles, msg + resultMsg).to.include(contentTitle);
}

async function isTopicOnTheList(topicName, expectedValue = true) {
	const allTopics = await getTopicTitleList();
    const isTopicOnList = allTopics.some((element) => element.includes(topicName));
    const fillString = !expectedValue ? 'not' : '';
	const msg = "Topic with name is "+ fillString +" visible on the list: \n";
	const resultMsg = 'Actual list of topisc: ' + allTopics;
	await expect(isTopicOnList, msg + resultMsg).to.equal(expectedValue);
}


async function isCorrectTopicTitle(title) {
	const actualTopicTitle = await elementHelpers.getElementText(topicTitleSel);
	const msg = 'Topic name is incorrect\n';
	const resultMsg = 'Expected: ' + title + '\n  Actual: ' + actualTopicTitle;
	expect(actualTopicTitle, msg + resultMsg).to.include(title);
}

async function isContentDescriptionVisibleOnTheList(description) {
	const listOfTopicDescriptions = await elementHelpers.getTextFromAllElements(textValue);
	const msg = 'Topic with description [' + description + '] is not visible on the topic page \n';
	const resultMsg = 'List of descriptions: ' + listOfTopicDescriptions;
	expect(listOfTopicDescriptions, msg + resultMsg).to.include(description);
}

async function setNewContentTitle(contentTitle, newContentTitle) {
	const contentTitleValueSel = '.card input[placeholder][value="' + contentTitle + '"]';
	await waitHelpers.waitAndSetValue(contentTitleValueSel, newContentTitle);
}

async function setNewContentText(text, newText) {
	const contentDescription = await waitHelpers.waitUntilElementIsEnabled('//p[contains(text(),"'+ text +'")]');
	await contentDescription.clearValue();
	await contentDescription.click();
	await driver.keys(newText);
}

async function addLernstoreMaterial (name) {
	await elementHelpers.click(lernstoreBtn);
	let idContainer = await driver.$(selectorIDContainer);
	let lernstoreSelector = await idContainer.$(".form-control");
	await lernstoreSelector.setValue(name);
	await elementHelpers.clickAndWait(btnAttachLernstoreMaterial);
	await elementHelpers.click(btnAttachLernstoreMaterial);
}

module.exports = {
	setTopicName,
	clickSaveChanges,
	clickAddContent,
	clickOnTopicWithName,
	clickOnTopicEditPencilButton,
	clickCreateTopicButton,
	addText,
	addGeoGebra,
	addMaterial,
	addEtherpad,
	isTopicOnTheList,
	isFirstTopicAdded,
	isCorrectTopicTitle,
	isContentWithTitleVisibleOnTheList,
	isContentDescriptionVisibleOnTheList,
	setNewContentTitle,
	setNewContentText,
	addLernstoreMaterial,
}
