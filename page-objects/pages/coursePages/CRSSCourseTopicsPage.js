"use strict";
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');


const addNewTopicBtn = "[data-section='js-topics'] .add-button a";
const containerWithTopics = "#topic-list";
const nameOfTopic = ".topic-label.ml-1";


async function getIndexOfTopicWithNameInTopicsList(topicName) {
	let topicNames = await Promise.all((await driver.$$(containerWithTopics+ "> div > div > div")).map(async (element) => await element.getText()));
    const isTheSameName = (element) => element==topicName;
    return (topicNames.findIndex(isTheSameName)+1);
};
async function goToTopic(topicName) {
	let index = await this.helperReturnIndexOfTopicWithNameInTopicsList(topicName);
	await waitHelpers.waitAndClick(containerWithTopics+ ">div:nth-child("+index+")");
	
};
async function clickAddNewTopicBtn () {
	await elementHelpers.clickAndWait(addNewTopicBtn);
}

async function clickAddNewTopicInCourse (coursename) {
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await coursePage.openTopicsTab();
	await clickAddNewTopicBtn();
}
module.exports = {
	clickAddNewTopicBtn,
	clickAddNewTopicInCourse,
	getIndexOfTopicWithNameInTopicsList,
	goToTopic
}
