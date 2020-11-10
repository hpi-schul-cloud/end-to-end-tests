'use strict';

const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');
const tasksListPage = require('../page-objects/pages/TASKListPage.js');
const addEditTaskPage = require('../page-objects/pages/TASKAddEditTaskPage.js');

Then(/^.*clicks Add-task button$/, function () {
	return tasksListPage.clickCreateTaskButton();
});

Then(/^.*sets task name '([^']*)' in task form$/, function (taskName) {
	return addEditTaskPage.setTaskName(taskName);
});

Then(/^.*sets task body '([^']*)' in task form$/, function (taskBody) {
	return addEditTaskPage.setTaskText(taskBody);
});

Then(/^.*clicks Add-task-submit button$/, function () {
	return addEditTaskPage.clickSubmitTaskBtn();
});

Then(/^.*goes to tasks page$/, function () {
	return navigationLeftPage.clickNavItemTasks();
});
