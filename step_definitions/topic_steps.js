var {When} = require('cucumber');
var {Then} = require('cucumber');
const addEditTopicPage = require("../page-objects/pages/coursePages/CRSSAddEditTopicPage");
const courseTopicsPage = require("../page-objects/pages/coursePages/CRSSCourseTopicsPage");

When(/^.*adds a new Topic with name (.*)$/, async function (topicname) {
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopic(topicname);
	await addEditTopicPage.clickCreateTopicButton();

});
Then(/^.* should see that created topic with name (.*) is shown$/, function (topicName) {
	return addEditTopicPage.isTopicCreated(topicName)
});
When(/^.* chooses topic with name (.*)$/, function () {
	dssd
});
Then(/^.* clicks on edit a topic$/, function () {
	return addEditTopicPage.clickEditTopicButton()
});
Then(/^.* changes name of topic (.*)$/, function () {

});
