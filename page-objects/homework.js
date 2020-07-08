'use strict';

const helpers = require('../runtime/helpers.js')
const courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');
const copyCourse = require('../page-objects/copyCourse');
const firstLogin = require('../shared_steps/firstLogin.js');
const createCourse = require('../page-objects/createCourse');
const teacherLogin = require('../page-objects/teacherLogin');
// TODO: choose course, SORT

module.exports = {
	// add homework related functions (as a teacher)
	clickCreateNewTaskInTheCourse: async function(coursename) {
		await copyCourse.chooseCourse(coursename);
		let homeworktab = await driver.$('.tabs button[data-testid="hometasks"]');
		await homeworktab.click();
		await helpers.waitAndClick(courseData.elem.addHomeworkBtn);
	},
	setPrivate: async function() {
		await helpers.waitAndClick(courseData.elem.checkbox);
	},
	addBasicHometask: async function(coursename, taskname) {
		await this.clickCreateNewTaskInTheCourse(coursename);
		let nameSelector = await driver.$(courseData.elem.homeworkName);
		await nameSelector.setValue(taskname);
		await helpers.waitAndClick(courseData.elem.teamworkActivate);
		await this.setAccomplishTime();
		await this.setHometaskText();
		await helpers.waitAndClick(courseData.elem.submitAddHomeworkBtn);
	},
	addPrivateHometask: async function(coursename, taskname) {
		await this.clickCreateNewTaskInTheCourse(coursename);
		let nameSelector = await driver.$(courseData.elem.homeworkName);
		await nameSelector.setValue(taskname);
		await helpers.waitAndClick(courseData.elem.teamworkActivate);
		await this.setAccomplishTime();
		await this.setHometaskText();
		await this.setPrivate();
		await helpers.waitAndClick(courseData.elem.submitAddHomeworkBtn);
	},
	setHometaskText: async function() {
		await driver.pause(global.SHORT_WAIT_MILLIS);
		const editorContent = await driver.$('.ck-content');
		const message = 'Here is some TEXT!';
		await editorContent.setValue(message);
	},
	setAccomplishTime: async function() {
		var begin = await helpers.dateToString();
		await driver.execute(`document.querySelector("#availableDate").value="${begin}"`);
		var end = await helpers.randomDate();
		await driver.execute(`document.querySelector("#dueDate").value="${end}"`);
	},
	clickAdd: async function() {
		let container = await driver.$('#homework-form');
		let addBtn = await container.$('button[type="submit"]');
		await addBtn.click();
		let selectorToBeLoaded = await driver.$('#homeworks');
		await selectorToBeLoaded.waitForExist(2000);
	},

	gotoTasks: async function() {
		await helpers.loadPage(courseData.urlHomework, 20);
	},

	gotoTasksTab: async function() {
	let hometasksTab = await driver.$('button[data-testid="hometasks"]');
	await hometasksTab.click();
	await driver.pause(1000);
	},

	sortHometasks: async function() {
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
	returnTaskIndex: async function(taskname) {
		let areThereAnyTasks= await this.areThereAnyTasks();
		if (areThereAnyTasks==true) {
			const containerWithTasks = await driver.$('.col-xl-12');
			await containerWithTasks.waitForExist(2000);
			let numOfElems = await containerWithTasks.$$('li');
			for (var i=1; i<=numOfElems.length-1; i++) {
					let nameOfTheTaskSelector = await driver.$('.col-xl-12 > li:nth-child('+i+') > .content > h2' );
					let nameOfTheTask = await nameOfTheTaskSelector.getText();
					if(await nameOfTheTask.includes(taskname)) {
						return i;
					}
			}
		}
		return;
	},
	areThereAnyTasks: async function() {
		let elementWithTasks = await driver.$$('.col-xl-12');
		return elementWithTasks.length > 0 ? true : false;
	},
	chooseTaskAmongAllTasks: async function(taskname) {
		let taskindex = await this.returnTaskIndex(taskname);
		if(taskindex!=false) {
			let task = await driver.$('.col-xl-12 > li:nth-child('+taskindex+') > .content > h2');
			await task.click();
			await driver.pause(1500);
			let selectorToBeLoaded = await driver.$('#page-title');
			await selectorToBeLoaded.waitForExist(2000);

		} else {
		console.log("No such task was found");
		await driver.close();
		}
	},

	verify: async function(taskname) {
		await this.gotoTasks();
		await this.sortHometasks();
		await this.chooseTaskAmongAllTasks(taskname);
		let pageTitleSelector = await driver.$('#page-title');
		let courseAndTaskName = await pageTitleSelector.getText();
		let tasknameArray = await courseAndTaskName.split("- ");
		let taskName = tasknameArray[1];
		await expect(taskName).to.equal(taskname);
	},

	// other user logs in to verify
	studentLogsIn: async function(username, password) {
		await this.userLogsOut();
		await firstLogin.pupilLogin(username,password);
		await firstLogin.firstLoginPupilFullAge(username, password);
	},
	teacherLogsIn: async function() {
		await this.userLogsOut();
		await teacherLogin.performLogin(Login.defaultTeacherUsername,Login.defaultTeacherpassword);
	},
	goToTasksOfTheCourse: async function (coursename) {
		await createCourse.goToCourses();
		await copyCourse.chooseCourse(coursename);
		await this.gotoTasksTab();
	},
	studentLogsInAndGoesToTasksOfTheCourse: async function(username, password,coursename) {
		await this.userLogsOut();
		await firstLogin.pupilLogin(username, password);
		await firstLogin.firstLoginPupilFullAge(username,password);
		await this.goToTasksOfTheCourse(coursename);
	},
	privateTaskVerify: async function() {
		let areThereAnyTasks = await this.areThereAnyTasks();
		if (areThereAnyTasks==true) {
		let taskNames = await Promise.all(
			(await driver.$$('#homeworks > ol > div > li > a')).map(
				async element => await element.getText()
			));
		await expect(taskNames).not.to.include(taskname);
		return;
		}
		await expect(areThereAnyTasks).to.be.false;
	},

	userLogsOut: async function() {
		await helpers.loadPage(courseData.urlLogout, 20);
	},
	// student helpers
	userFindsTheTask: async function(taskname) {
		let areThereAnyTasks = await driver.$$('#homeworks > ol > div > li');
		await expect(areThereAnyTasks.length).not.to.equal(0);
		for (var i=1; i<=areThereAnyTasks.length; i++) {
			let taskSelector = await driver.$('#homeworks > ol > div > li:nth-child('+i+') .h5.title');
			let tasknameOnPage = await taskSelector.getText();
			if(tasknameOnPage==taskname){
				await taskSelector.click();
				await driver.pause(1000);
			}
	}
	},
	switchToSubmissionTab: async function() {
		let submissionTab = "#submission-tab-link";
		await helpers.waitAndClick(submissionTab);
	},
	submitSolutionForTheHometask: async function() {
		await driver.switchToFrame(0);
		let iframeBody = await driver.$('body');
		let assignmentText = 'here is some text which I want to submit';
		await iframeBody.setValue(assignmentText);
		await driver.switchToParentFrame();
		let container = await driver.$('#submission');
		let submitBtn = await container.$('button[type="submit"]');
		await submitBtn.click();
		await driver.pause(1500);
	},

	studentEditsTextHomeworkAndSubmits: async function() {
		await this.switchToSubmissionTab();
		await this.submitSolutionForTheHometask();
	},

	// teacher helpers
	hasTheStudentSubmittedTheTask: async function(studentname) {
		let submissionTab = "#submissions-tab-link";
		await helpers.waitAndClick(submissionTab);
		let submitted_by_box = await driver.$('#submissions .groupNames > span');
		let submitted_by_name = await submitted_by_box.getText();
		await expect(submitted_by_name).to.contain(studentname);
	},

	teacherLogsInAndCanSeeTheTextSubmission: async function(coursename, taskname, studentname) {
		await this.teacherLogsIn();
		await firstLogin.firstLoginTeacher();
		await createCourse.goToCourses();
		await copyCourse.chooseCourse(coursename);
		await this.gotoTasksTab();
		await this.userFindsTheTask(taskname);
		await this.hasTheStudentSubmittedTheTask(studentname);
	},
	evaluateSubmission: async function() {
		let submittedTasks = await driver.$('.usersubmission');
		await submittedTasks.click();
		let evaluationTab = await driver.$('#comment-tab-link');
		await evaluationTab.click();
		let evaluation = await driver.$(courseData.elem.evaluationInProcent);
		await evaluation.setValue(95);
		await driver.switchToFrame(0);
		let body = await driver.$('body');
		let comment = 'sehr gut!';
		await body.setValue(comment);
		await driver.switchToParentFrame();
	},

	uploadAHomework: async function() {
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
