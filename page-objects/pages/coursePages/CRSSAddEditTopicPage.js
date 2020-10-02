/*[url/courses]/[courseId]/topics/add] | [url/courses]/[courseId]/topics/edit]*/
'use strict';
const { CLIENT } = require("../../../shared-objects/servers");
const elementHelpers = require("../../../runtime/helpers/elementHelpers");

const topicName = ".form-group > .form-control";
const themaAnlegenButton = ".btn.btn-primary.btn-submit";
const lernStoreUrl = `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`;
const textFieldSel = '.ck-content';
const textBtn = ".btn-group > button:nth-child(1)";
const subtopicInputField = ".input-group .form-control";
//geoGebra:
const geogebraBtn = ".btn-group > button:nth-child(2)";
const idContainerSel = "#content-blocks";
// material:
const materialBtn = ".btn-group > button:nth-child(3)";
const addMaterialBtn = ".btn.btn-secondary.btn-add";
const materialContainerSel = ".div.ajaxcontent > div";
const btnContainerMaterial = ".fa.fa-plus-square";
//etherpad:
const etherpadBtn = ".btn-group > button:nth-child(4)";
const etherpadNameField = "#content-blocks > div > div:nth-child(1) .form-control";
const etherpadDescriptionField = "div:nth-child(2) > textarea";

module.exports = {
	setTopic: async function (topicname) {
		let nameSelector = await driver.$(topicName);
		await nameSelector.setValue(topicname);
		await driver.pause(500);
	},
	setSubtopicName: async function (subtopicName) {
		let subtopicInputField = await driver.$(subtopicInputField);
		await subtopicInputField.setText(subtopicName);
	},
	clickCreateTopicButton: async function () {
		await elementHelpers.click(themaAnlegenButton);
	},
	addText: async function (text) {
		await elementHelpers.click(textBtn);
		const textField = await driver.$(textFieldSel);
		await driver.pause(global.SHORT_WAIT_MILLIS);
		await textField.setValue(text);
	},

	addGeoGebra: async function (geogebraID) {
		await elementHelpers.click(geogebraBtn);
		await driver.pause(100);
		let idContainer = await driver.$(idContainerSel);
		let geoIDSelector = await idContainer.$(".form-control");
		await geoIDSelector.setValue(geogebraID);
		await driver.pause(500);
	},
	addMaterial: async function () {
		await elementHelpers.click(materialBtn);
		let currentBrowser = await driver.getWindowHandle();
		await elementHelpers.click(addMaterialBtn);
		// window switch
		await driver.pause(9000);
		//await driver.switchWindow(lernStoreUrl);
		let browsers = await driver.getWindowHandles();
		let currentBrowserAfterClickAdd = await driver.switchWindow(
			browsers[1]
		);
		let materialContainer = await driver.$(materialContainerSel);

		let btnContainer = await materialContainer.$(btnContainerMaterial);
		await btnContainer.click();
		await driver.pause(1500);
	},

	addEtherpad: async function (name, description) {
		await elementHelpers.click(etherpadBtn);
		let nameField = await driver.$(etherpadNameField);
		await nameField.setValue(name);
		let descriptionField = await driver.$(etherpadDescriptionField);
		await descriptionField.setValue(description);
	},
}
