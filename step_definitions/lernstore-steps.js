'use strict';

const addEditTopicPage=require("../page-objects/pages/coursePages/CRSSAddEditTopicPage");
const lernstorePage=require("../page-objects/pages/LRNSTRLernStorePage");


When(/^teacher adds some Lerstore material with (.*) to the course$/, async function (lerstoreTopicName) {
    await addEditTopicPage.addLernstoreMaterial(lerstoreTopicName)
    await addEditTopicPage.clickCreateTopicButton();
    await lernstorePage.switchToContentWindow();

});
Then(/^teacher must be redirected to content page$/, async function () {
    await lernstorePage.wasRedirectedToContentPage();

});
When(/^teacher searches for content (.*)$/, async function (searchRequest) {
    await lernstorePage.insertSearchRequest(searchRequest);

});
Then(/^teacher must see the right number of materials (.*)$/, async function (searchRequest) {
    await lernstorePage.rightNumberOfFoundContentDisplayed(searchRequest);

});
Then(/^teacher clicks on content-card after request (.*)$/, async function (searchRequest) {
    await lernstorePage.clickOnContentCard(searchRequest);

});
Then(/^teacher clicks add-btn$/, async function () {
    await lernstorePage.clickAddContentBtn();

});
Then(/^teacher selects course (.*) and topic (.*)$/, async function(course, topic) {
    await lernstorePage.addToCourseAndTopic(course, topic);
});   
Then(/^teacher clicks on add content button$/, async function () {
    await lernstorePage.clickSubmitAddContentBtn();

});
Then(/^teacher should see added material$/, async function () {
    let materials = (await lernstorePage.listOfAttachedMaterialsInTheTopic());
    await expect(lernstorePage.title).to.be.oneOf(materials);

});

