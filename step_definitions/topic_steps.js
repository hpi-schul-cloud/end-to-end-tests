const addEditTopicPage = require("../page-objects/pages/coursePages/CRSSAddEditTopicPage");
const courseTopicsPage = require("../page-objects/pages/coursePages/CRSSCourseTopicsPage");
var {When} = require('cucumber');

When(/^.* adds a new Topic with name (.*)$/, async function (topicName) {
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopic(topicName);
	await addEditTopicPage.clickCreateTopicButton();
});

Then(/^.* should see that created topic with name (.*) is shown on the topic list$/, async function (topicName) {
	await addEditTopicPage.isItTheFirstTopicAdded();
	await addEditTopicPage.isTopicCreatedOnListOfTopics(topicName);
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
Then(/^.* should see that edited topic with name (.*) is shown on the topic list$/, function (changedTopicName) {
	return addEditTopicPage.isTopicCreatedOnListOfTopics(changedTopicName);
});
Then(/^.* should see changed topic name on (.*) and content title (.*) and description (.*) is visible$/, function (changedTopicName, contentTitle, description) {
	return addEditTopicPage.isEditedContentVisibleOnTopic(changedTopicName, contentTitle, description);
});
When(/^.* find (.*) and changes to title (.*) and text (.*) of the topic$/, function (contentTitle, changedContentTitle, changedDescription) {
		addEditTopicPage.findContentByTitleAndChanged(contentTitle, changedContentTitle, changedDescription);
});
