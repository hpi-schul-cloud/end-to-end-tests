/*[url/dashboard]*/
'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const NavigationLeftPage = require('./NavigationLeftPage');
const elementHelpers = require('../../runtime/helpers/elementHelpers');

const dashboardBtnOnNavigationLeftPanel = "[data-testid='startseite']";
const taskElement = {
	taskName: 'span[data-testid="homework-name"]',
	courseName: 'span[data-testid="homework-course-name"]',
	taskTimeout: 'span[data-testid="homework-due-date"]',
	taskCompleted: 'span[data-testid="homework-submitted"]',
	taskGraded: 'span[data-testid="homework-graded"]',
	dashboardTitleList: '.dashboard-title',

};

async function goToDashboard() {
	await NavigationLeftPage.clickNavItemDashboard();
}

async function isTitleOfDashboard() {
	await goToDashboard();
	await waitHelpers.waitUntilPageTitleContains(dashboardBtnOnNavigationLeftPanel);
}

async function isPrivateTasksAndDraftsListVisible(listName) {
	const dashboardTitlesList = await elementHelpers.getTextFromAllElements(taskElement.dashboardTitleList)
	const msg = 'Title with name [' + listName + '] is not visible on the list \n';
	const resultMsg = ', List of titles: ' + dashboardTitlesList;
	return expect(dashboardTitlesList, msg + resultMsg).to.include(listName);
}

async function isCourseNameOnPrivateTaskVisible(taskName, courseName) {
	const taskIndex = await getIndexOfTaskFromList(taskName);
	const taskCourseElementList = await elementHelpers.getListOfAllElements(taskElement.courseName)
	const courseNameText = await elementHelpers.getElementText(taskCourseElementList[taskIndex]);
	const msg = 'Course with name [' + courseName + '] is not visible on the private task \n';
	const resultMsg = 'List of course titles: ' + taskCourseElementList;
	return expect(courseNameText, msg + resultMsg).to.include(courseName);
}

async function getIndexOfTaskFromList(taskName) {
	const taskTextElementList = await elementHelpers.getListOfAllElements(taskElement.taskName)
	const taskTextValueList = await elementHelpers.getTextListFromListOfElements(taskTextElementList);
	const index = taskTextValueList.indexOf(taskName);
	return index;
}

async function isPrivateTaskNameVisible(taskName) {
	const taskNameList = await elementHelpers.getTextFromAllElements(taskElement.taskName)
	const msg = 'Task with name [' + taskName + '] is not visible on the list \n';
	const resultMsg = 'List of Task titles: ' + taskNameList;
	return expect(taskNameList, msg + resultMsg).to.include(taskName);
}

async function isElementOnTaskVisible(elementName, taskName, selector, expectedValue) {
	const defaultString = `Element with name: ${elementName}`;
	let elementOfTask = true;
	const taskIndex = await getIndexOfTaskFromList(taskName);
	const elementsOfTaskList = await elementHelpers.getListOfAllElements(selector);
	elementsOfTaskList.length === 0 ? elementOfTask = false : await waitHelpers.waitUntilElementIsPresent(elementsOfTaskList[taskIndex]);

	const msg = expectedValue
		? `${defaultString} should be visible on the task`
		: `${defaultString} should not be visible on the task`;

	expectedValue
		? expect(elementOfTask, msg).to.be.true
		: expect(elementOfTask, msg).to.be.false;
}

module.exports = {
	goToDashboard,
	isTitleOfDashboard,
	isPrivateTasksAndDraftsListVisible,
	isCourseNameOnPrivateTaskVisible,
	isPrivateTaskNameVisible,
	isElementOnTaskVisible,
	taskElement,
};
