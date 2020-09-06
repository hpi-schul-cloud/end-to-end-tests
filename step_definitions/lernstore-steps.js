'use strict';

const courses = require('../page-objects/pages/coursePages/CRSSCourseListPage');
const addEditTopicPage=require("../page-objects/pages/coursePages/CRSSAddEditTopicPage");
const lernstorePage=require("../page-objects/pages/LRNSTRLernStorePage");



When(/^the teacher adds some Lerstore material with (.*) to the course$/, async function (lerstoreTopicName) {
    await addEditTopicPage.addLernstoreMaterial(lerstoreTopicName);
    await addEditTopicPage.clickCreateTopicButton();
    await lernstorePage.switchToContentWindow();

});
Then(/^the teacher must be redirected to content page$/, async function () {
    await lernstorePage.wasRedirectedToContentPage();

});
When(/^the teacher searches for content (.*)$/, async function (searchRequest) {
    await lernstorePage.insertSearchRequest(searchRequest);

});
Then(/^the right number of materials (.*) is displayed$/, async function (searchRequest) {
    await lernstorePage.rightNumberOfFoundContentDisplayed(searchRequest);

});
Then(/^teacher clicks on content-card after request (.*)$/, async function (searchRequest) {
    await lernstorePage.clickOnContentCard(searchRequest);

});
Then(/^teacher clicks on add content button$/, async function () {
    await lernstorePage.clickAddContentBtn();

});
Then(/^teacher selects course (.*) and topic (.*)$/, async function (course, topic) {
    await lernstorePage.clickAddContentBtn();

});
