/*[url/homework]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const courseData = require('../../shared-objects/courseData');
const loginPage = require('../../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');

const selectors = {
	createTaskButton: "a[href='/homework/new']",
}
module.exports = {
	clickCreateTaskButton: async function() {
		await waitHelpers.waitAndClick(selectors.createTaskButton);
	},

	sortHometasks: async function () {
		let sortBtn = await driver.$(
			'#filter > div > div.md-chip.md-theme-default.md-deletable.md-clickable > div'
		);
		await sortBtn.click();
		let select = await driver.$('#selection-picker > div > div');
		await select.click();
		let lastedited = await driver.$('body > div.md-select-menu.md-menu-content-bottom-start.md-menu-content-small.md-menu-content.md-theme-default > div > ul > li:nth-child(2) > button'
		);
		await lastedited.click();
		let ok = await driver.$('.md-button.md-primary.md-theme-default > div > div');
		await ok.click();
		await driver.pause(1500);
	},
	returnTaskChildIndex: async function (taskname) {
		let areThereAnyTasks = await this.areThereAnyTasks();
		if (areThereAnyTasks) {
			const containerWithTasks = await driver.$('.col-xl-12');
			let numOfElems = await containerWithTasks.$$('li');
			for (var i = 1; i < numOfElems.length; i++) {
				let nameOfTheTaskSelector = await driver.$('.col-xl-12 > li:nth-child(' + i + ') > .content > h2');
				let nameOfTheTask = await nameOfTheTaskSelector.getText();
				if (await nameOfTheTask.includes(taskname)) {
					return i ;
				}
			}

		};
		return 0;
	},
	areThereAnyTasks: async function () {
		let elementWithTasks = await driver.$$('.col-xl-12');
		return elementWithTasks.length > 0 ? true : false;
	},
	chooseTaskAmongAllTasks: async function (taskname) {
		let taskindex = await this.returnTaskChildIndex(taskname);
		if (taskindex > 0 ) {
			let task = await driver.$('.col-xl-12 > li:nth-child(' + taskindex + ') > a > span.more');
			await task.click();
			await driver.pause(1500);
			let selectorToBeLoaded = await driver.$('#page-title');
			await selectorToBeLoaded.waitForExist(2000);

		} else {
			console.log("No such task was found");
		}
	},

	gotoTasks: async function () {
		await elementHelpers.loadPage(courseData.urlHomework, 20);
	},

	verify: async function (taskname) {
		await this.gotoTasks();
		await this.sortHometasks();
		await this.chooseTaskAmongAllTasks(taskname);
		let pageTitleSelector = await driver.$('#page-title');
		let courseAndTaskName = await pageTitleSelector.getText();
		let tasknameArray = await courseAndTaskName.split("- ");
		let foundtaskName = tasknameArray[1];
		await expect(taskname).to.equal(foundtaskName);
	},

	teacherLogsIn: async function () {
		await this.userLogsOut();
		await loginPage.performLogin(loginPage.defaultLoginData.defaultTeacherUsername, loginPage.defaultLoginData.defaultTeacherpassword);
	},

	privateTaskVerify: async function () {
		let areThereAnyTasks = await this.areThereAnyTasks();
		if (areThereAnyTasks == true) {
			let taskNames = await Promise.all(
				(await driver.$$('#homeworks > ol > div > li > a')).map(
					async element => await element.getText()
				));
			await expect(taskNames).not.to.include(taskname);
		}
		await expect(areThereAnyTasks).to.be.false;
	},

	userLogsOut: async function () {
		await elementHelpers.loadPage(courseData.urlLogout, 20);
	},

	uploadAHomework: async function () {
		//making the upload-element visible to selenium
		change_visibility = '$x("//*[@id="main-content"]/div/section[1]/div/div/div[1]/input").css("visibility,"visible");';
		change_display = '$x("//*[@id="main-content"]/div/section[1]/div/div/div[1]/input").css("display,"block");';
		await driver.execute_script(change_visibility);
		await driver.execute_script(change_display);

		const path = require('path');
		const filePath = path.join(__dirname, '../shared-objects/fileUpldFolder/upload.txt');
		await driver.$x(courseData.uploadBtn).send_keys(filePath);
	},
};

