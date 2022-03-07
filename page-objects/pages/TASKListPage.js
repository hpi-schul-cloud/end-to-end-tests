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
const taskSection = '.v-window-item--active';
const taskTitle = "//div[@data-testid = 'taskTitle']";
const submittedTask = "//a[@id='submissions-tab-link']";
const studentSubmitTask = "//td[text()='Boris']";
const filterSelect = '.v-select__selections';
const courseSelect = "//div[contains(., 'Kurse...') and @class='md-list-item-content md-ripple']";
const courseCheckbox = "//div[contains(.,'";
const closeFilter = '.v-input__icon--append';
const taskOverviewLoad = '.v-application--wrap';
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

async function clickActionFromMenuOnTask(button) {
	await waitHelpers.waitUntilPageLoads();
	const actionButton = await driver.$(getTaskActionBtnSelector(button));
	await elementHelpers.clickAndWait(actionButton);
}

async function getTaskDescription() {
	await waitHelpers.waitUntilPageLoads();
	const descriptionList = await elementHelpers.getTextFromAllElements(taskDescriptionContainer);
	return descriptionList;
}

async function clickDeleteTaskButtonInPopup() {
	await waitHelpers.waitUntilLegacyPageLoads();
	await elementHelpers.clickAndWait(deleteTaskButtonInPopup);
	await driver.refresh();
}

async function clickAtTask(taskName) {
	await waitHelpers.waitUntilNuxtClientLoads();
	await driver.pause(5000);
	let clickOnThatTask = (await getTaskFromNuxtClient(taskName)).toString();
	await elementHelpers.scrollToElement(clickOnThatTask);
	await elementHelpers.clickAndWait(clickOnThatTask);
}

async function getTaskFromNuxtClient(taskName) {
	await driver.pause(3000);
	await waitHelpers.waitUntilElementIsVisible(taskOverviewLoad);
	await driver.pause(3000);
	const taskOverviewResult = await getNuxtTaskList();
	const taskIndex = taskOverviewResult.indexOf(taskName);
	let clickOnTask = taskOverviewResult[taskIndex];
	const taskInTheList = '//div[text() =' + "'" + clickOnTask + "'" + ']';
	return taskInTheList;
}

async function taskDisplayed(taskName) {
	let taskInTheList = (await getTaskFromNuxtClient(taskName)).toString();
	await waitHelpers.waitUntilElementIsPresent(taskInTheList);
}

async function taskNotDisplayed(taskName) {
	let taskInTheList = (await getTaskFromNuxtClient(taskName)).toString();
	await waitHelpers.waitUntilElementIsNotPresent(taskInTheList);
}

async function studentSubmittedTask() {
	await elementHelpers.clickAndWait(submittedTask);
	await elementHelpers.clickAndWait(studentSubmitTask);
}

async function getNuxtTaskList() {
	const listOfAllNuxtTasks = [];
	let elements = await driver.$(taskSection);
	await elements.$$(taskTitle).map(async function (element) {
		listOfAllNuxtTasks.push(await element.getText());
	});
	return listOfAllNuxtTasks;
}

async function hoverOverTaskAndClickMenu(taskName) {
	await driver.pause(5000);
	let taskTitle = await driver.$(mod_extsprintf.sprintf(taskTitleText, taskName));
	await taskTitle.scrollIntoView(false);
	if (await taskTitle.isDisplayedInViewport()){
		let xOffset = await taskTitle.getLocation('x');
		let yOffset = await taskTitle.getLocation('y');
		taskTitle.moveTo(xOffset, yOffset);
		await driver.pause(5000);
		await elementHelpers.click(mod_extsprintf.sprintf(taskActionMenu, taskName));
		await driver.pause(3000);
	}
}

async function taskTitleSelector(taskName){
	await driver.pause(3000);
	return (await driver.$(mod_extsprintf.sprintf(taskTitleText, taskName)));
}

module.exports = {
	clickCreateTaskButton,
	sortTasksLastEdited,
	getTaskDescription,
	clickCreateTaskButtonInTheCourse,
	clickDeleteTaskButtonInPopup,
	clickAtTask,
	taskDisplayed,
	taskNotDisplayed,
	studentSubmittedTask,
	getNuxtTaskList,
	hoverOverTaskAndClickMenu,
	clickActionFromMenuOnTask,
	taskTitleSelector,
};
