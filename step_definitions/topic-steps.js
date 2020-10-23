const addEditTopicPage = require("../page-objects/pages/coursePages/CRSSAddEditTopicPage");
const courseTopicsPage = require("../page-objects/pages/coursePages/CRSSCourseTopicsPage");

When(/^.* adds a new Topic with name '(.*)'$/, async function (topicName) {
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopic(topicName);
	await addEditTopicPage.clickCreateTopicButton();
});

Then(/^.* should see that created topic with name '(.*)' is shown on the topic list$/, async function (topicName) {
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
When(/^.* changes topic name '(.*)'$/, async function (changedTopicName) {
	await addEditTopicPage.setTopic(changedTopicName);
});
When(/^.* finds title '(.*)' and changes title on '(.*)' and text '(.*)' of the topic$/, async function (contentTitle, changeContentTitle, changeDescription) {
	await addEditTopicPage.setContentByTitle(contentTitle, changeContentTitle);
	await addEditTopicPage.setDescription(changeDescription);
	await addEditTopicPage.clickCreateTopicButton();
});
Then(/^.* should see changed topic with name (.*) and content title (.*) and description (.*) is visible on the topic page$/,async function (changedTopicName, changedContentTitle, changedDescription) {
	await addEditTopicPage.isTopicTitleVisible(changedTopicName);
	await addEditTopicPage.isContentTopicTitleVisible(changedContentTitle);
	await addEditTopicPage.isTopicDescriptionVisible(changedDescription);

});
Then(/^.* should see that edited topic with name (.*) is shown on the topic list$/,async function (changedTopicName) {
	await addEditTopicPage.isTopicOnTopicList(changedTopicName);

});
