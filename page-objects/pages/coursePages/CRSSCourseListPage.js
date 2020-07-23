/*[url/courses]*/
"use strict";

const courseListData = require("../../../shared-objects/CRSSCourseListData");
const elementHelpers = require("../../../runtime/helpers/elementHelpers");

module.exports = {
	goToCourses: async function () {
		await elementHelpers.loadPage(courseListData.urlCourses, 30);
	},

	areSelectorsOnThePage: async function () {
		let isImportCourseBtnOnThePage = await elementHelpers.isSelectorOnThePage(
			courseListData.importCourseBtn
		);
		await expect(isImportCourseBtnOnThePage).to.equal(1);
		let isCreatedCourseBtnOnThePage = await elementHelpers.isSelectorOnThePage(
			courseListData.createCourseBtn
		);
		await expect(isCreatedCourseBtnOnThePage).to.equal(1);
	},

	getCourseNames: async function () {
		await this.goToCourses();
		let container = await driver.$('[data-testid="courses"]');
		let coursesNameContainer = await container.$$(
			courseData.elem.coursesPage.title
		);
		let courseNames = await Promise.all(
			await coursesNameContainer.map(
				async (element) => await element.getText()
			)
		);
		return courseNames;
	},

	courseNameDisplayedCorrectly: async function (coursename) {
		await this.goToCourses();
		let activeCourses = await driver.$(courseListData.activeCourses);
		let coursesOnThePage = await activeCourses.$$(
			courseListData.container_of_element
		);
		let indexOfTheLastAddedCourse = await coursesOnThePage.length;
		let lastAddedCourse = await driver.$(
			courseListData.container_of_element +
				":nth-child(" +
				indexOfTheLastAddedCourse +
				")"
		);
		await lastAddedCourse.click();
		await driver.pause(1000);
		let displayedTextSelector = await driver.$(courseListData.pageTitle);
		let displayedText = await displayedTextSelector.getText();
		await expect(displayedText).to.equal(coursename);
	},

	verify: async function (coursename) {
		let allCourses = await this.getCourseNames();
		await expect(allCourses).to.include(coursename);
	},

	clickCreateCourseBtn: async function () {
		let element = await driver.$(courseListData.createCourseBtn);
		await element.click();
		await driver.pause(1000);
	},

	verifyColour: async function (colour) {
		await this.goToCourses();
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
		let regexp = /background:#[A-Z, 0-9]{6};/;
		let styleMatches = styleArray.match(regexp);
		let style = styleMatches[0];
		switch (colour) {
			case "grey":
				await expect(style).to.equal(courseListData.courseColours.grey);
				break;

			case "metallicGold":
				await expect(style).to.equal(
					courseListData.courseColours.metallicGold
				);
				break;

			case "blue":
				await expect(style).to.equal(courseListData.courseColours.blue);
				break;

			case "green":
				await expect(style).to.equal(
					courseListData.courseColours.green
				);
				break;

			case "darkGrey":
				await expect(style).to.equal(
					courseListData.courseColours.darkGrey
				);
				break;
			case "goldenPoppy":
				await expect(style).to.equal(
					courseListData.courseColours.goldenPoppy
				);
				break;

			case "martini":
				await expect(style).to.equal(
					courseListData.courseColours.martini
				);
				break;

			case "violetRed":
				await expect(style).to.equal(
					courseListData.courseColours.violetRed
				);
				break;

			case "corn":
				await expect(style).to.equal(courseListData.courseColours.corn);
				break;
		}
	},
};
