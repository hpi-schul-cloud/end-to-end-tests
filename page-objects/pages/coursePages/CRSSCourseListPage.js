/*[url/courses]*/
"use strict";

const courseListData = require("../../../shared-objects/CRSSCourseListData");
const eh = require("../../../runtime/helpers/elementHelpers");
const wh = require("../../../runtime/helpers/waitHelpers");
const { expect } = require("chai");

module.exports = {
	goToCourses: async function () {
		await eh.loadPage(courseListData.urlCourses, 30);
	},

	importAndCreateCourseBtnsAreVisible: async function () {
		expect(
			await eh.isElementPresent(courseListData.importCourseBtn)
		).to.equal(true);
		expect(
			await eh.isElementPresent(courseListData.createCourseBtn)
		).to.equal(true);
	},

	getCourseNames: async function () {
		const container = await driver.$(courseListData.courseContainer);
		const courseTitleContainer = await container.$$(
			courseListData.titleOfAnElement
		);

		let courseNames = await Promise.all(
			await courseTitleContainer.map(
				async (element) => await element.getText()
			)
		);
		return courseNames;
	},

	courseIsDisplayedCorrectly: async function (courseName) {
		let activeCourses = await driver.$(courseListData.activeCourses);
		let coursesOnThePage = await activeCourses.$$(
			courseListData.titleOfCourse
		);
		let courseCount = await coursesOnThePage.length;
		let courseTitleCard = coursesOnThePage[courseCount - 1];
		let courseTitle = await courseTitleCard.getText();
		expect(courseTitle).to.equal(courseName);
	},

	isCourseOnList: async function (coursename) {
		let allCourses = await this.getCourseNames();
		expect(allCourses).to.include(coursename);
	},

	isCorrectCourseColour: async function (colour) {
		let activeCourses = await driver.$(courseListData.activeCourses);
		let coursesOnThePage = await activeCourses.$$(
			courseListData.container_of_element
		);
		let indexOfTheLastAddedCourse = await coursesOnThePage.length;
		let container = await driver.$(
			courseListData.container_of_element +
				":nth-child(" +
				indexOfTheLastAddedCourse +
				")"
		);
		let lastAddedCourse = await container.$(
			courseListData.header_of_element
		);
		const styleArray = await lastAddedCourse.getHTML();
		let regexp = /background:#[A-F, 0-9]{6}/;
		let styleMatches = styleArray.match(regexp);
		let style = styleMatches[0];
		let colourNumber = this.getColourSelector(colour);
		expect(style).to.equal(colourNumber);
	},

	clickCreateCourseBtn: async function () {
		await wh.waitAndClick(courseListData.createCourseBtn);
	},

	getColourSelector: function (colourName) {
		let colourSelector;
		switch (colourName) {
			case "grey":
				colourSelector = courseListData.courseColour.grey;
				break;
			case "metallicGold":
				colourSelector = courseListData.courseColour.metallicGold;
				break;
			case "blue":
				colourSelector = courseListData.courseColour.blue;
				break;
			case "green":
				colourSelector = courseListData.courseColour.green;
				break;
			case "darkGrey":
				colourSelector = courseListData.courseColour.darkGrey;
				break;
			case "goldenPoppy":
				colourSelector = courseListData.courseColour.goldenPoppy;
				break;
			case "martini":
				colourSelector = courseListData.courseColour.martini;
				break;
			case "violetRed":
				colourSelector = courseListData.courseColour.violetRed;
				break;
			case "corn":
				colourSelector = courseListData.courseColour.corn;
				break;
			default:
				console.error(
					`This colour: ${colourName} does not exist on the list of possible choices`
				);
				break;
		}
		return colourSelector;
	},
};
