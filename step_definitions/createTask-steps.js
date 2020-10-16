'use strict';

const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');
const homeworkListPage = require('../page-objects/pages/HMWRKHomeworkListPage.js');
const addEditHomeworkPage = require('../page-objects/pages/HMWRKAddEditHomeworkPage.js');

Then(/^.*clicks create-task-button on task page$/, function () {
	return homeworkListPage.clickCreateTaskButton();
});

Then(/^.*puts taskname (.*) into name field$/, function (taskName) {
	return addEditHomeworkPage.setHomeworkName(taskName);
});

Then(/^.*puts taskBody (.*) into body field$/, function (taskBody) {
	return addEditHomeworkPage.setHomeworkText(taskBody);
});

Then(/^.*clicks submit-task-button on task-creation-form$/, function () {
	return addEditHomeworkPage.clickSubmitHomeworkBtn();
});
Then(/^.*goes to tasks page$/, function () {
	return navigationLeftPage.clickNavItemTasks();
});

Then(/^.*created task with name (.*) is on task page$/, async function (taskName) {
	await homeworkListPage.isTaskVisible(taskName);
});
