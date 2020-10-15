var {When} = require('cucumber');
var {Then} = require('cucumber');
const addEditTopicPage = require("../page-objects/pages/coursePages/CRSSAddEditTopicPage");
const courseTopicsPage = require("../page-objects/pages/coursePages/CRSSCourseTopicsPage");

When(/^.*adds a new Topic with name (.*)$/, async function (topicname) {
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopic(topicname);
	await addEditTopicPage.addText("aaaaaaaaaaaaa");
	await addEditTopicPage.clickSaveTopicButton();

});
Then(/^.* should see that created topic with name (.*) is shown$/, function (topicName) {
	return addEditTopicPage.isTopicCreated(topicName)
});
When(/^.* chooses topic with name (.*)$/, function (name) {
	return addEditTopicPage.clickOnTopicWithName(name)
});
Then(/^.* clicks on edit a topic$/, function () {
	return addEditTopicPage.clickEditTopicButton()
});
Then(/^.* changes name of title (.*) and description (.*)$/, async function (topicName, description) {
	await addEditTopicPage.setTopic(topicName)
	await addEditTopicPage.addText(description);
	await addEditTopicPage.clickEditTopicButton()
});
Then(/^teacher check the topic was changed$/, function () {

});
