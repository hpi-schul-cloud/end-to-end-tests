'use strict';

const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');
const tasksListPage = require('../page-objects/pages/TASKListPage.js');
const addEditTaskPage = require('../page-objects/pages/TASKAddEditTaskPage.js');

When(/^.*clicks Add-task button$/, function () {
	return tasksListPage.clickCreateTaskButton();
});

When(/^.*sets task name '([^']*)' in task form$/, function (taskName) {
	return addEditTaskPage.setTaskName(taskName);
});

When(/^.*sets task body '([^']*)' in task form$/, function (taskBody) {
	return addEditTaskPage.setTaskText(taskBody);
});

When(/^.*clicks Add-task-submit button$/, function () {
	return addEditTaskPage.clickSubmitTaskBtn();
});

When(/^.*goes to tasks page$/, function () {
	return navigationLeftPage.clickNavItemTasks();
});
