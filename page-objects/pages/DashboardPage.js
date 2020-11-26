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

async function tryGetValue(func) {
	try {
		let val = await func();
		return func();
	} catch {
		return undefined;
	}
}

async function getTaskWithNameInSection(taskName, section) {
	const taskSectionSel = `${getTaskSectionSel(section)}`;
	let element = await elementHelpers.getElementIncludingText(`${taskSectionSel} .card-block`, taskName);
	const comparisonOfNumberOfSubmittedTasks = await tryGetValue(async () =>
		getComparisonOfNumberOfTasks(await element.$(taskElement.submitted))
	);
	const comparisonOfNumberOfGradedTasks = await tryGetValue(async () =>
		getComparisonOfNumberOfTasks(await element.$(taskElement.graded))
	);

	return {
		element: element,
		name: await tryGetValue(async () => (await element.$(taskElement.name)).getText()),
		courseName: await tryGetValue(async () => await (await element.$(taskElement.courseName)).getText()),
		deadline: await tryGetValue(async () => await (await element.$(taskElement.deadline)).getText()),
		submitted: await tryGetValue(async () => comparisonOfNumberOfSubmittedTasks.current),
		toBeSubmitted: await tryGetValue(async () => comparisonOfNumberOfSubmittedTasks.expected),
		graded: await tryGetValue(async () => comparisonOfNumberOfGradedTasks.current),
		toBeGraded: await tryGetValue(async () => comparisonOfNumberOfGradedTasks.expected),
		index: element.index,
	};
}

async function isTaskWithSubmissionDateSet(taskName, section, expectedValue) {
	const task = await getTaskWithNameInSection(taskName, section);
	const deadline = task.deadline;
	const isSubmissionDateSet = !(task.deadline.includes(`No submission date set` || `Kein Abgabedatum festgelegt`));
	const fillString = expectedValue ? '' : 'not';
	const msg = `Submission date should ${fillString} be set. \nActual submission date: ${deadline} `;
	return expect(isSubmissionDateSet, msg).to.equal(expectedValue);
}

async function isTaskWithGradedTasksInSection(taskName, section, graded, toBeGraded) {
	const task = await getTaskWithNameInSection(taskName, section);
	const actualGraded = task.graded;
	const actualToBeGraded = task.toBeGraded;
	const msg = `Expected ${graded}/${toBeGraded}, \nActual: ${actualGraded}/${actualToBeGraded}`;
	return expect(actualGraded, msg).to.equal(graded) && expect(actualToBeGraded, msg).to.equal(toBeGraded);
}

async function isTaskWithSubmittedTasksInSection(taskName, section, submitted, toBeSubmitted) {
	const task = await getTaskWithNameInSection(taskName, section);
	const actualSubmitted = task.submitted;
	const actualToBeSubmitted = task.toBeSubmitted;
	const msg = `Expected ${submitted}/${toBeSubmitted}, \nActual: ${actualSubmitted}/${actualToBeSubmitted}`;
	return expect(actualSubmitted, msg).to.equal(submitted) && expect(actualToBeSubmitted, msg).to.equal(toBeSubmitted);
}


async function getListOfTasksInSection(section) {
	return {
		titles: await tryGetValue(
			async () => await elementHelpers.getTextFromAllElements(`${getTaskSectionSel(section)} ${taskElement.name}`)),
		courseNames: await tryGetValue(
			async () => await elementHelpers.getTextFromAllElements(`${getTaskSectionSel(section)} ${taskElement.courseName}`)),
		list: await tryGetValue(async () => await elementHelpers.getListOfAllElements(`${getTaskSectionSel(section)}`)),
	};
}

async function isTaskWithCourseVisible(taskName, section, courseName, expectedValue) {
	const task = await getTaskWithNameInSection(taskName, section);
	const taskCourseName = task.courseName;
	const isTaskWithCourse = taskCourseName.includes(courseName);
	const fillString = expectedValue ? 'not' : '';
	const msg = `Task '${taskName}' with course is '${fillString}' visible on the list`;
	return expect(isTaskWithCourse, msg).to.equal(expectedValue);
}

async function isTaskWithNameVisible(taskName, section) {
	const task = await getTaskWithNameInSection(taskName, section);
	const isTaskVisible = await task.element.isDisplayed();
	const msg = 'Task with name [' + taskName + '] is not visible on the list';
	const resultMsg = 'List of Task titles: ' + (await getListOfTasksInSection(section)).titles;
	return expect(isTaskVisible, msg + resultMsg).to.equal(true)
}

async function isElementOnTaskVisible(elementName, taskName, section, expectedValue) {
	const task = await getTaskWithNameInSection(taskName, section);
	const elementSel = getTaskElementSel(elementName);
	const isTaskWithElement = await (await task.element.$(elementSel)).isDisplayed();
	const fillString = expectedValue ? 'not' : '';
	const msg = `Task '${taskName}' with element '${elementName}' is ${fillString} visible`;
	await expect(isTaskWithElement, msg).to.equal(expectedValue);
}

module.exports = {
	goToDashboard,
	getTaskWithNameInSection,
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
