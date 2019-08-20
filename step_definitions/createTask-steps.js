'use strict';

let createTask = require('../page-objects/createTask');
let loginData = require('../shared-objects/loginData');
let performLogin = require('../page-objects/performLogin');
const firstLogin = require('../shared_steps/firstLogin.js');

let shared = ({loginData, performLogin});
let page = ({createTask});

When(/^a teacher logs in his account using (.*) and (.*) in order to create a task$/, function (username,password) {
  helpers.loadPage(shared.loginData.url, 10);
  return shared.performLogin.performLogin(username, password);
});

When(/^the teacher has accepted the data protection agreement$/, function () {
  return firstLogin.firstLoginTeacher();
});

Then(/^he should click the task-button in the dashboard-sidebar$/, function () {
  return page.createTask.clickSidebarTaskButton();
});

Then(/^he should click the create-task-button on the task page$/, function () {
  return page.createTask.clickCreateTaskButton();
});

Then(/^he should put the taskname (.*) into the name field$/, function (taskName) {
  return page.createTask.putTaskName(taskName);
});

Then(/^he should click the submit-task-button on the task-creation-form$/, function () {
  return page.createTask.clickSubmitTaskButton();
});

Then(/^he should see the created task with the name (.*) on the task page$/, function (taskName) {
  return page.createTask.createTaskResult(taskName);
});