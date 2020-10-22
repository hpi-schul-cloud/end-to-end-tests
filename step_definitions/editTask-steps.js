'use strict';

const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');
const tasksListPage = require('../page-objects/pages/TASKListPage.js');
const editHomeworkPage = require('../page-objects/pages/TASKAddEditTaskPage.js');

Then(/^.* should click '(.*)' button for task with name '(.*)'$/, async function (button, taskname) {
	await tasksListPage.clickOnTask(taskname, button)
});

Then(/^.* should change the taskname to (.*) in the name field$/, async function (taskname) {
	await editHomeworkPage.setHomeworkName(taskname);
});

Then(/^.* should change the taskbody to (.*) in the taskbody field$/, async function (taskbody) {
	await editHomeworkPage.setHomeworkText(taskbody);
});

Then(/^.* should change the course to Keine Zuordnung in the dropdown$/, async function () {
	await editHomeworkPage.selectFirstCourseOnTheList();
});

Then(/^.* should toggle the allow groupwork checkbox$/, async function () {
	await editHomeworkPage.clickTeamSubmissionsCheckbox();
});

Then(/^.* should change the begin and due date$/, async function () {
	await editHomeworkPage.setAccomplishTime();
});

Then(/^.* should toggle the private task checkbox$/, async function () {
	await editHomeworkPage.clickPrivateHomeworkCheckbox();
});

Then(/^.* should toggle the public submissions checkbox$/, async function () {
	await editHomeworkPage.clickPublicSubmissionsCheckbox();
});

Then(/^.* should save the changes by clicking on the save-button$/, async function () {
	await editHomeworkPage.clickSubmitHomeworkBtn();
});

Then(/^.* goes to the tasks page$/, async function () {
	await navigationLeftPage.clickNavItemTasks();
});

Then(/^.* checks if the new taskname is (.*)$/, async function (taskname) {
	await tasksListPage.isTaskVisible(taskname, true);
});

Then(/^.* checks if the new taskbody is (.*)$/, async function (taskbody) {
	let descriptions = await tasksListPage.getDescription();
	await expect(descriptions.some((x) => x.includes(taskbody))).to.be.true;
});
