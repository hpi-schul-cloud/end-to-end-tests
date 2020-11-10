"use strict";
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');
const waitHelpers = require("../../../runtime/helpers/waitHelpers");


const addNewTopicBtn = "[data-section='js-topics'] .add-button a";
const topicNameContainer = '#topic-list .card-header .topic-label';
const topicSelector = '#topic-list .card';
const trashcanBtnSelector = ".fa-trash-o";
const deleteTopicButtonInPopup = ".delete-modal button.btn-submit";
const containerWithTopics = "#topic-list";
const nameOfTopic = ".topic-label.ml-1";

async function getIndexOfTopicWithNameInTopicsList(topicName) {
	let topicNames = await Promise.all((await driver.$$(containerWithTopics+ "> div > div > div")).map(async (element) => await element.getText()));
    const isTheSameName = (element) => element==topicName;
    return (topicNames.findIndex(isTheSameName)+1);
};
async function goToTopic(topicName) {
	let index = await this.helperReturnIndexOfTopicWithNameInTopicsList(topicName);
	await elementHelpers.clickAndWait(containerWithTopics+ ">div:nth-child("+index+")");
	
};
async function clickAddNewTopicBtn () {
	await elementHelpers.clickAndWait(addNewTopicBtn);
}

async function clickAddNewTopicInCourse (coursename) {
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await coursePage.openTopicsTab();
	await clickAddNewTopicBtn();
}

async function isTopicInCourseInSection(courseName, topicName, section) {
	await courseListPage.clickOnCourseInSection(courseName, section);
	await waitHelpers.waitUntilElementIsVisible(topicNameContainer);
	const listOfTopics = await driver.$$(topicNameContainer);
	const listOfTopicNames = await elementHelpers.getTextListFromListOfElements(listOfTopics);
	const msg = "Topic with name: '" + courseName + "' is not visible on list \n";
	const resultMsg = 'Expected: ' + topicName + ', Actual: ' + listOfTopicNames;
	expect(listOfTopicNames, msg + resultMsg).to.include(topicName);
}

async function clickOnTopicDeleteTrashcanButton(name) {
	let listOfTopicElements = await elementHelpers.getListOfAllElements(topicSelector);
	let topicTitleList = await elementHelpers.getTextFromAllElements(topicSelector);
	await elementHelpers.clickAndWait(listOfTopicElements[topicTitleList.indexOf(name)].$(trashcanBtnSelector));
}

async function clickDeleteTopicButtonInPopup() {
	await elementHelpers.clickAndWait(deleteTopicButtonInPopup);
	await waitHelpers.waitUntilAjaxIsFinished();
}

module.exports = {
	isTopicInCourseInSection,
	clickAddNewTopicBtn,
	clickAddNewTopicInCourse,
	clickOnTopicDeleteTrashcanButton,
	clickDeleteTopicButtonInPopup,
	getIndexOfTopicWithNameInTopicsList,
}
