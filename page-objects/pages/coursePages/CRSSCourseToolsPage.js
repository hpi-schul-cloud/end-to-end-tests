"use strict";
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');

const addNewToolBtn = "[data-section='js-tools'] .add-button a";


async function clickAddNewToolBtn() {
		await elementHelpers.click(addNewToolBtn);
	}

async function clickAddNewTopicInCourse(coursename) {
		await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
		await coursePage.openToolsTab();
		await this.clickAddNewToolBtn();
	}

module.exports = {
	clickAddNewToolBtn,
	clickAddNewTopicInCourse
}
