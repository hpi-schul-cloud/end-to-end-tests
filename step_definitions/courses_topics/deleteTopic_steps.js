'use strict';

const CRSSCourseTopicsPage = require('../../page-objects/pages/coursePages/CRSSCourseTopicsPage');

When(/^.* clicks on Trashcan icon in topic with name '([^']*)'$/, async function (topicName) {
	await CRSSCourseTopicsPage.clickOnTopicDeleteTrashcanButton(topicName);
});

When(/^.* clicks on Delete topic button$/, async function () {
	await CRSSCourseTopicsPage.clickDeleteTopicButtonInPopup();
});
