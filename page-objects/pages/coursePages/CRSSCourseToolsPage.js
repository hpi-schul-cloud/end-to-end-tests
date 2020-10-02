"use strict";
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');

const addNewToolBtn = "[data-section='js-tools'] .add-button a";

module.exports = {
	clickAddNewToolBtn: async function () {
		await elementHelpers.click(addNewToolBtn);
	},

	clickAddNewTopicInCourse: async function (coursename) {
		await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
		await coursePage.openToolsTab();
		await this.clickAddNewToolBtn();
	}
}
