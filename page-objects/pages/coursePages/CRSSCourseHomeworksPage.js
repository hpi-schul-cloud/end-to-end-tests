"use strict";
const { CLIENT } = require("../../../shared-objects/servers")
const copyCourse = require('../../../page-objects/copyCourse');
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const urlCoursHomeworkPage = `${CLIENT.URL}/?activeTab=homeworks`;

const addHomeworkBtn = '.col-sm-12.add-button>a';

module.exports = {
	goToCourses: async function () {
		await eh.loadPage(urlCourses, 30);
    },

    clickCreateNewTaskInTheCourse: async function (coursename) {
		await copyCourse.chooseCourse(coursename);
		let homeworktab = await driver.$('.tabs button[data-testid="hometasks"]');
		await homeworktab.click();
		await waitHelpers.waitAndClick(addHomeworkBtn);
	},
}