'use strict';

const addEditTopicPage = require('../../page-objects/pages/coursePages/CRSSAddEditTopicPage');

When(/^.* clicks on Edit-topic-pencil icon in topic line with name '([^']*)'$/, async function (topicName) {
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
