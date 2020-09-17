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
    courseAndTitleContainer: '.wrapper.content-modal__body--select',
    textField: '.multiselect__input',
    selectorsNameOfCourses: {
        selectorCourseTitles: "div.multiselect__content-wrapper > ul > li > span > span"
    },
    submitAddToCourseAndTopic: '[data-testid="modal_submit_btn"]',

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

    addToCourse: async function(course) {
      
       const courseIndex = await this.getIndexOfCourseInDropdown(course);
       let obj = await driver.$('div.multiselect__content-wrapper > ul > li:nth-child('+courseIndex+') > span');
      
       await obj.click();

    },
    getIndexOfCourseInDropdown: async function(course) {
        try{
            let clicable = await driver.$('div.core > div > div.multiselect__select');
            await clicable.click();
            const courseList = await Promise.all(( 
                await driver.$$(selectors.selectorsNameOfCourses.selectorCourseTitles)).map(
                    async (element) => await element.getText()
                ));
            for (var index=0; index<courseList.length; index++) {
                if(courseList[index]==course)
                return index+1;
            }
    }
    catch(err) {
        log.error(err.message);
        throw err;
    }
    }, 
    addToTopic: async function(topic) {
        let clicable = await driver.$('div.input-line > div.core > div');
        await clicable.click();
   
        const topicIndex = await this.addTopicHelper(topic);
        let obj = await driver.$('div.multiselect__content-wrapper > ul > li:nth-child('+topicIndex+') > span');
       
        await obj.click();
        
    },
    addToCourseAndTopic: async function(course, topic) {
        await this.addToCourse(course);
        await this.addToTopic(topic);
        await waitHelpers.waitAndClick(selectors.submitAddToCourseAndTopic);
    },

    

}
