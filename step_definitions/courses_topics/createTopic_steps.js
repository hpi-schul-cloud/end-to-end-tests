'use strict';

const courseTopicsPage = require('../../page-objects/pages/coursePages/CRSSCourseTopicsPage');
const leftNavigation = require('../../page-objects/pages/NavigationLeftPage');
const addEditTopicPage = require('../../page-objects/pages/coursePages/CRSSAddEditTopicPage');
const CRSSCourseTopicsPage = require('../../page-objects/pages/coursePages/CRSSCourseTopicsPage');
const CRSSCourseListPage = require('../../page-objects/pages/coursePages/CRSSCourseListPage');

//WHEN
When(/^.* adds a topic with name '([^']*)'$/, async function (topicname) {
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopicName(topicname);
});

When(/^.* adds content ([^']*) with title '([^']*)' and description '([^']*)'$/, async function (
	contentType,
	contentTitle,
	description
) {
	await addEditTopicPage.addContent(contentType, contentTitle, description);
});

When(/^.* adds content Material$/, function () {
	return addEditTopicPage.addMaterial();
});

When(/^.* clicks Add-Content-'([^']*)' button$/, async function (contentName) {
	await addEditTopicPage.clickAddContent(contentName);
});

When(/^.* clicks Save-changes button$/, async function () {
	await addEditTopicPage.clickSaveChanges();
});

When(/^.* clicks on topic with name '([^']*)'$/, function (topicName) {
	return addEditTopicPage.clickOnTopicWithName(topicName);
});

Then(/^.* is only one topic visible on the list$/, async function () {
	await addEditTopicPage.isFirstTopicAdded();
});

//THEN
Then(/^.* topic with name '([^']*)' is visible on the list$/, async function (topicName) {
	await addEditTopicPage.isTopicOnTheList(topicName, true);
});

Then(/^.* topic with name '([^']*)' is not visible on the list$/, async function (topicName) {
	await addEditTopicPage.isTopicOnTheList(topicName, false);
});

Then(/^.* topic title is '([^']*)'$/, async function (topicName) {
	return addEditTopicPage.isCorrectTopicTitle(topicName);
});

Then(/^.* content text title is '([^']*)'$/, async function (contentTitle) {
	await addEditTopicPage.isContentWithTitleVisibleOnTheList(contentTitle);
});

Then(/^.* content text contains text '([^']*)'$/, async function (contentText) {
	await addEditTopicPage.isContentDescriptionVisibleOnTheList(contentText);
});

Then(/^.* course with name '([^']*)' contains topic with name '([^']*)'$/, async function (coursename, topicname) {
	await leftNavigation.clickNavItemRoomsOverview();
	await CRSSCourseTopicsPage.isTopicInCourseInSection(
		coursename,
		topicname,
		CRSSCourseListPage.section.activeCourses
	);
});
