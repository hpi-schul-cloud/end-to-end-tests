/*[url/courses]/[courseId]/topics/add] | [url/courses]/[courseId]/topics/edit]*/
'use strict';
const { CLIENT } = require("../../../shared-objects/servers");
const waitHelpers = require("../../../runtime/helpers/waitHelpers.js");

const topicName = ".form-group > .form-control";
const themaAnlegenButton = ".btn.btn-primary.btn-submit";
const lernStoreUrl = `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`;

module.exports = {
	setTopic: async function (topicname) {
		let nameSelector = await driver.$(topicName);
		await nameSelector.setValue(topicname);
		await driver.pause(500);
	},
	clickCreateTopicButton: async function () {
		await waitHelpers.waitAndClick(themaAnlegenButton);
	},
	addText: async function (text) {
		const textBtn = ".btn-group > button:nth-child(1)";
		await waitHelpers.waitAndClick(textBtn);
		const textField = await driver.$('.ck-content');
		await driver.pause(global.SHORT_WAIT_MILLIS);
		await textField.setValue(text);
	},

	addGeoGebra: async function (geogebraID) {
		let geogebraBtn = ".btn-group > button:nth-child(2)";
		await waitHelpers.waitAndClick(geogebraBtn);
		await driver.pause(100);
		let idContainer = await driver.$("#content-blocks");
		let geoIDSelector = await idContainer.$(".form-control");
		await geoIDSelector.setValue(geogebraID);
		await driver.pause(500);
	},

	addMaterial: async function () {
		let materialBtn = ".btn-group > button:nth-child(3)";
		await waitHelpers.waitAndClick(materialBtn);
		let currentBrowser = await driver.getWindowHandle();
		let addMaterialBtn = ".btn.btn-secondary.btn-add";
		await waitHelpers.waitAndClick(addMaterialBtn);
		// window switch
		await driver.pause(9000);
		//await driver.switchWindow(lernStoreUrl);
		let browsers = await driver.getWindowHandles();
		let currentBrowserAfterClickAdd = await driver.switchWindow(
			browsers[1]
		);
		let materialContainer = await driver.$(".div.ajaxcontent > div");

		let btnContainer = await materialContainer.$(".fa.fa-plus-square");
		await btnContainer.click();
		await driver.pause(1500);
	},
	addEtherpad: async function (name, description) {
		let etherpadBtn = ".btn-group > button:nth-child(4)";
		await waitHelpers.waitAndClick(etherpadBtn);
		let nameField = await driver.$(
			"#content-blocks > div > div:nth-child(1) .form-control"
		);
		await nameField.setValue(name);
		let descriptionField = await driver.$(
			"div:nth-child(2) > textarea"
		);
		await descriptionField.setValue(description);
	},
}
