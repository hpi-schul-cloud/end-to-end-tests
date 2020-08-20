'use strict';

const path = require('path');

const waitHelpers = require('../runtime/helpers/waitHelpers.js');
const dateTimeHelpers = require('../runtime/helpers/dateTimeHelpers.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');
const firstLogin = require('../shared_steps/firstLogin.js');
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");
// TODO: choose course, SORT

const click = async (selector) => (await driver.$(selector)).click();

module.exports = {
	// add homework related functions (as a teacher)

	setHometaskText: async function () {
		await driver.pause(global.SHORT_WAIT_MILLIS);
		const editorContent = await driver.$('.ck-content');
		const message = 'Here is some TEXT!';
		await editorContent.setValue(message);
	},
	setAccomplishTime: async function () {
		var begin = await dateTimeHelpers.dateToString();
		await driver.execute(`document.querySelector("#availableDate").value="${begin}"`);
		var end = await dateTimeHelpers.randomDate();
		await driver.execute(`document.querySelector("#dueDate").value="${end}"`);
	},
	clickAdd: async function () {
		let container = await driver.$('#homework-form');
		let addBtn = await container.$('button[type="submit"]');
		await addBtn.click();
		let selectorToBeLoaded = await driver.$('#homeworks');
		await selectorToBeLoaded.waitForExist(2000);
	},

	

	sortHometasks: async function () {
		let sortBtn = await driver.$('#filter > div > div.md-chip.md-theme-default.md-deletable.md-clickable > div');
		await sortBtn.click();
		let select = await driver.$('#selection-picker > div > div');
		await select.click();
		let lastedited = await driver.$(
			'body > div.md-select-menu.md-menu-content-bottom-start.md-menu-content-small.md-menu-content.md-theme-default > div > ul > li:nth-child(2) > button',
		);
		await lastedited.click();
		let ok = await driver.$('.md-button.md-primary.md-theme-default > div > div');
		await ok.click();
		await driver.pause(1500);
	},
	returnTaskIndex: async function (taskname) {
		let areThereAnyTasks = await this.areThereAnyTasks();
		if (areThereAnyTasks == true) {
			const containerWithTasks = await driver.$('.col-xl-12');
			await containerWithTasks.waitForExist(2000);
			let numOfElems = await containerWithTasks.$$('li');
			for (var i = 1; i <= numOfElems.length; i++) {
				let nameOfTheTaskSelector = await driver.$('.col-xl-12 > li:nth-child(' + i + ') > .content > h2');
				let nameOfTheTask = await nameOfTheTaskSelector.getText();
				if (await nameOfTheTask.includes(taskname)) {
					return i;
				}
			}
		}
	},
	
	chooseTaskAmongAllTasks: async function (taskname) {
		let taskindex = await this.returnTaskIndex(taskname);
		if (taskindex != false) {
			let task = await driver.$('.col-xl-12 > li:nth-child(' + taskindex + ') > .content > h2');
			await task.click();
			await driver.pause(1500);
			let selectorToBeLoaded = await driver.$('#page-title');
			await selectorToBeLoaded.waitForExist(2000);
		} else {
			console.log('No such task was found');
			await driver.close();
		}
	},

	verify: async function (taskname) {
		await this.gotoTasks();
		await this.sortHometasks();
		await this.chooseTaskAmongAllTasks(taskname);
		let pageTitleSelector = await driver.$('#page-title');
		let courseAndTaskName = await pageTitleSelector.getText();
		let tasknameArray = await courseAndTaskName.split('- ');
		let taskName = tasknameArray[1];
		await expect(taskName).to.equal(taskname);
	},

	
	

	
	// student helpers
	
	

	// teacher helpers
	
	evaluateSubmission: async function () {
		let submittedTasks = await driver.$('.usersubmission');
		await submittedTasks.click();
		let evaluationTab = await driver.$('#comment-tab-link');
		await evaluationTab.click();
		let evaluation = await driver.$(courseData.elem.evaluationInProcent);
		await evaluation.setValue(95);
		await driver.pause(global.SHORT_WAIT_MILLIS);
		let textField = await driver.$('.ck-content');
		let comment = 'sehr gut!';
		await textField.setValue(comment);
	},

	gotoTasks: async function () {
		await elementHelpers.loadPage(courseData.urlHomework, 20);
	},

	submitHomework: async function (taskName, student) {
		await this.gotoTasks();
		await waitHelpers.waitAndClick(`*=${taskName}`);
		await this.switchToSubmissionTab();
		await this.submitSolutionForTheHometask();
	},

	

	testFileUploadSuccess: async function (taskName, file, student) {
		// navigate to grade tab
		await this.teacherShowGradeTabForFirstSubmission();

		if (process.env.CI) {
			console.warn('S3 is not available on CI. The files were never uploaded.');
			return;
		}
		await this.canSeeFile(file);
		const mainWindow = await driver.getWindowHandle();
		await click(`a*=${file.name}`);

		await driver.pause(1000);
		const fileUrl = await this.getCurrentTabUrl();
		await driver.switchToWindow(mainWindow);

		// ensure the student sees the file
		await this.userLogsOut();
		await firstLogin.pupilLogin(student.login, student.password);
		await this.gotoTasks();
		await click(`*=${taskName}`);
		await click('a*=Bewertung');

		await this.canSeeFile(file);

		// ensure the student can download the file
		await click(`a*=${file.name}`);
		await driver.pause(1000);
		const studentFileUrl = await this.getCurrentTabUrl();

		// After all the redirect, the localstack filepath should be the same (ignoring the auth-arguments in the query)
		expect(studentFileUrl.origin).to.equal(fileUrl.origin);
		expect(studentFileUrl.pathname).to.equal(fileUrl.pathname);
	},

	

	canSeeFile: async function (file) {
		const gradeFilesList = await driver.$('.list-group-files');
		await gradeFilesList.waitForDisplayed();
		expect(await gradeFilesList.getText()).to.contain(file.name);
	},

	getCurrentTabUrl: async function () {
		const handles = await driver.getWindowHandles();
		// switch to newest tab
		await driver.switchToWindow(handles[handles.length - 1]);

		return new URL(await driver.getUrl());
	},
};
