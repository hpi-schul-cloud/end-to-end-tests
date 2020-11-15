/*[url/content]*/

'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers.js');
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const apiHelpers = require('../../runtime/helpers/APIhelpers');
const stringHelpers= require('../../runtime/helpers/stringHelpers');
const {CLIENT} = require("../../shared-objects/servers");
const lernstoreUrl = `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`;
let title;

const selectorSearchField = ".input-active.search__container > input";
const selectorNumberOfContentOnGUI = ".content__total";
const selectorFirstElement = "div.content__container > div > section:nth-child(1)";
const selectorTitleOfMaterialWhenClicked = ".content-container > .title";
const selectorCourseTitles = "div.multiselect__content-wrapper > ul > li > span";
const selectorSubmitAddToCourseAndTopic = '[data-testid="modal_submit_btn"]';
const selectorCourseSelector = '[data-testid="courseSelector"]';
const selectorTopicSelector = '[data-testid="topicSelector"]';
const selectorSubmitBtnAfterMaterialWasAddedToCourseAndTopic = "div.footer-button > button";
const selectorWithTheNamesOfMaterialsInTopic = '.h4.card-title > a';

async function switchToContentWindow() {
    let handle = await driver.getWindowHandles();
    await driver.switchToWindow(handle[1]);
}

async function isRedirectedToContentPage() {
    await waitHelpers.waitUntilUrlContains(lernstoreUrl);
}

async function setSearchRequest(content) {
    await waitHelpers.waitAndSetValue(selectorSearchField, content);
     // ADJUST WITH PROCESS.ENV
    await driver.pause(5500)
}

async function rightNumberOfFoundContentDisplayed(request) {
    let selectorTotalNum = await driver.$(selectorNumberOfContentOnGUI);
    let displayedString= await selectorTotalNum.getText();
    let displayedNum = await stringHelpers.cutStringAfterSymbol(displayedString, ' ');
    let apiResponse = await apiHelpers.getLernstoreMaterialsAfterRequest(request);
    await expect(`${apiResponse}`).to.equal(displayedNum);
}

async function clickOnContentCard(request) {
    await elementHelpers.clickAndWait(selectorFirstElement)
    await isMaterialNameOnGUIAndAPIequal(request)
}

async function isMaterialNameOnGUIAndAPIequal(request) {
    let titleOnGUISelector = await driver.$(selectorTitleOfMaterialWhenClicked);
    let titleOnGUI = await elementHelpers.getElementText(titleOnGUISelector);
    title = titleOnGUI;
    let titleOnAPIRequest = await apiHelpers.getTheFirstElementNamePerRESTRequest(request);
    await expect(titleOnGUI).to.equal(titleOnAPIRequest);
}

async function clickAddContentBtn() {
    const scriptToClickBtn= "document.querySelector('button.is-large.is-hero-cta.floating-button').click()"
    await driver.execute(scriptToClickBtn);
    await driver.pause(1500);
}

async function selectAttachmentToCourseOrTopicContentPage(courseOrTopicName, courseOrTopicContainer) {
    await elementHelpers.clickAndWait(courseOrTopicContainer+'> div');
    const courseIndex = await this.getIndexOfCourseOrTopicInDropdown(courseOrTopicContainer, courseOrTopicName);
    let dropDownElementCourseOrTopic = await driver.$(`${courseOrTopicContainer} .multiselect__content-wrapper > ul > li:nth-child(${courseIndex}) > span`);
    await dropDownElementCourseOrTopic.click();

}
async function getIndexOfCourseOrTopicInDropdow(container, elementToSearch) {
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
}

// params: courseName or TopicName, selector - container of topics or courses
async function addToCourseAndTopic(course, topic) {
    await selectAttachmentToCourseOrTopicContentPage(course, selectorCourseSelector);
    await selectAttachmentToCourseOrTopicContentPage(topic, selectorTopicSelector);
}

async function clickSubmitAddContentBtn() {
    await elementHelpers.clickAndWait(selectorSubmitAddToCourseAndTopic)
    await elementHelpers.clickAndWait(selectorSubmitBtnAfterMaterialWasAddedToCourseAndTopic);
    // return to main window
    let handle = await driver.getWindowHandles();
    await driver.switchToWindow(handle[0]);
}

async function listOfAttachedMaterialsInTheTopic() {
    const listOfAttachedMaterialsInTheTopicPromise = (await driver.$$(selectorWithTheNamesOfMaterialsInTopic)).map((element) => element.getText());
    const listOfAttachedMaterialsInTheTopic = await Promise.all(listOfAttachedMaterialsInTheTopicPromise);
    return listOfAttachedMaterialsInTheTopic;
}


module.exports= {
    title, 
    switchToContentWindow,
    isRedirectedToContentPage,
    setSearchRequest,
    clickOnContentCard,
    isMaterialNameOnGUIAndAPIequal,
    clickAddContentBtn,
    selectAttachmentToCourseOrTopicContentPage,
    getIndexOfCourseOrTopicInDropdow,
    addToCourseAndTopic,
    clickSubmitAddContentBtn,
    listOfAttachedMaterialsInTheTopic,
    rightNumberOfFoundContentDisplayed,

}

