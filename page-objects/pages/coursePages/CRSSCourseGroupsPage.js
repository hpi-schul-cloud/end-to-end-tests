"use strict";
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');

const addNewGroupBtn = '[data-section="js-groups"] .add-button a';


async function	clickAddNewGroupBtn () {
		await elementHelpers.click(addNewGroupBtn);
	}

async function	clickAddNewGroupInCourse (coursename) {
		await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
		await coursePage.openGroupsTab();
		await clickAddNewGroupBtn();
	}

module.exports = {
	clickAddNewGroupBtn,
	clickAddNewGroupInCourse
}
