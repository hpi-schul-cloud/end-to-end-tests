/*[url/homework]*/
"use strict"

const waitHelpers = require("../../runtime/helpers/waitHelpers")
const navigationLeftPage = require("../../page-objects/pages/NavigationLeftPage.js")
const elementHelpers=require('../../runtime/helpers/elementHelpers');


const createTaskButton = "a[href='/homework/new']"
const editTaskButton = ".btn-edit"
const sortBtn = "#filter > div > div.md-chip.md-theme-default.md-deletable.md-clickable > div"
const select = "#selection-picker > div > div"
const lastedited =
    "body > div.md-select-menu.md-menu-content-bottom-start.md-menu-content-small.md-menu-content.md-theme-default > div > ul > li:nth-child(2) > button"
const submitBtn = ".md-button.md-primary.md-theme-default > div > div"
const pageTitleSelector = "#page-title"
const taskElement = ".col-xl-12"
const tasksContainer = "#homeworks > ol > div > li"
const taskTitleContainer = ".assignment.card .title"
const taskDescriptionContainer = ".assignment .text-muted.ckcontent"

async function clickEditTaskButton(){
    await elementHelpers.click(editTaskButton)
}

async function goToHomeworkListPage () {
    await navigationLeftPage.clickNavItemTasks();
}

async function clickCreateTaskButton () {
    await elementHelpers.click(createTaskButton)
}

async function sortHometasks () {
    await elementHelpers.click(sortBtn)
    await elementHelpers.click(select)
    await elementHelpers.click(lastedited)
    await elementHelpers.click(submitBtn)
}
async function getTaskIndex (taskname) {
    let areThereAnyTasks = await areThereAnyTasks()
    if (areThereAnyTasks) {
        const containerWithTasks = await driver.$(".col-xl-12")
        let numOfElems = await containerWithTasks.$$("li")
        for (var i = 1; i < numOfElems.length; i++) {
            let nameOfTheTaskSelector = await driver.$(".col-xl-12 > li:nth-child(" + i + ") > .content > h2")
            let nameOfTheTask = await nameOfTheTaskSelector.getText()
            if (await nameOfTheTask.includes(taskname)) {
                return i
            }
        }
    }
    return 0
}

async function clickOnTask (taskname) {
    let taskindex = await getTaskIndex(taskname)
    if (taskindex > 0) {
        let task = await driver.$(".col-xl-12 > li:nth-child(" + taskindex + ") > a > span.more")
        await task.click()
        await driver.pause(1500)
        let selectorToBeLoaded = await driver.$(pageTitleSelector)
        await selectorToBeLoaded.waitForExist(2000)
    } else {
        console.log("No such task was found")
    }
}

async function goToHomeworkListAndCheckTaskIfExist (taskname) {
    await goToHomeworkListPage()
    await sortHometasks()
    await clickOnTask(taskname)
    let pageTitle = await waitHelpers.waitUntilElementIsPresent(pageTitleSelector)
    let courseAndTaskName = await pageTitle.getText()
    let tasknameArray = await courseAndTaskName.split("- ")
    let foundtaskName = tasknameArray[1]
    await expect(taskname).to.equal(foundtaskName)
}

async function areThereAnyTasks () {
    let listOfTasks = await driver.$$(taskElement)
    return listOfTasks.length > 0 ? true : false
}

async function getListOfTaskTitles () {
    await waitHelpers.waitUntilElementIsNotVisible(".loaded #MathJax_Message");
    return elementHelpers.getTextFromAllElements(taskTitleContainer);
}


async function isTaskVisible (taskname) {
    const allTasks = await getListOfTaskTitles();
    const isTaskOnList = allTasks.some((element) => element.includes(taskname));
    const msg = 'Task with name is not visible on the list: \n';
    const resultMsg = 'Expected: ' + taskname + ', Actual: ' + allTasks;
    await expect(isTaskOnList, msg + resultMsg).to.equal(true);
}

async function isTaskNotVisible (taskname) {
    const allTasks = await getListOfTaskTitles();
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
            await taskSelector.click()
            await driver.pause(1000)
        }
    }
}

async function getDescription(){
    await waitHelpers.waitUntilAjaxIsFinished();
    const descriptionList = await elementHelpers.getTextFromAllElements(taskDescriptionContainer);
    return descriptionList;
}

async function goToPrivateHomeworkArea () {
    await navigationLeftPage.clickNavItemTasks()
    await navigationLeftPage.clickNavItemTasksPrivate()
}

module.exports = {
    clickEditTaskButton,
    goToHomeworkListPage,
    clickCreateTaskButton,
    sortHometasks,
    getTaskIndex,
    clickOnTask,
    goToHomeworkListAndCheckTaskIfExist,
    areThereAnyTasks,
    getListOfTaskTitles,
    isTaskVisible,
    isTaskNotVisible,
    clickOnTaskFromList,
    getDescription,
    goToPrivateHomeworkArea,
}
