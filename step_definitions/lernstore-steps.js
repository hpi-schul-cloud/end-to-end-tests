'use strict';

const addEditTopicPage=require("../page-objects/pages/coursePages/CRSSAddEditTopicPage");
const lernstorePage=require("../page-objects/pages/LRNSTRLernStorePage");


When(/^teacher adds some Lerstore material with (.*) to the course$/, async function (lerstoreTopicName) {
    await addEditTopicPage.addLernstoreMaterial(lerstoreTopicName)
    await addEditTopicPage.clickCreateTopicButton();
    await lernstorePage.switchToContentWindow();

});
Then(/^teacher must be redirected to content page$/, async function () {
    await lernstorePage.isRedirectedToContentPage();

});
When(/^.* searches for content (.*)$/, async function (searchRequest) {
    await lernstorePage.setSearchRequest(searchRequest);

});
Then(/^.* must see the right number of materials (.*)$/, async function (searchRequest) {
    await lernstorePage.rightNumberOfFoundContentDisplayed(searchRequest);

});
Then(/^.* clicks on content-card after request (.*)$/, async function (searchRequest) {
    await lernstorePage.clickOnContentCard(searchRequest);

});
Then(/^.* clicks add-btn$/, async function () {
    await lernstorePage.clickAddContentBtn();

});
Then(/^.* selects course (.*) and topic (.*)$/, async function(course, topic) {
    await lernstorePage.addToCourseAndTopic(course, topic);
});
Then(/^.* clicks on add content button$/, async function () {
    await lernstorePage.clickSubmitAddContentBtn();

});
Then(/^.* should see added material$/, async function () {
    await lernstorePage.isTheNameOfAttachedMaterialCorrect();

});
Then(/^.* approves creating a topic with lernstore$/, async function () {
    await addEditTopicPage.clickCreateTopicButton();
    
});

