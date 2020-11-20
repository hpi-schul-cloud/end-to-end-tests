/*[url/dashboard]*/
'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const NavigationLeftPage = require('./NavigationLeftPage');
const elementHelpers = require('../../runtime/helpers/elementHelpers');

const privateTaskSection = ".dashboard-title[href*='private']";

const taskElement = {
	taskName: 'span[data-testid="task-name"]',
	courseName: 'span[data-testid="task-course-name"]',
	taskTimeout: 'span[data-testid="task-due-date"]',
	taskCompleted: 'span[data-testid="task-submitted"]',
	taskGraded: 'span[data-testid="task-graded"]',
	dashboardTitleList: 'a[data-testid="dashboard-tasks-title"]',
};

async function goToDashboard() {
	await NavigationLeftPage.clickNavItemDashboard();
}

async function isPrivateTasksSectionVisible() {
		await waitHelpers.waitUntilElementIsVisible(privateTaskSection)
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
	const taskTextValueList = await elementHelpers.getTextFromAllElements(taskElement.taskName);
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
	elementsOfTaskList.length === 0 || elementsOfTaskList.length <= taskIndex ? elementOfTask = false : elementOfTask = !!(await waitHelpers.waitUntilElementIsPresent(elementsOfTaskList[taskIndex]));

	const msg = expectedValue
		? `${defaultString} should be visible on the task`
		: `${defaultString} should not be visible on the task`;

	expectedValue
		? expect(elementOfTask, msg).to.be.true
		: expect(elementOfTask, msg).to.be.false;
}

module.exports = {
	goToDashboard,
	isPrivateTasksSectionVisible,
	isCourseNameOnPrivateTaskVisible,
	isPrivateTaskNameVisible,
	isElementOnTaskVisible,
	taskElement,
};
