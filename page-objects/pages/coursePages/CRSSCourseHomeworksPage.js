"use strict";
const { CLIENT } = require("../../../shared-objects/servers")
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const courseData = require('../../../shared-objects/courseData');

const urlCoursHomeworkPage = `${CLIENT.URL}/?activeTab=homeworks`;

const addHomeworkBtn = '.col-sm-12.add-button>a';

module.exports = {
	goToCourses: async function () {
		await eh.loadPage(urlCourses, 30);
    },

    clickCreateNewTaskInTheCourse: async function (coursename) {
		await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
		let homeworktab = await driver.$('.tabs button[data-testid="hometasks"]');
		await homeworktab.click();
		await waitHelpers.waitAndClick(courseData.elem.addHomeworkBtn);
	},
}