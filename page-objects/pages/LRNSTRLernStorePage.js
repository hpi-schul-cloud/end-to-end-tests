/*[url/content]*/
'use strict';
// timeout for search: 3 sec
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

    courseAndTitleContainer: '.content-modal__body',

    containerTopic: this.courseAndTitleContainer+'div:nth-child(2)',
    clickableElementDropDown: '.multiselect__select',

    selectorsNameOfCourses: {
        selectorCourseTitles: "div.multiselect__content-wrapper > ul > li > span"
    },

    submitAddToCourseAndTopic: '[data-testid="modal_submit_btn"]',
    selectorForMaterialLink: 'div.metadata > div:nth-child(2) > div.meta-text.text-wrap > a',


    courseSelector: '[data-testid="courseSelector"]',
    topicSelector: '[data-testid="topicSelector"]',
    submitBtnAfterMaterialWasAddedToCourseAndTopic: "div.footer-button > button"
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
        const selector = `${container} ${selectors.selectorsNameOfCourses.selectorCourseTitles}`;
        const courseList = (await driver.$$(selector)).map((element) => element.getText());
            try{
                const result = await Promise.all(courseList);
                const isTheSameName = (element) => element==elementToSearch;
                return (await result.findIndex(isTheSameName)+1);
            }
            catch (e){
                  console.error(e)
            }
    },  
    // params: courseName or TopicName, selector - container of topics or courses
    addToCourseAndTopic: async function(course, topic) {
        await this.addToCourseOrTopic(course, selectors.courseSelector);
        await this.addToCourseOrTopic(topic,selectors.topicSelector);
    },
    clickSubmitAddContentBtn: async function() {
        await waitHelpers.waitAndClick(selectors.submitAddToCourseAndTopic);
        await waitHelpers.waitAndClick(selectors.submitBtnAfterMaterialWasAddedToCourseAndTopic);
        // return to main window
        let handle = await driver.getWindowHandles();
        await driver.switchToWindow(handle[0]);
        let url = await driver.getUrl();
        await waitHelpers.waitUntilElementIsPresent('.content-wrapper');
    },


    

}
