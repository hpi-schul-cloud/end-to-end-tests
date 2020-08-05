/*[url/courses]*/
"use strict";
const { CLIENT } = require("../../../shared-objects/servers")
const eh = require("../../../runtime/helpers/elementHelpers");
const wh = require("../../../runtime/helpers/waitHelpers");
const { expect } = require("chai");
const { getTextListFromListOfElements } = require("../../../runtime/helpers/elementHelpers");

const urlCourses = `${CLIENT.URL}/courses`;
const searchCourseFiled = '.input-group .search-field';

const section = {
	allCourses: '.section-courses',
	activeCourses: '.section-activeCourses',
	archievedCourses: '.section-archievedCourses',
};

const courseWrapper = '.sc-card-wrapper'
const titleOfCourse = ".title";

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

	courseIsDisplayedCorrectly: async function (courseName) {
		const activeCoursesContainer = await driver.$(section.activeCourses);
		const coursesOnThePage = await activeCoursesContainer.$$(titleOfCourse);
		const courseCount = await coursesOnThePage.length;
		const courseTitleCard = coursesOnThePage[courseCount - 1];
		const courseTitle = await courseTitleCard.getText();
		expect(courseTitle).to.equal(courseName);
	},

	isCourseOnList: async function (coursename) {
		const allCourses = await this.getListOfCourseTitlesForSection(section.allCourses);
		expect(allCourses).to.include(coursename);
	},

	isCorrectCourseColour: async function (colour) {
		const activeCoursesContainer = await driver.$(section.activeCourses);
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

	fillCourseNameIntoSearchInputField: async function(courseName) {
		await eh.fillInputField(searchCourseFiled, courseName);
	},
	
	countDisplayedCoursesForSection: async function(section) {
		const elem = await this.getListOfCoursesForSection(section);
		var numberOfDisplayedCourses = 0;
		for (var i = 0; i < elem.length; i++) {
			if ((await elem[i].isDisplayed()) == true) {
				numberOfDisplayedCourses += 1;
			}
		}
		return numberOfDisplayedCourses;
	},

	getListOfCoursesForSection: async function (section) {
		const listOfCourses = await driver.$$(section + " " + courseWrapper);
		return listOfCourses;
	},

	countCoursesWhichTitlesContainTextForSection: async function(text, section) {
		let listOfCourseNames = await this.getListOfCourseTitlesForSection(section);
		var re = new RegExp(text, 'gi');
		const matchingNames = listOfCourseNames.filter(n => n.match(re));
		return matchingNames.length;
	},

	getListOfCourseTitlesForSection: async function (section) {
		const courseList = await this.getListOfCoursesForSection(section);
		let courseTitleList = await Promise.all(
			courseList.map(async (element) => (await element.$(titleOfCourse)).getText())
		);
		return courseTitleList;
	},

	//ALL COURSES
	getListOfAllCourses: async function () {
		return await this.getListOfCoursesForSection(section.allCourses);
	},

	countAllDisplayedCourses: async function () {
		return await this.countDisplayedCoursesForSection(section.allCourses);
	},

	countAllCoursesWhichTitlesContainText: async function(text) {
		return await this.countCoursesWhichTitlesContainTextForSection(text, section.allCourses);
	},

	//ACTIVE COURSES
	getListOfActiveCourses: async function () {
		return await this.getListOfCoursesForSection(section.activeCourses);
	},

	countActiveDisplayedCourses: async function () {
		return await this.countDisplayedCoursesForSection(section.activeCourses);
	},

	countActiveCoursesWhichTitlesContainText: async function(text) {
		return await this.countCoursesWhichTitlesContainTextForSection(text, section.activeCourses);
	},

	//ARCHIVED COURSES
	getListOfArchivedCourses: async function () {
		return await this.getListOfCoursesForSection(section.archievedCourses);
	},

	countArchivedDisplayedCourses: async function () {
		return await this.countDisplayedCoursesForSection(section.archievedCourses);
	},

	countArchivedCoursesWhichTitlesContainText: async function(text) {
		return await this.countCoursesWhichTitlesContainTextForSection(text, section.archievedCourses);
	},
	
};
