const addEditTopicPage = require("../page-objects/pages/coursePages/CRSSAddEditTopicPage");
const GeneralCoursePage = require("../page-objects/pages/coursePages/CRSSGeneralCoursePage");
const courseTopicsPage = require("../page-objects/pages/coursePages/CRSSCourseTopicsPage");

When(/^.* adds a new Topic with name (.*)$/, async function (topicName) {
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopic(topicName);
	await addEditTopicPage.clickCreateTopicButton();
});

Then(/^.* should see that created topic with name (.*) is shown on the topic list$/, async function (topicName) {
	await addEditTopicPage.isItTheFirstTopicAdded();
	await addEditTopicPage.isTopicOnTopicList(topicName);
});

When(/^.* clicks on the topic with name (.*)$/, function (topicName) {
	return addEditTopicPage.clickOnTopicWithName(topicName);
});

Then(/^.* should see that the topic with name (.*) is visible on the topic page$/, async function (topicName) {
	return addEditTopicPage.isTopicTitleVisible(topicName);
});

When(/^.* clicks on the pencil button in the line of the topic with name (.*) to edit the topic$/, async function (topicName) {
	await addEditTopicPage.clickOnTopicEditPencilButton(topicName);
});

When(/^.* changes topic name (.*)$/, async function (changedTopicName) {
	await addEditTopicPage.setTopic(changedTopicName);
});

When(/^.* clicks on the trashcan button in the line of the topic with name (.*) to delete the topic$/, async function (topicName) {
	await GeneralCoursePage.clickOnTopicDeleteTrashcanButton(topicName);
});

When(/^.* clicks on the Löschen button in the Löschen pop up$/, async function () {
	await GeneralCoursePage.clickDeleteTopicButtonInPopup();
});

When(/^.* finds title (.*) and changes title on (.*) and text (.*) of the topic$/, async function (contentTitle, changedContentTitle, changedDescription) {
	await addEditTopicPage.findContentByTitleAndChanged(contentTitle, changedContentTitle, changedDescription);
	await addEditTopicPage.clickCreateTopicButton();
});

Then(/^.* should see changed topic with name (.*) and content title (.*) and description (.*) is visible on the topic page$/,async function (changedTopicName, changedContentTitle, changedDescription) {
	// await addEditTopicPage.(changedTopicName, changedContentTitle, changedDescription);
	await addEditTopicPage.isTopicTitleVisible(changedTopicName);
	await addEditTopicPage.isContentTopicTitleVisible(changedContentTitle);
	await addEditTopicPage.isTopicDescriptionVisible(changedDescription);
});

Then(/^.* should see that edited topic with name (.*) is shown on the topic list$/,async function (changedTopicName) {
	await addEditTopicPage.isTopicOnTopicList(changedTopicName);
});

Then(/^.* should see that deleted topic with name (.*) is not shown on the topic list$/,async function (topicName) {
	await addEditTopicPage.isTopicNotOnTopicList(topicName);
});
