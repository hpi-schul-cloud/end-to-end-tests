"use strict";
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");

const selectors = {
	addNewGroupBtn: "[data-section='js-groups'] .add-button a",
}

module.exports = {
	clickAddNewGroupBtn: async function () {
		await waitHelpers.waitAndClick(selectors.addNewGroupBtn);
	},

	clickAddNewGroupInCourse: async function (coursename) {
		await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
		await coursePage.openGroupsTab();
		await this.clickAddNewGroupBtn();
	}
}
