"use strict";
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");

const selectors = {
	addNewToolBtn: "[data-section='js-tools'] .add-button a",
}

module.exports = {
	clickAddNewToolBtn: async function () {
		await waitHelpers.waitAndClick(selectors.addNewToolBtn);
	},

	clickAddNewTopicInCourse: async function (coursename) {
		await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
		await coursePage.openToolsTab();
		await this.clickAddNewToolBtn();
	}
}
