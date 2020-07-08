"use strict";

const createTask = require("../page-objects/createTask");
const loginData = require("../shared-objects/loginData");
const firstLogin = require("../shared_steps/firstLogin.js");
const loginPage = require('../page-objects/pages/loginPage');
const startPage = require('../page-objects/pages/startPage');

let shared = { loginData, performLogin };
let page = { createTask };

Given(/^The teacher arrives on the Schul-Cloud page$/, function() {
	return helpers.loadPage(shared.loginData.url, 10);
});

When(/^a teacher logs in his account using (.*) and (.*) in order to create a task$/, async function(username, password) {
		await startPage.clickLoginBtn();	
		await loginPage.performLogin(username, password);
	}
);

When(/^the teacher has accepted the data protection agreement$/, function() {
	return firstLogin.firstLoginTeacher();
});

Then(/^he should click the task-button in the dashboard-sidebar$/, function() {
	return page.createTask.clickSidebarTaskButton();
});

Then(/^he should click the create-task-button on the task page$/, function() {
	return page.createTask.clickCreateTaskButton();
});

Then(/^he should put the taskname (.*) into the name field$/, function(
	taskName
) {
	return page.createTask.putTaskName(taskName);
});

Then(/^he should put the taskBody (.*) into the body field$/, function(
	taskBody
) {
	return page.createTask.putTaskBody(taskBody);
});

Then(
	/^he should click the submit-task-button on the task-creation-form$/,
	function() {
		return page.createTask.clickSubmitTaskButton();
	}
);
Then(/^teacher goes to tasks page$/, function() {
	return page.createTask.goToTasks();
x});

Then(
	/^he should see the created task with the name (.*) on the task page$/,
	async function(taskName) {
		let tasks = await page.createTask.getTaskNames();
		await expect(taskName).to.be.oneOf(tasks);
	}
);
