/*[url/courses]/[courseId]/[activeTab=homeworks]]*/
"use strict";
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");

const addNewHomeworkBtn ="[data-section='js-homeworks'] .add-button a";

module.exports = {
	clickAddNewTaskBtn: async function () {
		await waitHelpers.waitAndClick(addNewHomeworkBtn);
	},

	clickAddNewTaskInCourse: async function (coursename) {
		await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
		await coursePage.openHomeworksTab();
		await this.clickAddNewTaskBtn();
	}
}
