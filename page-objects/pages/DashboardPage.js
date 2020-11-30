/*[url/dashboard]*/
'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const NavigationLeftPage = require('./NavigationLeftPage');
const elementHelpers = require('../../runtime/helpers/elementHelpers');

const taskElement = {
	name: 'span[data-testid="task-name"]',
	courseName: 'span[data-testid="task-course-name"]',
	deadline: 'span[data-testid="task-due-date"]',
	submitted: 'span[data-testid="task-submitted"]',
	graded: 'span[data-testid="task-graded"]',
};

const taskSection = {
	assigned: 'section[data-testid="published-tasks-section"]',
	private: 'section[data-testid="private-tasks-section"]',
};

function getTaskElementSel(elementName) {
	let btnSel = '';
	elementName = elementName.toLowerCase();
	switch (elementName) {
		case 'name':
			btnSel = taskElement.name;
			break;
		case 'course name':
			btnSel = taskElement.courseName;
			break;
		case 'deadline':
			btnSel = taskElement.deadline;
			break;
		case 'submitted':
			btnSel = taskElement.submitted;
			break;
		case 'graded':
			btnSel = taskElement.graded;
			break;
		default:
			console.error(`This task element: ${elementName} does not exist on the list of possible choices`);
			break;
	}
	return btnSel;
}

function getTaskSectionSel(taskType) {
	let btnSel = '';
	taskType = taskType.toLowerCase();
	switch (taskType) {
		case 'published':
			btnSel = taskSection.assigned;
			break;
		case 'private':
			btnSel = taskSection.private;
			break;
		default:
			console.error(`This dashboard task section: ${taskType} does not exist on the list of possible choices`);
			break;
	}
	return btnSel;
}

async function goToDashboard() {
	await NavigationLeftPage.clickNavItemDashboard();
}

async function isTasksSectionVisible(section) {
	await waitHelpers.waitUntilElementIsVisible(getTaskSectionSel(section));
}

async function getComparisonOfNumberOfTasks(element) {
	const str = await element.getText();
	let regex = /.* (\d+)\/(\d+)/g;
	const result = regex.exec(str);

	return {
		current: result[1],
		expected: result[2],
	};
}

async function getTaskCardElementInSection(taskName, section) {
	const taskSectionSel = `${getTaskSectionSel(section)}`;
	let element = await elementHelpers.getElementIncludingText(`${taskSectionSel} .card-block`, taskName);
	return element;
}

async function getListOfTasksInSection(section) {
	const taskSectionSel = `${getTaskSectionSel(section)}`;
	return {
		titles: await elementHelpers.getTextFromAllElements(`${taskSectionSel} ${taskElement.name}`),
		courseNames: await elementHelpers.getTextFromAllElements(`${taskSectionSel} ${taskElement.courseName}`),
		list: await elementHelpers.getListOfAllElements(`${taskSectionSel} .card-block`),
	};
}

async function getTaskFullName(taskName, section) {
	let element = await getTaskCardElementInSection(taskName, section);
	element = await element.$(taskElement.name);
	return element.getText();
}

async function getTaskCourseName(taskName, section) {
	let element = await getTaskCardElementInSection(taskName, section);
	element = await element.$(taskElement.courseName);
	return element.getText();
}

async function getTaskDeadline(taskName, section) {
	let element = await getTaskCardElementInSection(taskName, section);
	element = await element.$(taskElement.deadline);
	return element.getText();
}

async function getSubmittedValuePair(taskName, section) {
	let element = await getTaskCardElementInSection(taskName, section);
	element = await element.$(taskElement.submitted);
	const comparisonOfNumberOfSubmittedTasks = await getComparisonOfNumberOfTasks(element);
	return {
		submitted: comparisonOfNumberOfSubmittedTasks.current,
		toBeSubmitted: comparisonOfNumberOfSubmittedTasks.expected,
	};
}

async function getGradedValuePair(taskName, section) {
	let element = await getTaskCardElementInSection(taskName, section);
	element = await element.$(taskElement.graded);
	const comparisonOfNumberOfGradedTasks = await getComparisonOfNumberOfTasks(element);
	return {
		graded: comparisonOfNumberOfGradedTasks.current,
		toBeGraded: comparisonOfNumberOfGradedTasks.expected,
	};
}

async function isTaskWithSubmissionDateSet(taskName, section, expectedValue) {
	const deadline = await getTaskDeadline(taskName, section);
	const isSubmissionDateSet = !deadline.includes(`No submission date set` || `Kein Abgabedatum festgelegt`);
	const fillString = expectedValue ? '' : 'not';
	const msg = `Submission date should ${fillString} be set. \nActual submission date: ${deadline} `;
	return expect(isSubmissionDateSet, msg).to.equal(expectedValue);
}

async function isTaskWithGradedTasksInSection(taskName, section, graded, toBeGraded) {
	const gradedValuePair = await getGradedValuePair(taskName, section);
	const actualGraded = gradedValuePair.graded;
	const actualToBeGraded = gradedValuePair.toBeGraded;
	const msg = `Expected ${graded}/${toBeGraded}, \nActual: ${actualGraded}/${actualToBeGraded}`;
	return expect(actualGraded, msg).to.equal(graded) && expect(actualToBeGraded, msg).to.equal(toBeGraded);
}

async function isTaskWithSubmittedTasksInSection(taskName, section, submitted, toBeSubmitted) {
	const submittedValuePair = await getSubmittedValuePair(taskName, section);
	const actualSubmitted = submittedValuePair.submitted;
	const actualToBeSubmitted = submittedValuePair.toBeSubmitted;
	const msg = `Expected ${submitted}/${toBeSubmitted}, \nActual: ${actualSubmitted}/${actualToBeSubmitted}`;
	return expect(actualSubmitted, msg).to.equal(submitted) && expect(actualToBeSubmitted, msg).to.equal(toBeSubmitted);
}

async function isTaskWithCourseVisible(taskName, section, courseName, expectedValue) {
	const taskCourseName = await getTaskCourseName(taskName, section);
	const isTaskWithCourse = taskCourseName.includes(courseName);
	const fillString = expectedValue ? 'not' : '';
	const msg = `Task '${taskName}' with course is '${fillString}' visible on the list`;
	return expect(isTaskWithCourse, msg).to.equal(expectedValue);
}

async function isTaskWithNameVisible(taskName, section) {
	const taskCard = await getTaskCardElementInSection(taskName, section);
	const isTaskVisible = await taskCard.isDisplayed();
	const msg = 'Task with name [' + taskName + '] is not visible on the list';
	const resultMsg = 'List of Task titles: ' + (await getListOfTasksInSection(section)).titles;
	return expect(isTaskVisible, msg + resultMsg).to.equal(true);
}

async function isElementOnTaskVisible(elementName, taskName, section, expectedValue) {
	const taskCard = await getTaskCardElementInSection(taskName, section);
	const elementSel = getTaskElementSel(elementName);
	const element = await taskCard.$(elementSel);
	const isTaskWithElement = await element.isDisplayed();
	const fillString = expectedValue ? 'not' : '';
	const msg = `Task '${taskName}' with element '${elementName}' is ${fillString} visible`;
	await expect(isTaskWithElement, msg).to.equal(expectedValue);
}

module.exports = {
	goToDashboard,
	getListOfTasksInSection,
	isTaskWithSubmissionDateSet,
	isTasksSectionVisible,
	isTaskWithCourseVisible,
	isTaskWithNameVisible,
	isElementOnTaskVisible,
	isTaskWithSubmittedTasksInSection,
	isTaskWithGradedTasksInSection,
	taskElement,
};
