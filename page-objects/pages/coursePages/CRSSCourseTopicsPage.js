"use strict";
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');

const selectors = {
	addNewTopicBtn:"[data-section='js-topics'] .add-button a",
	containerWithTopics: "#topic-list",
	nameOfTopic: ".topic-label.ml-1"
};

async function clickAddNewTopicBtn() {
	await elementHelpers.click(addNewTopicBtn);
};

async function clickAddNewTopicInCourse(coursename) {
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await coursePage.openTopicsTab();
	await this.clickAddNewTopicBtn();
};

async function helperReturnIndexOfTopicWithNameInTopicsList(topicName) {
	let topicNames = await Promise.all((await driver.$$(selectors.containerWithTopics+ "> div > div > div")).map(async (element) => await element.getText()));
    const isTheSameName = (element) => element==topicName;
    return (topicNames.findIndex(isTheSameName)+1);
};
async function goToTopic(topicName) {
	let index = await this.helperReturnIndexOfTopicWithNameInTopicsList(topicName);
	await waitHelpers.waitAndClick(selectors.containerWithTopics+ ">div:nth-child("+index+")");
	
};

module.exports = {
	clickAddNewTopicBtn,
	clickAddNewTopicInCourse
}
