/*[url/content]*/
'use strict';
// timeout for search: 3 sec
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const apiHelpers = require('../../runtime/helpers/APIhelpers');
const stringHelpers= require('../../runtime/helpers/stringHelpers');
const {CLIENT} = require("../../shared-objects/servers");
const url = `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`;
let title;

const selectorSearchField = ".input-active.search__container > input";
const selectorSearchIcon =  ".search__container--icon";
const selectorNumberOfContentOnGUI = ".content__total";
const selectorFirstElement = "div.content__container > div > section:nth-child(1)";
const selectorTitleOfMaterialWhenClicked = ".content-container > .title";
const selectorCourseTitles = "div.multiselect__content-wrapper > ul > li > span";
const selectorSubmitAddToCourseAndTopic = '[data-testid="modal_submit_btn"]';
const selectorCourseSelector = '[data-testid="courseSelector"]';
const selectorTopicSelector = '[data-testid="topicSelector"]';
const selectorSubmitBtnAfterMaterialWasAddedToCourseAndTopic = "div.footer-button > button";
const selectorWithTheNamesOfMaterialsInTopic = '.h4.card-title > a';
 

module.exports= {
    title,
 
    switchToContentWindow: async function() {
        let handle = await driver.getWindowHandles();
        await driver.switchToWindow(handle[1]);

    },
    wasRedirectedToContentPage: async function() {
        await waitHelpers.waitUntilUrlContains(url);
    },
    insertSearchRequest: async function(content) {
        await waitHelpers.waitAndSetValue(selectorSearchField, content);
        await elementHelpers.click(selectorSearchIcon);
    
    },
    rightNumberOfFoundContentDisplayed: async function(request) {
        let selectorTotalNum = await driver.$(selectorNumberOfContentOnGUI);
        let displayedString= await selectorTotalNum.getText();
        let displayedNum = await stringHelpers.cutStringAfterSymbol(displayedString, ' ');
        let apiResponse = await apiHelpers.getLernstoreMaterialsAfterRequest(request);
        await expect(`${apiResponse}`).to.equal(displayedNum);
    },
    clickOnContentCard: async function(request) {
        await waitHelpers.waitAndClick(selectorFirstElement);
        await this.checkThatTheMaterialOnGUIAndAPIAreDisplayedCorrectly(request)  
    },
    checkThatTheMaterialOnGUIAndAPIAreDisplayedCorrectly: async function(request) {
        let titleOnGUISelector = await driver.$(selectorTitleOfMaterialWhenClicked);
        let titleOnGUI = await titleOnGUISelector.getText();
        this.title = titleOnGUI;
        let titleOnAPIRequest = await apiHelpers.getTheFirstElementNamePerRESTRequest(request);
        await expect(titleOnGUI).to.equal(titleOnAPIRequest);
    },
    clickAddContentBtn: async function() {
        const scriptToClickBtn= "document.querySelector('button.is-large.is-hero-cta.floating-button').click()"
        await driver.execute(scriptToClickBtn);
        await driver.pause(1500);
    },
    addToCourseOrTopic: async function(courseOrTopicName, courseOrTopicContainer) {
        await waitHelpers.waitAndClick(courseOrTopicContainer+'> div')
        const courseIndex = await this.getIndexOfCourseOrTopicInDropdown(courseOrTopicContainer, courseOrTopicName);
        let dropDownElementCourseOrTopic = await driver.$(`${courseOrTopicContainer} .multiselect__content-wrapper > ul > li:nth-child(${courseIndex}) > span`);
        await dropDownElementCourseOrTopic.click();
       //await waitHelpers.waitAndClick(dropDownElementCourseOrTopic)

    },
    getIndexOfCourseOrTopicInDropdown: async function(container, elementToSearch) {
        const selector = `${container} ${selectorCourseTitles}`;
        const courseList = (await driver.$$(selector)).map((element) => element.getText());
            try{
                const result = await Promise.all(courseList);
                const isTheSameName = (element) => element==elementToSearch;
                return (result.findIndex(isTheSameName)+1);
            }
            catch (e){
                  console.error(e)
            }
    },  
    // params: courseName or TopicName, selector - container of topics or courses
    addToCourseAndTopic: async function(course, topic) {
        await this.addToCourseOrTopic(course, selectorCourseSelector);
        await this.addToCourseOrTopic(topic, selectorTopicSelector);
    },
    clickSubmitAddContentBtn: async function() {
        await waitHelpers.waitAndClick(selectorSubmitAddToCourseAndTopic);
        await waitHelpers.waitAndClick(selectorSubmitBtnAfterMaterialWasAddedToCourseAndTopic);
        // return to main window
        let handle = await driver.getWindowHandles();
        await driver.switchToWindow(handle[0]);
    },
    listOfAttachedMaterialsInTheTopic: async function() {
        const listOfAttachedMaterialsInTheTopicPromise = (await driver.$$(selectorWithTheNamesOfMaterialsInTopic)).map((element) => element.getText());
        const listOfAttachedMaterialsInTheTopic = await Promise.all(listOfAttachedMaterialsInTheTopicPromise);
        return listOfAttachedMaterialsInTheTopic;
    }
}
