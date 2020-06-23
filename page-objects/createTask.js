"use strict";

const createTaskData = require("../shared-objects/createTaskData"),
	shared = { createTaskData };

module.exports = {
	clickSidebarTaskButton: async function() {
		await helpers.waitAndClick(shared.createTaskData.elem.sidebarTaskButton);
	},

	clickCreateTaskButton: async function() {
		await helpers.waitAndClick(shared.createTaskData.elem.createTaskButton);
	},

	clickSubmitTaskButton: async function() {
		await helpers.waitAndClick(shared.createTaskData.elem.submitTaskButton);
	},

	putTaskName: async function(taskName) {
		const nameField = await driver.$(shared.createTaskData.elem.taskNameField);
		await nameField.setValue(taskName);
	},

	putTaskBody: async function(taskBody) {
		await driver.pause(2000);
		await driver.switchToFrame(0);
		const body = await driver.$("body");
		await body.setValue(taskBody);
		await driver.switchToParentFrame();
	},

	goToTasks: async function() {
		await helpers.loadPage(createTaskData.elem.url, 10);
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
