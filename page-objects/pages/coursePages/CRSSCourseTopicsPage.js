"use strict";
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');

const addNewTopicBtn = "[data-section='js-topics'] .add-button a";

module.exports = {
	clickAddNewTopicBtn: async function () {
		await elementHelpers.click(addNewTopicBtn);
	},

	clickAddNewTopicInCourse: async function (coursename) {
		await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
		await coursePage.openTopicsTab();
		await this.clickAddNewTopicBtn();
	}
}
