'use strict';
const navigationLeftPage = require('../../page-objects/pages/NavigationLeftPage.js');
const roomsOverview = require('../../page-objects/pages/RoomsOverviewPage.js');
const addEditTaskPage = require('../../page-objects/pages/TASKAddEditTaskPage.js');
const TASKListPage = require('../../page-objects/pages/TASKListPage.js');
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers.js');
const TASKPage = require('../../page-objects/pages/TASKPage');

//WHEN
When(/^.* goes to tasks page$/, function () {
	return navigationLeftPage.clickNavItemTasks();
});

When(/^.* clicks '([^']*)' task tab$/, async function (button){
    await TASKPage.clickOnTaskOverviewMenuOptions(button);
});

When(/^.* clicks Create-a-task button in the course '([^'].*)'$/, async function (coursename) {
	await navigationLeftPage.clickNavItemRoomsOverview();
	await roomsOverview.clickOnTheElementWithName(coursename);
	await TASKPage.gotoTasksTab();
	//await TASKListPage.clickCreateTaskButtonInTheCourse();
});

Then(/^.* clicks on '([^']*)' button for task with name '([^']*)'$/, async function (button, taskname) {
	await TASKListPage.clickActionFromMenuOnTask(button);
});

When(/^.* clicks Add-task button$/, function () {
	return TASKListPage.clickCreateTaskButton();
});

When(/^.* clicks Add-task-submit button$/, function () {
	return addEditTaskPage.clickSubmitTaskBtn();
});

When(/^.* clicks on Private-task checkbox$/, async function () {
	await addEditTaskPage.clickPrivateTaskCheckbox();
});

When(/^.* clicks on Enable-group-submission checkbox$/, async function () {
    await addEditTaskPage.clickTeamSubmissionsCheckbox();
});

When(/^.* clicks on Student-submissions-visible-to-each-other checkbox$/, async function () {
    await addEditTaskPage.clickPublicSubmissionsCheckbox();
});

When(/^.* clicks on task with name '(.*)'$/, async function (taskName) {
    await TASKListPage.sortTasksLastEdited();
    await TASKListPage.clickActionFromMenuOnTask(taskName, 'Task open');
});

Then(/^.* chooses task courses '([^']*)'$/, async function (listOfTaskCourses) {
	await addEditTaskPage.setTaskCourses(listOfTaskCourses);
});

When(/^.*sets task name '([^']*)' in task form$/, function (taskName) {
	return addEditTaskPage.setTaskName(taskName);
});

When(/^.* sets task body '([^']*)' in task form$/, function (taskBody) {
	return addEditTaskPage.setTaskText(taskBody);
});

When(/^.* sets Task-visibility-start-date: today, 00:00$/, async function () {
	var startDate = (await dateTimeHelpers.getCurrentFormattedDateWithOffset({ format: 'dd/MM/yyyy' })) + ' 00:00';
	await addEditTaskPage.setTaskVisibilityStartDate(startDate);
});

When(/^.* sets Task-processing-end-date: today .1 day, 11:00$/, async function () {
	var endDate =
		(await dateTimeHelpers.getCurrentFormattedDateWithOffset({ days: +1, format: 'dd/MM/yyyy' })) + ' 11:00';
	await addEditTaskPage.setTaskProcessingEndDate(endDate);
});
