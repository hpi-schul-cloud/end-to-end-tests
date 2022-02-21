/*[url/homework]*/
'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers');
const navigationLeftPage = require('./NavigationLeftPage.js');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const { expect } = require('chai');
const mod_extsprintf = require('extsprintf');

const selectorCreateTaskButton = '[data-testid = "addTask"]';
const selectorCreateTaskBtnInTheCourse = '.col-sm-12.add-button > a';
const selectorSortBtn = '#filter .md-clickable > div';
const select = '#selection-picker > div > div';
const lastedited =
	'body > div.md-select-menu.md-menu-content-bottom-start.md-menu-content-small.md-menu-content.md-theme-default > div > ul > li:nth-child(2) > button';
const submitBtn = '.md-button.md-primary.md-theme-default > div > div';
const taskTitleContainer = '.assignment.card .title';
const taskDescriptionContainer = '.assignment .text-muted.ckcontent';
const taskContainer = '.homework li.card';
const deleteTaskButtonInPopup = '.delete-modal button.btn-submit';
const taskSection = ".v-window-item--active";
const taskTitle = "a[aria-label*='Aufgabe']>div div[data-testid*='task']:nth-child(2)";
const submittedTask = "//a[@id='submissions-tab-link']";
const studentSubmitTask = "//td[text()='Boris']";
const filterSelect = '.v-select__selections';
const courseSelect = "//div[contains(., 'Kurse...') and @class='md-list-item-content md-ripple']";
const courseCheckbox = "//div[contains(.,'";
const closeFilter = '.v-input__icon--append';
const taskTitleText = "//a[div/div[@data-testid='taskTitle' and text() = '%s']]";
const taskActionMenu = "//a[div/div[@data-testid='taskTitle' and text() = '%s']]/div/button[starts-with(@data-testid,'task-menu')]";

const taskActionMenuButton = {
	archive: "//*[text()[contains(.,'Abschließen')]]",
	unarchive: "//*[text()[contains(.,'Wiederherstellen')]]",
	edit: "//*[text()[contains(.,'Bearbeiten')]]",
	copy: '.fa-copy',
	delete: '.btn-delete',
	taskOpen: '.assignment span.more',
};

function getTaskActionBtnSelector(buttonAction) {
	let btnSel = '';
	const action = buttonAction.toLowerCase();
	switch (action) {
		case 'archive':
			btnSel = taskActionMenuButton.archive;
			break;
		case 'unarchive':
			btnSel = taskActionMenuButton.unarchive;
			break;
		case 'edit':
			btnSel = taskActionMenuButton.edit;
			break;
		case 'copy':
			btnSel = taskActionMenuButton.copy;
			break;
		case 'delete':
			btnSel = taskActionMenuButton.delete;
			break;
		case 'task open':
			btnSel = taskActionMenuButton.taskOpen;
			break;
		default:
			console.error(`This action button: ${buttonAction} does not exist on the list of possible choices`);
			break;
	}
	return btnSel;
}

async function clickCreateTaskButton() {
	await elementHelpers.clickAndWait(selectorCreateTaskButton);
}

async function clickCreateTaskButtonInTheCourse() {
	await elementHelpers.clickAndWait(selectorCreateTaskBtnInTheCourse);
}

async function sortTasksLastEdited() {
	await elementHelpers.click(selectorSortBtn);
	await elementHelpers.click(select);
	await elementHelpers.click(lastedited);
	await elementHelpers.clickAndWait(submitBtn);
	await waitHelpers.waitUntilPageLoads();
}

/*
Already tried these three options:

- Get the list of array ---> Check course is in the list or not ---> Problem: Course name also adds  '(x)'
- Used the waiterHeplers method waitAndSetValue but its not working due to wrapper of div's and the selector is not accessible
- Tried to type using javascript command using execute API in webdriver.io but its also not working.

async function sortTasksCourse(courseName) {
	await elementHelpers.click(filterSelect);
	await elementHelpers.click(courseSelect);
	//need help with the part below... it choses wrong course
	let courseSelector = courseCheckbox + courseName + "')]";
	await elementHelpers.clickAndWait(courseSelector);
	await elementHelpers.clickAndWait(closeFilter);
	await elementHelpers.clickAndWait(check);
	await elementHelpers.clickAndWait(submitBtn);
	await waitHelpers.waitUntilPageLoads();
}*/

async function getListOfTaskTitles() {
	await waitHelpers.waitUntilElementIsNotVisible('.loaded #MathJax_Message');
	return await elementHelpers.getTextFromAllElements(taskTitleContainer);
}

async function getListOfTask() {
	await waitHelpers.waitUntilElementIsNotVisible('.loaded #MathJax_Message');
	return elementHelpers.getListOfAllElements(taskContainer);
}

async function clickOnTask(button) {
	await waitHelpers.waitUntilPageLoads();
	const actionButton = await driver.$(getTaskActionBtnSelector(button));
	await elementHelpers.clickAndWait(actionButton);
}

async function isTaskVisible(taskname, expectedValue) {
	const allTasks = await getListOfTaskTitles();
	const isTaskOnList = allTasks.some((element) => element.includes(taskname));
	const fillString = !expectedValue ? ' not' : '';
	const msg = `Task with name ${taskname} is${fillString} visible on the list: \n`;
	const resultMsg = 'Expected: ' + taskname + ', Actual: ' + allTasks;
	await expect(isTaskOnList, msg + resultMsg).to.equal(expectedValue);
	await waitHelpers.waitUntilPageLoads();
}

async function getTaskDescription() {
	await waitHelpers.waitUntilPageLoads();
	const descriptionList = await elementHelpers.getTextFromAllElements(taskDescriptionContainer);
	return descriptionList;
}

async function goToPrivateTasksArea() {
	await navigationLeftPage.clickNavItemTasks();
	await navigationLeftPage.clickNavItemTasksPrivate();
}

async function clickDeleteTaskButtonInPopup() {
	await waitHelpers.waitUntilLegacyPageLoads();
	await elementHelpers.clickAndWait(deleteTaskButtonInPopup);
	await driver.refresh();
}

async function clickAtTask(taskName) {
	await waitHelpers.waitUntilNuxtClientLoads();
	let clickOnThatTask = (await getTaskFromTaskOverview(taskName));
	if (clickOnThatTask === undefined){
		let isTaskClickable = new Boolean (false);
		while (!isTaskClickable){
			elementHelpers.scrollToElement(clickOnThatTask);
			await waitHelpers.waitUntilElementIsVisible(clickOnThatTask);
			if (clickOnThatTask.isDisplayedInViewport()){
				isTaskClickable = true;
			}
		}
	}
	if (clickOnThatTask.isDisplayedInViewport()) {
		await elementHelpers.clickAndWait(clickOnThatTask);
	}else{
		await elementHelpers.scrollToElement(clickOnThatTask);
		await elementHelpers.clickAndWait(clickOnThatTask);
	}
}

async function getTaskFromTaskOverview(taskName) {
	let tasksOnThePage = [];
	await waitHelpers.waitUntilNuxtClientLoads();
	await waitHelpers.waitUntilElementIsPresent(taskSection);
	await driver.$(taskSection).$$(taskTitle).forEach(async function (element)  {
		tasksOnThePage.push(await element.getText());
	})
	let isTaskInTheList = new Boolean(false);
	isTaskInTheList =  (tasksOnThePage.includes(taskName)) ? driver.$(mod_extsprintf.sprintf(taskTitleText, taskName)) : false ;
	return isTaskInTheList
}

async function taskDisplayed(taskName) {
	let taskInTheList = (await getTaskFromTaskOverview(taskName));
	await waitHelpers.waitUntilElementIsPresent(taskInTheList);
}

async function taskNotDisplayed(taskName) {
	let taskInTheList = (await getTaskFromTaskOverview(taskName));
	expect(taskInTheList).to.equal(false);
}

async function studentSubmittedTask() {
	await elementHelpers.clickAndWait(submittedTask);
	await elementHelpers.clickAndWait(studentSubmitTask);
}

async function hoverOverTaskAndClickMenu(taskName) {
	let taskTitle = await driver.$(mod_extsprintf.sprintf(taskTitleText, taskName));
	await waitHelpers.waitUntilNuxtClientLoads();
	if (taskTitle.isDisplayedInViewport()){
		if (waitHelpers.waitUntilElementIsVisible(taskTitle)){
			await elementHelpers.scrollToElement(taskTitle);
			elementHelpers.click(mod_extsprintf.sprintf(taskActionMenu, taskName));
		}
	}else {
		await elementHelpers.scrollToElement(taskTitle);
		await waitHelpers.waitUntilElementIsVisible(taskTitle);
		await elementHelpers.click(mod_extsprintf.sprintf(taskActionMenu, taskName));
	}
}

async function clickTaskOnActionMenu(button){

	await elementHelpers.hoverOverMenuOptions(getTaskActionBtnSelector(button))
}

async function taskTitleSelector(taskName){
	await waitHelpers.waitUntilNuxtClientLoads();
	return (await driver.$(mod_extsprintf.sprintf(taskTitleText, taskName)));
}

module.exports = {
	clickCreateTaskButton,
	sortTasksLastEdited,
	getListOfTaskTitles,
	getListOfTask,
	clickOnTask,
	isTaskVisible,
	goToPrivateTasksArea,
	getTaskDescription,
	clickCreateTaskButtonInTheCourse,
	clickDeleteTaskButtonInPopup,
	clickAtTask,
	taskDisplayed,
	taskNotDisplayed,
	studentSubmittedTask,
	hoverOverTaskAndClickMenu,
	clickTaskOnActionMenu,
	taskTitleSelector,
};
