'use strict';

const dashboardPage = require('../page-objects/pages/DashboardPage');

Then(/^.* Private tasks section is visible on dashboard$/, async function () {
	await dashboardPage.isPrivateTasksSectionVisible();
});

Then(/^.* number of completed tasks is not visible for task '([^']*)'$/, async function (taskName) {
	await dashboardPage.isElementOnTaskVisible("Completed", taskName, dashboardPage.taskElement.taskCompleted, false);
});
Then(/^.* number of graded tasks is not visible for task '([^']*)'$/, async function (taskName) {
	await dashboardPage.isElementOnTaskVisible("Graded", taskName, dashboardPage.taskElement.taskGraded, false);
});

Then(/^.* task with name '([^']*)' and deadline for course '([^']*)' is visible on dashboard$/, async function (taskName, courseName) {
	await dashboardPage.isPrivateTaskNameVisible(taskName);
	await dashboardPage.isCourseNameOnPrivateTaskVisible(taskName, courseName);
	await dashboardPage.isElementOnTaskVisible("Timeout", taskName, dashboardPage.taskElement.taskTimeout, true);
});

