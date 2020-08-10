"use strict";

const waitHelpers = require('../runtime/helpers/waitHelpers.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const createTaskData = require("../shared-objects/createTaskData"),
	shared = { createTaskData };

module.exports = {
	clickSidebarTaskButton: async function() {
		await waitHelpers.waitAndClick(shared.createTaskData.elem.sidebarTaskButton);
	},

	clickCreateTaskButton: async function() {
		await waitHelpers.waitAndClick(shared.createTaskData.elem.createTaskButton);
	},

	clickSubmitTaskButton: async function() {
		await waitHelpers.waitAndClick(shared.createTaskData.elem.submitTaskButton);
	},

	putTaskName: async function(taskName) {
		const nameField = await driver.$(shared.createTaskData.elem.taskNameField);
		await nameField.setValue(taskName);
	},

	putTaskBody: async function(taskBody) {
		await driver.pause(global.SHORT_WAIT_MILLIS);
		const editorContent = await driver.$(".ck-content");
		await editorContent.setValue(taskBody);
	},

	goToTasks: async function() {
		await elementHelpers.loadPage(createTaskData.elem.url, 10);
		const selectorToBeLoaded = await driver.$(".col-xl-12");
		await selectorToBeLoaded.waitForExist(3000);
	},

	getTaskNames: async function() {
		await driver.pause(1000 * 10);
		const container = await driver.$(".col-xl-12");
		const tasksArray = await container.$$("li");
		const namesArray = [];
		for (var i = 1; i <= tasksArray.length; i++) {
			const task = await container.$(
				"li:nth-child(" + i + ") > a:nth-child(1)"
			);
			const taskName = (await task.getAttribute("title"))
				.replace("Details der Aufgabe: '", "")
				.replace(/'$/gi, "");
			await namesArray.push(taskName);
		}
		return namesArray;
	}
};
