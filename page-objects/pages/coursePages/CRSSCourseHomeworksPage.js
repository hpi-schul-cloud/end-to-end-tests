/*[url/courses]/[courseId]/[activeTab=homeworks]]*/
"use strict"
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage")
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage")
const elementHelpers = require("../../../runtime/helpers/elementHelpers.js")

const addNewHomeworkBtn = "[data-section='js-homeworks'] .add-button a"


async function clickAddNewTaskBtn() {
    await elementHelpers.clickAndWait(addNewHomeworkBtn)
}

async function clickAddNewTaskInCourse(coursename) {
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await coursePage.openHomeworksTab();
	await clickAddNewTaskBtn();
}

module.exports = {
    clickAddNewTaskBtn,
    clickAddNewTaskInCourse,
}
