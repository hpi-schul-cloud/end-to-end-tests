"use strict";

const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');
const homeworkListPage = require('../page-objects/pages/HMWRKHomeworkListPage.js');
const addEditHomeworkPage = require('../page-objects/pages/HMWRKAddEditHomeworkPage.js');


Then(/^he should click the task-button in the dashboard-sidebar$/, function() {
	return navigationLeftPage.clickNavItemTasks();
});

Then(/^he should click the create-task-button on the task page$/, function() {
	return homeworkListPage.clickCreateTaskButton();
});

Then(/^he should put the taskname (.*) into the name field$/, function(
	taskName
) {
	return addEditHomeworkPage.setHomeworkName(taskName);
});

Then(/^he should put the taskBody (.*) into the body field$/, function(
	taskBody
) {
	return addEditHomeworkPage.setHometaskText(taskBody);
});

Then(
	/^he should click the submit-task-button on the task-creation-form$/,
	function() {
		return addEditHomeworkPage.clickSubmitTaskButton();
	}
);
Then(/^teacher goes to tasks page$/, function() {
	return navigationLeftPage.clickNavItemTasks();
x});

Then(
	/^he should see the created task with the name (.*) on the task page$/,
	async function(taskName) {
		let tasks = await addEditHomeworkPage.getTaskNames();
		await expect(taskName).to.be.oneOf(tasks);
	});
