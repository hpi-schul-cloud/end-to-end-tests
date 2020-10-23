/*[url/homework]*/
"use strict"

const waitHelpers = require("../../runtime/helpers/waitHelpers")
const navigationLeftPage = require("./NavigationLeftPage.js")
const elementHelpers=require('../../runtime/helpers/elementHelpers');

const selectorCreateTaskButton = '.btn.btn-primary.btn-add.create';
const selectorCreateTaskBtnInTheCourse = '.col-sm-12.add-button > a';
const selectorSortBtn = "#filter .md-clickable > div"
const select = "#selection-picker > div > div"
const lastedited =
    "body > div.md-select-menu.md-menu-content-bottom-start.md-menu-content-small.md-menu-content.md-theme-default > div > ul > li:nth-child(2) > button"
const submitBtn = ".md-button.md-primary.md-theme-default > div > div"
const pageTitleSelector = "#page-title"
const taskElement = ".col-xl-12"
const taskTitleContainer = ".assignment.card .title"
const taskDescriptionContainer = ".assignment .text-muted.ckcontent"
const taskContainer = '.homework li.card';

const taskButton = {
	archive: '.fa-archive',
	undoArchive: '.fa-mail-reply',
	edit: '.fa-edit',
	copy: '.fa-copy',
	delete: '.btn-delete',
	taskOpen: '.assignment span.more',
};

function getTaskActionBtnSelector(buttonAction) {
        let btnSel = '';
        const action = buttonAction.toLowerCase();
        switch (action) {
            case 'archive':
                btnSel = taskButton.archive;
                break;
            case 'undo archive':
                btnSel = taskButton.undoArchive;
                break;
            case 'edit':
                btnSel = taskButton.edit;
                break;
            case 'copy':
                btnSel = taskButton.copy;
                break;
            case 'delete':
                btnSel = taskButton.delete;
                break;
            case 'task open':
                btnSel = taskButton.taskOpen;
                break;
            default:
                console.error(`This action button: ${buttonAction} does not exist on the list of possible choices`);
                break;
        }
        return btnSel;
}

async function clickCreateTaskButton () {
    await elementHelpers.clickAndWait(selectorCreateTaskButton)
}

async function clickCreateTaskButtonInTheCourse () {
    await elementHelpers.clickAndWait(selectorCreateTaskBtnInTheCourse)
}

async function sortHometasks () {
    await elementHelpers.click(selectorSortBtn)
    await elementHelpers.click(select)
    await elementHelpers.click(lastedited)
    await elementHelpers.clickAndWait(submitBtn)
    await waitHelpers.waitUntilAjaxIsFinished();
}

async function getTaskIndex (taskName) {
    const listOfTaskTitles = await getListOfTaskTitles();
    var index = listOfTaskTitles.findIndex((element) => element.includes(taskName));
    return index;
}

async function getListOfTaskTitles () {
    await waitHelpers.waitUntilElementIsNotVisible(".loaded #MathJax_Message");
    return elementHelpers.getTextFromAllElements(taskTitleContainer);
}

async function getListOfTask() {
    await waitHelpers.waitUntilElementIsNotVisible(".loaded #MathJax_Message");
    return elementHelpers.getListOfAllElements(taskContainer);
}

async function clickOnTask(taskName, button) {
    await waitHelpers.waitUntilAjaxIsFinished();
    const taskList = await getListOfTask();
    const taskIndex = await getTaskIndex(taskName);
	if (taskIndex == -1) {
		throw "Can't find task: " + taskName + "\n Actual list of tasks: " + await getListOfTaskTitles();
    }
    const element = taskList[taskIndex];
    const actionButton = await element.$(getTaskActionBtnSelector(button));
	await elementHelpers.clickAndWait(actionButton);
}

async function isTaskVisible(taskname, expectedValue) {
	const allTasks = await getListOfTaskTitles();
    const isTaskOnList = allTasks.some((element) => element.includes(taskname));
    const fillString = !expectedValue ? 'not' : '';
	const msg = `Task with name is ${fillString} visible on the list: \n`;
	const resultMsg = 'Expected: ' + taskname + ', Actual: ' + allTasks;

	expectedValue
		? await expect(isTaskOnList, msg + resultMsg).to.equal(true)
		: await expect(isTaskOnList, msg + resultMsg).to.equal(false);
}

async function getTaskDescription(){
    await waitHelpers.waitUntilAjaxIsFinished();
    const descriptionList = await elementHelpers.getTextFromAllElements(taskDescriptionContainer);
    return descriptionList;
}

async function goToPrivateTasksArea () {
    await navigationLeftPage.clickNavItemTasks()
    await navigationLeftPage.clickNavItemTasksPrivate()
}
async function areThereAnyTasks() {
        let listOfTasks = await driver.$$(taskElement)
        return listOfTasks.length > 0 ? true : false
}
async function isTaskNotVisible (taskname) {
        const allTasks = await this.getListOfTaskTitles();
        const isTaskOnList = allTasks.some((element) => element.includes(taskname));
        const msg = 'Task with name is not visible on the list: \n';
        const resultMsg = 'Expected: ' + taskname + ', Actual: ' + allTasks;
        await expect(isTaskOnList, msg + resultMsg).to.equal(false);
}
async function clickOnTaskFromList (taskname) {
        let areThereAnyTasks = await driver.$$(tasksContainer)
        await expect(areThereAnyTasks.length).not.to.equal(0)
        for (var i = 1; i <= areThereAnyTasks.length; i++) {
            let taskSelector = await driver.$("#homeworks > ol > div > li:nth-child(" + i + ") .h5.title")
            let tasknameOnPage = await taskSelector.getText()
            if (tasknameOnPage == taskname) {
                await elementHelpers.clickAndWait(taskSelector)
            }
        }
 }

 async function getTaskNames () {
    const tasksArray = await driver.$$(taskElement + " > li");
    const container = await driver.$(taskElement);
    const namesArray = [];
    for (let i = 1; i <= tasksArray.length; i++) {
        const task = await container.$("li:nth-child(" + i + ") h2");
        const courseAndTaskName = (await task.getText());
        const tasknameArray = await courseAndTaskName.split("- ")
        const foundtaskName = tasknameArray[1]
        namesArray.push(foundtaskName);
    }
    return namesArray;
}

module.exports = {
    clickCreateTaskButton,
    sortHometasks,
    getListOfTaskTitles,
    getListOfTask,
    clickOnTask,
    isTaskVisible,
    goToPrivateHomeworkArea: goToPrivateTasksArea,
    isTaskNotVisible,
    clickOnTaskFromList,
    getTaskNames,
    getTaskDescription,
    clickCreateTaskButtonInTheCourse

}
