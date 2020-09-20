"use strict";
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");

const selectors = {
	addNewTopicBtn: "[data-section='js-topics'] .add-button a",
}

module.exports = {
	clickAddNewTopicBtn: async function () {
		await waitHelpers.waitAndClick(selectors.exportsaddNewTopicBtn);
	},

	clickAddNewTopicInCourse: async function (coursename) {
		await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
		await coursePage.openTopicsTab();
		await this.clickAddNewTopicBtn();
	}
}
