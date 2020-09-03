'use strict';

const courses = require('../page-objects/pages/coursePages/CRSSCourseListPage');
const addEditTopicPage=require("../page-objects/pages/coursePages/CRSSAddEditTopicPage");



When(/^the teacher adds some Lerstore material with (.*) to the course$/, async function (lerstoreTopicName) {
    await addEditTopicPage.addLernstoreMaterial(lerstoreTopicName);
	await addEditTopicPage.clickCreateTopicButton();

});
When(/^When the teacher searches for content$/, async function (searchRequest) {
    await addEditTopicPage.addLernstoreMaterial(lerstoreTopicName);
	await addEditTopicPage.clickCreateTopicButton();

});
