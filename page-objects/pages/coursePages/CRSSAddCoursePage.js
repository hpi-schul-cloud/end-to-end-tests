/*[url/courses]/add]*/
"use strict";
const { CLIENT, SERVER } = require("../../../shared-objects/servers");
const elementHelpers = require("../../../runtime/helpers/elementHelpers");
const waitHelpers = require("../../../runtime/helpers/waitHelpers");
const axios = require("axios");

const urlCoursesAdd = `${CLIENT.URL}/courses/add`;

const selectors = {
	nextSectionBtn: "#nextSection",
	section:{
		one: '[data-testid="section-1-area"]',
		two: '[data-testid="section-2-area"]',
		three: '[data-testid="section-3-area"]',
	},
	chosenDefInput: ".chosen-search-input.default",
	chosenInput: ".search-choice span",
	multipleChoiceSelectForStudents:'select[data-testid="pupils"]',
	//Course data section
	courseNameInput:'[data-testid="coursename"]',
	teacherContainer: '[data-testid="teachers_container"]',
	teacherSubContainer: '[data-testid="courseSubstitute_container"]',
	colourPicker: ".color-picker__item",
	timeSpan: {
		start: '[data-testid="date_start"]',
		end: "#untilDate",
	},
	//Participants section
	classContainer:'[data-testid="class_container"]',
	studentsContainer: '[data-testid="students_container"]',
	//Final section
	createNewCourseBtn: '[data-testid="einen-weiteren-kurs-anlegen-btn"]',
	goToCourseListBtn: '[data-testid="zur-uebersicht-btn"]'
};

const courseColour = [
	"grey",
	"metallicGold",
	"blue",
	"green",
	"darkGrey",
	"goldenPoppy",
	"martini",
	"violetRed",
	"corn",
];

module.exports = {
	goToAddCourses: async function() {
		await elementHelpers.loadPage(urlCoursesAdd, 20)
	},

	goToNextSection: async function () {
		await waitHelpers.waitAndClick(selectors.nextSectionBtn);
	},

	getListOfSelected: async function (containerSelector) {
		const container = await driver.$(containerSelector);
		const listOfElements = await container.$$(selectors.chosenInput);
		return await elementHelpers.getTextListFromListOfElements(listOfElements);
	},

	isDefaultValueInContainer: async function (containerSelector, defaultText) {
		const container = await driver.$(containerSelector);
		const listOfElements = await container.$$(selectors.chosenDefInput);
		const valueList = await elementHelpers.getValueListFromListOfElements(listOfElements);
		const isOnlyOneText = valueList.length == 1;
		await expect(isOnlyOneText).is.equal(true);
		await expect(valueList).includes(defaultText);
	},

	sectionIsDisplayed: async function (sectionNumber) {
		const sectionToCheck =
			sectionNumber == 1 ? sectionNumber : sectionNumber - 1;
		const selector = this.getSectionSelector(sectionToCheck);
		const element = await driver.$(selector);
		const hasChildren = (await element.$$(".//*")).length > 0;

		if (sectionNumber == 1) {
			await expect(await elementHelpers.isElementPresent(selector)).to.equal(true);
			await expect(hasChildren).to.equal(false);
		} else {
			await expect(hasChildren).to.equal(true);
		}
	},

	sectionIsNotDisplayed: async function (sectionNumber) {
		const sectionToCheck =
			sectionNumber == 1 ? sectionNumber : sectionNumber - 1;
		const element = await driver.$(this.getSectionSelector(sectionToCheck));
		const hasChildren = (await element.$$(".//*").length) > 0;

		if (sectionNumber == 1) {
			await expect(await elementHelpers.isElementPresent(sectionToCheck)).to.equal(
				false
			);
		} else {
			await expect(hasChildren).to.equal(false);
		}
	},

	getSectionSelector: function (sectionNumber) {
		let selector;
		switch (sectionNumber) {
			case 1:
				selector = selectors.section.one;
				break;
			case 2:
				selector = selectors.section.two;
				break;
			case 3:
				selector = selectors.section.three;
				break;
			default:
				console.error(
					`This section: ${sectionNumber} does not exist on the list of possible choices`
				);
				break;
		}
		return selector;
	},

	getUserName: async function () {
		const cookie = await driver.getCookies(["jwt"]);
		const jwt = cookie[0].value;
		const info = await axios.request({
			url: `${SERVER.URL}/me`,
			method: "get",
			headers: {
				Authorization: `${jwt}`,
			},
		});
		const firstName = info.data.firstName;
		const lastName = info.data.lastName;
		return firstName + " " + lastName;
	},

	createCourse: async function(courseName) {
		await this.goToAddCourses();
		await this.setCourseName(courseName);
		await this.goToNextSection();
		await this.goToNextSection();
		await this.clickGoToCourseListBtn();
	},

	createCourseWithStudents: async function(courseName, studentName) {
		await this.goToAddCourses();
		await this.setCourseName(courseName);
		await this.goToNextSection();
		await elementHelpers.selectOptionByText(selectors.multipleChoiceSelectForStudents ,studentName);
		await this.goToNextSection();
		await this.clickGoToCourseListBtn();
	},

	//Course data section
	courseNameIsNotEntered: async function () {
		const courseNameContainer = await driver.$(selectors.courseNameInput);
		const placeholderText = await courseNameContainer.getAttribute("placeholder");
		await expect(placeholderText).to.equal("z.B. Mathe 10a");
	},

	setCourseName: async function (courseName) {
		const courseNameContainer = await driver.$(selectors.courseNameInput);
		await courseNameContainer.setValue(courseName);
	},

	setColour: async function (colourName) {
		const listOfColours = courseColour;
		if (listOfColours.includes(colourName)) {
			const childNumber = listOfColours.indexOf(colourName) + 1;
			const colour = await driver.$(
				selectors.colourPicker + `:nth-child(${childNumber})`
			);
			await colour.click();
		} else {
			console.warn(
				`you did not insert a valid color. Must be ${listOfColours},\n you inserted ${colourName}`
			);
		}
	},

	teachersNameisSetByDefault: async function () {
		const username = await this.getUserName();
		const listOfTeachersNames = await this.getListOfSelected(
			selectors.teacherContainer
		);
		await expect(listOfTeachersNames).to.include(username);
	},

	noTeacherSubstituteIsSet: async function () {
		await this.isDefaultValueInContainer(
			selectors.teacherSubContainer,
			"Lehrer:in auswählen"
		);
	},

	// could be extended with verifying the date is correct
	timeSpanIsSet: async function () {
		const startValueSelector = await driver.$(selectors.timeSpan.start);
		const startValue = await startValueSelector.getValue();
		await expect(startValue.length).not.to.equal(0);

		const endsValueSelector = await driver.$(selectors.timeSpan.end);
		const endsValue = await endsValueSelector.getValue();
		await expect(endsValue.length).not.to.equal(0);
	},

	//Participants section
	noClassIsSet: async function () {
		await this.isDefaultValueInContainer(
			selectors.classContainer,
			"Klasse(n) auswählen"
		);
	},

	noStudentIsSet: async function () {
		await this.isDefaultValueInContainer(
			selectors.studentsContainer,
			"Schüler:innen auswählen"
		);
	},

	clickCreateCourseAndContinueBtn: async function () {
		await waitHelpers.waitAndClick(selectors.nextSectionBtn);
	},

	//Final section
	clickGoToCourseListBtn: async function () {
		await waitHelpers.waitAndClick(selectors.goToCourseListBtn);
	},

	finalButtonsAreVisible: async function () {
		await expect(
			await elementHelpers.isElementPresent(selectors.createNewCourseBtn)
		).to.equal(true);
		await expect(
			await elementHelpers.isElementPresent(selectors.goToCourseListBtn)
		).to.equal(true);
	},
};
