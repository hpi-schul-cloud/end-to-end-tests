"use strict";
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");

const selectors = {
	addNewTopicBtn:"[data-section='js-topics'] .add-button a",
	containerWithTopics: "#topic-list",
	nameOfTopic: ".topic-label.ml-1"
}

module.exports = {
	clickAddNewTopicBtn: async function () {
		await waitHelpers.waitAndClick(selectors.addNewTopicBtn);
	},

	clickAddNewTopicInCourse: async function (coursename) {
		await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
		await coursePage.openTopicsTab();
		await this.clickAddNewTopicBtn();
	},
	helperReturnIndexOfTopicWithNameInTopicsList: async function(topicName) {
		let topicNames = await Promise.all((await driver.$$(selectors.containerWithTopics+ "> div > div > div")).map(async (element) => await element.getText()));
        const isTheSameName = (element) => element==topicName;
                return (await topicNames.findIndex(isTheSameName)+1);
	},
	goToTopic: async function(topicName) {
		let index = await this.helperReturnIndexOfTopicWithNameInTopicsList(topicName);
		await waitHelpers.waitAndClick(selectors.containerWithTopics+ ">div:nth-child("+index+")");
	
	}
}
