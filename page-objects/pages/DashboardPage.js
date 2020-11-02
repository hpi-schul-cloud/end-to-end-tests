/*[url/dashboard]*/
'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const NavigationLeftPage = require('./NavigationLeftPage');
const elementHelpers = require('../../runtime/helpers/elementHelpers');

const dashboardBtnOnNavigationLeftPanel = "[data-testid='startseite']";
const homeworkElement = {
	homeworkName: 'span[data-testid="homework-name"]',
	courseName: 'span[data-testid="homework-course-name"]',
	homeworkTimeout: 'span[data-testid="homework-due-date"]',
	homeworkCompleted: 'span[data-testid="homework-submitted"]',
	homeworkGraded: 'span[data-testid="homework-graded"]',
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
	const dashboardTitlesList = await elementHelpers.getTextFromAllElements(homeworkElement.dashboardTitleList)
	const msg = 'Title with name [' + listName + '] is not visible on the list \n';
	const resultMsg = ', List of titles: ' + dashboardTitlesList;
	return expect(dashboardTitlesList, msg + resultMsg).to.include(listName);
}

async function isCourseNameOnPrivateHomeworkVisible(homeworkName, courseName) {
	const homeworkIndex = await getIndexOfHomeworkFromList(homeworkName);
	const homeworkCourseElementList = await elementHelpers.getListOfAllElements(homeworkElement.courseName)
	const courseNameText = await elementHelpers.getElementText(homeworkCourseElementList[homeworkIndex]);
	const msg = 'Course with name [' + courseName + '] is not visible on the private homework \n';
	const resultMsg = 'List of course titles: ' + homeworkCourseElementList;
	return expect(courseNameText, msg + resultMsg).to.include(courseName);
}

async function getIndexOfHomeworkFromList(homeworkName) {
	const homeworkTextElementList = await elementHelpers.getListOfAllElements(homeworkElement.homeworkName)
	const homeworkTextValueList = await elementHelpers.getTextListFromListOfElements(homeworkTextElementList);
	const index = homeworkTextValueList.indexOf(homeworkName);
	return index;
}

async function isPrivateHomeworkNameVisible(homeworkName) {
	const homeworkNameList = await elementHelpers.getTextFromAllElements(homeworkElement.homeworkName)
	const msg = 'Homework with name [' + homeworkName + '] is not visible on the list \n';
	const resultMsg = 'List of Homework titles: ' + homeworkNameList;
	return expect(homeworkNameList, msg + resultMsg).to.include(homeworkName);
}

async function isElementOfHomeworkVisible(elementName, homeworkName, selector, expectedValue) {
	const defaultString = `Element with name: ${elementName}`;
	let elementOfHomework = true;
	const homeworkIndex = await getIndexOfHomeworkFromList(homeworkName);
	const elementsOfHomeworksList = await elementHelpers.getListOfAllElements(selector);
	elementsOfHomeworksList.length === 0 ? elementOfHomework = false : await waitHelpers.waitUntilElementIsPresent(elementsOfHomeworksList[homeworkIndex]);

	const msg = expectedValue
		? `${defaultString} should be visible on the homework`
		: `${defaultString} should not be visible on the homework`;

	expectedValue
		? expect(elementOfHomework, msg).to.be.true
		: expect(elementOfHomework, msg).to.be.false;
}

module.exports = {
	goToDashboard,
	isTitleOfDashboard,
	isPrivateTasksAndDraftsListVisible,
	isCourseNameOnPrivateHomeworkVisible,
	isPrivateHomeworkNameVisible,
	isElementOfHomeworkVisible,
	homeworkElement,
};
