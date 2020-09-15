/*[url/courses]/[courseId]/topics/add] | [url/courses]/[courseId]/topics/edit]*/
'use strict';
const {CLIENT} = require("../../../shared-objects/servers");
const waitHelpers = require("../../../runtime/helpers/waitHelpers.js");

const selectors = {
    topicName: ".form-group > .form-control",
	themaAnlegenButton: ".btn.btn-primary.btn-submit", 
	lernStoreUrl: `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`,
	textBtn: ".btn-group > button:nth-child(1)",
	textField: '.ck-content',
	// geoGebra:
	geogebraBtn: ".btn-group > button:nth-child(2)",
	idContainer: "#content-blocks",
	geoIdSelector: ".form-control",
	// etherpad
	etherpadBtn: ".btn-group > button:nth-child(4)",
	nameField: "#content-blocks > div > div:nth-child(1) .form-control",
	descriptionField: "div:nth-child(2) > textarea",
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
	    let idContainer = await driver.$(selectors.idContainer);
	    let geoIDSelector = await idContainer.$(selectors.geoIdSelector);
	    await geoIDSelector.setValue(geogebraID);
	    await driver.pause(500);
    },
    addEtherpad: async function (name, description) {
		await waitHelpers.waitAndClick(selectors.etherpadBtn);
		await waitHelpers.waitAndSetValue(selectors.nameField, name)
		await waitHelpers.waitAndSetValue(selectors.descriptionField, description)
	},
}
