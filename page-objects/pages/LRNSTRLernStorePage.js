/*[url/content]*/
'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');
const apiHelpers = require('../../runtime/helpers/APIhelpers');
const stringHelpers= require('../../runtime/helpers/stringHelpers');
const {CLIENT} = require("../../shared-objects/servers");
const url= `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`;


const selectors = {
    searchField: ".input-active.search__container > input",
    searchIcon: ".search__container--icon",
    contentContainer: ".content__container",
    contentContainer2: ".grid",
    numberOfContentOnGUI: ".content__total",
    firstElement: "div.content__container > div > section:nth-child(1)",
    titleOfMaterialWhenClicked: ".content-container > .title",
    addContentBtn:  ".user-has-role.floating-buttons > div > button",
    inputCourseNameWhenAddingMaterial: ".base-modal-wrapper",
    inputTopicNameWhenAddingMaterial: ".content-modal__body > div:nth-child(2) .multiselect.input.mb-0",

}
module.exports= {
    selectors, 
    switchToContentWindow: async function() {
        let handle = await driver.getWindowHandles();
        await driver.switchToWindow(handle[1]);

    },
    wasRedirectedToContentPage: async function() {
        await waitHelpers.waitUntilUrlContains(url);
    },
    insertSearchRequest: async function(content) {
        await waitHelpers.waitAndSetValue(selectors.searchField, content);
        await waitHelpers.waitAndClick(selectors.searchIcon);
    
    },
    rightNumberOfFoundContentDisplayed: async function(request) {
        let selectorTotalNum = await driver.$(selectors.numberOfContentOnGUI);
        let displayedString= await selectorTotalNum.getText();
        let displayedNum = await stringHelpers.cutStringAfterSymbol(displayedString, ' ');
        let apiResponse = await apiHelpers.getLernstoreMaterialsAfterRequest(request);
        await expect(`${apiResponse}`).to.equal(displayedNum);
    },
    clickOnContentCard: async function(request) {
        await waitHelpers.waitAndClick(selectors.firstElement);
        let titleOnGUISelector = await driver.$(selectors.titleOfMaterialWhenClicked);
        let titleOnGUI = await titleOnGUISelector.getText();
        let titleOnAPIRequest = await apiHelpers.getTheFirstElementNamePerRESTRequest(request);
        await expect(titleOnGUI).to.equal(titleOnAPIRequest);
    },
    clickAddContentBtn: async function() {
        await waitHelpers.waitAndClick(selectors.addContentBtn);
    },
    addToCourse: async function(course) {
        await waitHelpers.waitAndSetValue(selectors.inputCourseNameWhenAddingMaterial, course)
    },
    addToTopic: async function(topic) {
        await waitHelpers.waitAndSetValue(selectors.inputTopicNameWhenAddingMaterial, topic)
    },
    addToCourseAndTopic: async function(course, topic) {
        await this.addToCourse(course);
        await this.addToTopic(topic);
    },

    

}
