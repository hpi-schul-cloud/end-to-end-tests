When(/^.*adds a new Topic with name (.*)$/, async function (topicname) {
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopic(topicname);
	await addEditTopicPage.clickCreateTopicButton();

});

Then(/^.* should see that created topic with name (.*) is shown$/, function (topicName) {
	return addEditTopicPage.isTopicCreated(topicName)
});
