/*[url/courses]/[courseId]/topics/add] | [url/courses]/[courseId]/topics/edit]*/
'use strict';
const {CLIENT} = require("../../../shared-objects/servers");
const waitHelpers = require("../../../runtime/helpers/waitHelpers.js");

const selectors = {
    topicName: ".form-group > .form-control",
	themaAnlegenButton: ".btn.btn-primary.btn-submit", 
	lernStoreUrl: `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`,
	textField: '.ck-content',
	textBtn: ".btn-group > button:nth-child(1)",
	//geoGebra:
	geogebraBtn: ".btn-group > button:nth-child(2)",
	idContainer: "#content-blocks",
	// material:
	materialBtn: ".btn-group > button:nth-child(3)",
	addMaterialBtn: ".btn.btn-secondary.btn-add",
	materialContainer: ".div.ajaxcontent > div",
	btnContainerMaterial: ".fa.fa-plus-square",
	//etherpad:
	etherpadBtn: ".btn-group > button:nth-child(4)",
	etherpadNameField: "#content-blocks > div > div:nth-child(1) .form-control",
	etherpadDescriptionField: "div:nth-child(2) > textarea",

};

module.exports = {
    setTopic: async function (topicname) {
        let nameSelector = await driver.$(selectors.topicName);
         await nameSelector.setValue(topicname);
        await driver.pause(500);
    },
    clickCreateTopicButton: async function() {
        await waitHelpers.waitAndClick(selectors.themaAnlegenButton);
    },
    addText: async function(text) {
	    await waitHelpers.waitAndClick(selectors.textBtn);
	    const textField = await driver.$(selectors.textField);
	    await driver.pause(global.SHORT_WAIT_MILLIS);
	    await textField.setValue(text);
    },

    addGeoGebra: async function (geogebraID) {
	    await waitHelpers.waitAndClick(selectors.geogebraBtn);
	    await driver.pause(100);
	    let idContainer = await driver.$(selectors.idContainer);
	    let geoIDSelector = await idContainer.$(".form-control");
	    await geoIDSelector.setValue(geogebraID);
	    await driver.pause(500);
    },
    
    addMaterial: async function () {
		await waitHelpers.waitAndClick(selectors.materialBtn);
		let currentBrowser = await driver.getWindowHandle();
		await waitHelpers.waitAndClick(selectors.addMaterialBtn);
		// window switch
		await driver.pause(9000);
		//await driver.switchWindow(selectors.lernStoreUrl);
		let browsers = await driver.getWindowHandles();
		let currentBrowserAfterClickAdd = await driver.switchWindow(
			browsers[1]
		);
		let materialContainer = await driver.$(selectors.materialContainer);

		let btnContainer = await materialContainer.$(selectors.btnContainerMaterial);
		await btnContainer.click();
		await driver.pause(1500);
    },
    addEtherpad: async function (name, description) {
		await waitHelpers.waitAndClick(selectors.etherpadBtn);
		let nameField = await driver.$(
			selectors.etherpadNameField
		);
		await nameField.setValue(name);
		let descriptionField = await driver.$(
			selectors.etherpadDescriptionField
		);
		await descriptionField.setValue(description);
	},
}
