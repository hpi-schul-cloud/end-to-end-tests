"use strict";
const wh = require('../../../runtime/helpers/waitHelpers.js');
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");

const addNewGroupBtn = "[data-section='js-groups'] .add-button a";

module.exports = {
	clickAddNewGroupBtn: async function () {
		await wh.waitAndClick(addNewGroupBtn);
	},

	clickAddNewGroupInCourse: async function (coursename) {
		await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
		await coursePage.openGroupsTab();
		await this.clickAddNewGroupBtn();
	}
}