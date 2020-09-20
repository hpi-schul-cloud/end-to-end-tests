/*[url/homework]*/
"use strict";
const { CLIENT } = require("../../shared-objects/servers");
const waitHelpers = require("../../runtime/helpers/waitHelpers");
const elementHelpers = require("../../runtime/helpers/elementHelpers");
const navigationLeftPage = require('../../page-objects/pages/NavigationLeftPage.js');
const urlHomework = `${CLIENT.URL}/homework`;

const selectors = {
	createTaskButton:"a[href='/homework/new']",
	//sortHometasks:
	sortBtn: "#filter > div > div.md-chip.md-theme-default.md-deletable.md-clickable > div",
	select: "#selection-picker > div > div",
	lastedited: "body > div.md-select-menu.md-menu-content-bottom-start.md-menu-content-small.md-menu-content.md-theme-default > div > ul > li:nth-child(2) > button",
	submitBtn: ".md-button.md-primary.md-theme-default > div > div",
	pageTitleSelector: "#page-title",
	elementWithTasks: ".col-xl-12",
	tasksContainer: "#homeworks > ol > div > li",
}

module.exports = {
	goToHomeworkListPage: async function () {
		await elementHelpers.loadPage(urlHomework, 20);
	},

	clickCreateTaskButton: async function () {
		await waitHelpers.waitAndClick(selectors,createTaskButton);
	},

	sortHometasks: async function () {
		let sortBtn = await driver.$(selectors.sortBtn);
		await sortBtn.click();
		let select = await driver.$(selectors.select);
		await select.click();
		let lastedited = await driver.$(selectors.lastedited);
		await lastedited.click();
		let submitBtn = await driver.$(selectors.submitBtn);
		await submitBtn.click();
		await driver.pause(1500);
	},
	returnTaskChildIndex: async function (taskname) {
		let areThereAnyTasks = await this.areThereAnyTasks();
		if (areThereAnyTasks) {
			const containerWithTasks = await driver.$(".col-xl-12");
			let numOfElems = await containerWithTasks.$$("li");
			for (var i = 1; i < numOfElems.length; i++) {
				let nameOfTheTaskSelector = await driver.$(
					".col-xl-12 > li:nth-child(" + i + ") > .content > h2"
				);
				let nameOfTheTask = await nameOfTheTaskSelector.getText();
				if (await nameOfTheTask.includes(taskname)) {
					return i;
				}
			}
		}
		return 0;
	},

	chooseTaskAmongAllTasks: async function (taskname) {
		let taskindex = await this.returnTaskChildIndex(taskname);
		if (taskindex > 0) {
			let task = await driver.$(
				".col-xl-12 > li:nth-child(" + taskindex + ") > a > span.more"
			);
			await task.click();
			await driver.pause(1500);
			let selectorToBeLoaded = await driver.$(selectors.pageTitleSelector);
			await selectorToBeLoaded.waitForExist(2000);
		} else {
			console.log("No such task was found");
		}
	},

	verify: async function (taskname) {
		await this.goToHomeworkListPage();
		await this.sortHometasks();
		await this.chooseTaskAmongAllTasks(taskname);
		let pageTitleSelector = await driver.$(selectors.pageTitleSelector);
		let courseAndTaskName = await pageTitleSelector.getText();
		let tasknameArray = await courseAndTaskName.split("- ");
		let foundtaskName = tasknameArray[1];
		await expect(taskname).to.equal(foundtaskName);
	},

	areThereAnyTasks: async function () {
		let elementWithTasks = await driver.$$(selectors.elementWithTasks);
		return elementWithTasks.length > 0 ? true : false;
	},

	getAllTasks: async function () {
		return await Promise.all(
			(await driver.$$("h2.h6")).map(
				async (element) => await element.getText()
			)
		);
	},

	isTaskVisible: async function (taskname) {
		let taskNames = await this.getAllTasks();
		let isTaskVisible = false;
		if (taskNames.length > 0) {
			for (let i = 0; i < taskNames.length; i++) {
				if (taskNames[i].includes(taskname)) {
					isTaskVisible = true;
					return isTaskVisible;
				} else {
					return isTaskVisible;
				}
			}
		} else {
			return isTaskVisible;
		}
	},

	userFindsTheTask: async function (taskname) {
		let areThereAnyTasks = await driver.$$(selectors.tasksContainer);
		await expect(areThereAnyTasks.length).not.to.equal(0);
		for (var i = 1; i <= areThereAnyTasks.length; i++) {
			let taskSelector = await driver.$(
				"#homeworks > ol > div > li:nth-child(" + i + ") .h5.title"
			);
			let tasknameOnPage = await taskSelector.getText();
			if (tasknameOnPage == taskname) {
				await taskSelector.click();
				await driver.pause(1000);
			}
		}
	},

	goToPrivateHomeworkArea: async function(){
    	await navigationLeftPage.clickNavItemTasks();
    	await navigationLeftPage.clickNavItemTasksPrivate();
	}
	
};
