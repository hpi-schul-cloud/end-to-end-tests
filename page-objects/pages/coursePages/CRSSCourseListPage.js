/*[url/courses]*/
"use strict";
const { CLIENT } = require("../../../shared-objects/servers")
const eh = require("../../../runtime/helpers/elementHelpers");
const wh = require("../../../runtime/helpers/waitHelpers");
const { expect } = require("chai");

const titleOfAnElement = '[data-testid="title_of_an_element"]';
const titleOfCourse = ".title";
const urlCourses = `${CLIENT.URL}/courses`;

const activeCourses = ".section-activeCourses";
const courseContainer = '[data-testid="courses"]';

const importCourseBtn = '[data-testid="import-course-btn"]';
const createCourseBtn = '[data-testid="create-course-btn"]';

const container_of_element = '[data-testid="container_of_element"]';
const header_of_element = '[data-testid="header-of-element"]';

const courseColour = {
	grey: "background:#ACACAC",
	metallicGold: "background:#ACACAC",
	blue: "background:#00E5FF",
	green: "background:#1DE9B6",
	darkGrey: "background:#546E7A",
	goldenPoppy: "background:#FFC400",
	martini: "background:#BCAAA4",
	violetRed: "background:#FF4081",
	corn: "background:#FFEE58",
};

module.exports = {
	goToCourses: async function () {
		await eh.loadPage(urlCourses, 30);
	},

	importAndCreateCourseBtnsAreVisible: async function () {
		expect(await eh.isElementPresent(importCourseBtn)).to.equal(true);
		expect(await eh.isElementPresent(createCourseBtn)).to.equal(true);
	},

	getCourseNames: async function () {
		const container = await driver.$(courseContainer);
		const courseTitleContainer = await container.$$(titleOfAnElement);

		const  courseNames = await Promise.all(
			await courseTitleContainer.map(
				async (element) => await element.getText()
			)
		);
		return courseNames;
	},

	courseIsDisplayedCorrectly: async function (courseName) {
		const activeCoursesContainer = await driver.$(activeCourses);
		const coursesOnThePage = await activeCoursesContainer.$$(titleOfCourse);
		const courseCount = await coursesOnThePage.length;
		const courseTitleCard = coursesOnThePage[courseCount - 1];
		const courseTitle = await courseTitleCard.getText();
		expect(courseTitle).to.equal(courseName);
	},

	isCourseOnList: async function (coursename) {
		const allCourses = await this.getCourseNames();
		expect(allCourses).to.include(coursename);
	},

	isCorrectCourseColour: async function (colour) {
		const activeCoursesContainer = await driver.$(activeCourses);
		const coursesOnThePage = await activeCoursesContainer.$$(container_of_element);
		const indexOfTheLastAddedCourse = await coursesOnThePage.length;
		const container = await driver.$(
			container_of_element +
				":nth-child(" +
				indexOfTheLastAddedCourse +
				")"
		);
		const lastAddedCourse = await container.$(header_of_element);
		const styleArray = await lastAddedCourse.getHTML();
		const regexp = /background:#[A-F, 0-9]{6}/;
		const styleMatches = styleArray.match(regexp);
		const style = styleMatches[0];
		const colourNumber = this.getColourSelector(colour);
		expect(style).to.equal(colourNumber);
	},

	clickCreateCourseBtn: async function () {
		await wh.waitAndClick(createCourseBtn);
	},

	getColourSelector: function (colourName) {
		let colourSelector;
		switch (colourName) {
			case "grey":
				colourSelector = courseColour.grey;
				break;
			case "metallicGold":
				colourSelector = courseColour.metallicGold;
				break;
			case "blue":
				colourSelector = courseColour.blue;
				break;
			case "green":
				colourSelector = courseColour.green;
				break;
			case "darkGrey":
				colourSelector = courseColour.darkGrey;
				break;
			case "goldenPoppy":
				colourSelector = courseColour.goldenPoppy;
				break;
			case "martini":
				colourSelector = courseColour.martini;
				break;
			case "violetRed":
				colourSelector = courseColour.violetRed;
				break;
			case "corn":
				colourSelector = courseColour.corn;
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
