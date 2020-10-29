const addEditTopicPage = require("../page-objects/pages/coursePages/CRSSAddEditTopicPage");
const GeneralCoursePage = require("../page-objects/pages/coursePages/CRSSGeneralCoursePage");
const courseTopicsPage = require("../page-objects/pages/coursePages/CRSSCourseTopicsPage");

When(/^.* adds a new Topic with name '([^']*)'$/, async function (topicName) {
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopic(topicName);
	await addEditTopicPage.clickCreateTopicButton();
});

Then(/^.* should see that created topic with name '([^']*)' is shown on the topic list$/, async function (topicName) {
	await addEditTopicPage.isItTheFirstTopicAdded();
	await addEditTopicPage.isTopicOnTopicList(topicName, true);
});

When(/^.* clicks on the topic with name '([^']*)'$/, function (topicName) {
	return addEditTopicPage.clickOnTopicWithName(topicName);
});

Then(/^.* should see that the topic with name '([^']*)' is visible on the topic page$/, async function (topicName) {
	return addEditTopicPage.isTopicTitleVisible(topicName);
});

When(/^.* clicks pencil in line of topic named '([^']*)'$/, async function (topicName) {
	await addEditTopicPage.clickOnTopicEditPencilButton(topicName);
});

When(/^.* changes topic name '([^']*)'$/, async function (changedTopicName) {
	await addEditTopicPage.setTopic(changedTopicName);
});

When(/^.* finds title '([^']*)' and changes title on '([^']*)' and text '([^']*)' of the topic$/, async function (contentTitle, changeContentTitle, changeDescription) {
	await addEditTopicPage.setContentByTitle(contentTitle, changeContentTitle);
	await addEditTopicPage.setDescription(changeDescription);
	await addEditTopicPage.clickCreateTopicButton();
});

When(/^.* clicks trashcan in line of topic named '([^']*)'$/, async function (topicName) {
	await GeneralCoursePage.clickOnTopicDeleteTrashcanButton(topicName);
});

When(/^.* clicks on Löschen button in Löschen pop up$/, async function () {
	await GeneralCoursePage.clickDeleteTopicButtonInPopup();
});

Then(/^.* should see changed topic with name '([^']*)' and content title '([^']*)' and description '([^']*)' is visible on the topic page$/, async function (changedTopicName, changedContentTitle, changedDescription) {
	await addEditTopicPage.isTopicTitleVisible(changedTopicName);
	await addEditTopicPage.isContentTopicTitleVisible(changedContentTitle);
	await addEditTopicPage.isTopicDescriptionVisible(changedDescription);
});

Then(/^.* should see edited topic named '([^']*)' on topic list$/, async function (changedTopicName) {
	await addEditTopicPage.isTopicOnTopicList(changedTopicName, true);
});
Then(/^.* should see that edited topic with name '([^']*)' is shown on the topic list$/, async function (changedTopicName) {
	await addEditTopicPage.isTopicOnTopicList(changedTopicName);
});
Then(/^.* should not see deleted topic named '([^']*)' on topic list$/, async function (topicName) {
	await addEditTopicPage.isTopicOnTopicList(topicName, false);
});
