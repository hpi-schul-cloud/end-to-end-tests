const addEditTopicPage = require('../page-objects/pages/coursePages/CRSSAddEditTopicPage');
const CRSSCourseListPage = require('../page-objects/pages/coursePages/CRSSCourseListPage');
const CRSSCourseTopicsPage = require('../page-objects/pages/coursePages/CRSSCourseTopicsPage');
const courseTopicsPage = require('../page-objects/pages/coursePages/CRSSCourseTopicsPage');

When(/^.* adds a new Topic with name '([^']*)'$/, async function (topicName) {
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopicName(topicName);
	await addEditTopicPage.clickCreateTopicButton();
});

When(/^.* adds a topic with name '([^']*)'$/, async function (topicname) {
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopicName(topicname);
});

When(/^.* adds content Text with title '([^']*)' and description '([^']*)'$/, async function (
	contentTitle,
	description
) {
	await addEditTopicPage.addText(contentTitle, description);
});

When(/^.* adds content GeoGebraArbeitsblatt with id '([^']*)'$/, async function (geogebraID) {
	await addEditTopicPage.addGeoGebra('GeoGebra', geogebraID);
});

When(/^.* adds content Material$/, function () {
	return addEditTopicPage.addMaterial();
});

When(/^.* adds content Etherpad with name '([^']*)' and description '([^']*)'$/, async function (
	etherpadName,
	etherpadDescription
) {
	await addEditTopicPage.addEtherpad(etherpadName, etherpadDescription);
});

When(/^.* clicks Add-Content-'([^']*)' button$/, async function (contentName) {
	await addEditTopicPage.clickAddContent(contentName);
});

When(/^.* clicks Save-changes$/, async function () {
	await addEditTopicPage.clickSaveChanges();
});

Then(/^.* topic with name '([^']*)' is visible on the list$/, async function (topicName) {
	await addEditTopicPage.isTopicOnTheList(topicName);
});

Then(/^.* is only one topic visible on the list$/, async function () {
	await addEditTopicPage.isFirstTopicAdded();
});

Then(/^.* topic title is '([^']*)'$/, async function (topicName) {
	return addEditTopicPage.isCorrectTopicTitle(topicName);
});

When(/^.* clicks on topic with name '([^']*)'$/, function (topicName) {
	return addEditTopicPage.clickOnTopicWithName(topicName);
});

When(/^.* clicks on the pencil button in the line of the topic with name '([^']*)' to edit the topic$/, async function (
	topicName
) {
	await addEditTopicPage.clickOnTopicEditPencilButton(topicName);
});

When(/^.* changes topic name '([^']*)'$/, async function (changedTopicName) {
	await addEditTopicPage.setTopicName(changedTopicName);
});

When(/^.* changes title of content from '([^']*)' to '([^']*)'$/, async function (contentTitle, changeContentTitle) {
	await addEditTopicPage.setNewContentTitle(contentTitle, changeContentTitle);
});

When(/^.* changes description of content from '([^']*)' to '([^']*)'$/, async function (
	contentDescription,
	newContentDescription
) {
	await addEditTopicPage.setNewContentText(contentDescription, newContentDescription);
});

Then(/^.* content text title is '([^']*)'$/, async function (contentTitle) {
	await addEditTopicPage.isContentWithTitleVisibleOnTheList(contentTitle);
});

Then(/^.* content text contains text '([^']*)'$/, async function (contentText) {
	await addEditTopicPage.isContentDescriptionVisibleOnTheList(contentText);
});

Then(/^.* course with name '([^']*)' contains topic with name '([^']*)'$/, async function (coursename, topicname) {
	await CRSSCourseListPage.goToCourses();
	await CRSSCourseTopicsPage.isTopicInCourseInSection(
		coursename,
		topicname,
		CRSSCourseListPage.section.activeCourses
	);
});
