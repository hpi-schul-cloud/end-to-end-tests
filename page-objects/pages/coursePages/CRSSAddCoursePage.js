/*[url/courses]/add]*/
"use strict";
const { CLIENT } = require("../../../shared-objects/servers");
const elementHelpers = require("../../../runtime/helpers/elementHelpers");
const axios = require("axios");

const urlCoursesAdd = `${CLIENT.URL}/courses/add`;

//Sections

const nextSectionBtn = "#nextSection";
const section = {
		one: '[data-testid="section-1-area"]',
		two: '[data-testid="section-2-area"]',
		three: '[data-testid="section-3-area"]',
};
const chosenDefInput = ".chosen-search-input.default";
const chosenInput = ".search-choice span";
const multipleChoiceSelectForStudents ='select[data-testid="pupils"]';
	//Course data section
const courseNameInput ='[data-testid="coursename"]';
const teacherContainer = '[data-testid="teachers_container"]';
const teacherSubContainer ='[data-testid="courseSubstitute_container"]';
const colourPicker = ".color-picker__item";
const timeSpan = {
		start: '[data-testid="date_start"]',
		end: "#untilDate",
};
//Participants section
const classContainer = '[data-testid="class_container"]';
const studentsContainer = '[data-testid="students_container"]';
//Final section
const createNewCourseBtn ='[data-testid="einen-weiteren-kurs-anlegen-btn"]';
const goToCourseListBtn = '[data-testid="zur-uebersicht-btn"]';

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
		await elementHelpers.click(nextSectionBtn);
	},

	getListOfSelected: async function (containerSelector) {
		const container = await driver.$(containerSelector);
		const listOfElements = await container.$$(chosenInput);
		return await elementHelpers.getTextListFromListOfElements(listOfElements);
	},

	isDefaultValueInContainer: async function (containerSelector, defaultText) {
		const container = await driver.$(containerSelector);
		const listOfElements = await container.$$(chosenDefInput);
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
				selector = section.one;
				break;
			case 2:
				selector = section.two;
				break;
			case 3:
				selector = section.three;
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
			url: "http://localhost:3030/me",
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
		await elementHelpers.selectOptionByText(multipleChoiceSelectForStudents ,studentName);
		await this.goToNextSection();
		await this.clickGoToCourseListBtn();
	},

	//Course data section
	courseNameIsNotEntered: async function () {
		const courseNameContainer = await driver.$(courseNameInput);
		const placeholderText = await courseNameContainer.getAttribute("placeholder");
		await expect(placeholderText).to.equal("z.B. Mathe 10a");
	},

	setCourseName: async function (courseName) {
		const courseNameContainer = await driver.$(courseNameInput);
		await courseNameContainer.setValue(courseName);
	},

	setColour: async function (colourName) {
		const listOfColours = courseColour;
		if (listOfColours.includes(colourName)) {
			const childNumber = listOfColours.indexOf(colourName) + 1;
			const colour = await driver.$(
				colourPicker + `:nth-child(${childNumber})`
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
			teacherContainer
		);
		await expect(listOfTeachersNames).to.include(username);
	},

	noTeacherSubstituteIsSet: async function () {
		await this.isDefaultValueInContainer(
			teacherSubContainer,
			"Lehrer:in auswählen"
		);
	},

	// could be extended with verifying the date is correct
	timeSpanIsSet: async function () {
		const startValueSelector = await driver.$(timeSpan.start);
		const startValue = await startValueSelector.getValue();
		await expect(startValue.length).not.to.equal(0);

		const endsValueSelector = await driver.$(timeSpan.end);
		const endsValue = await endsValueSelector.getValue();
		await expect(endsValue.length).not.to.equal(0);
	},

	//Participants section
	noClassIsSet: async function () {
		await this.isDefaultValueInContainer(
			classContainer,
			"Klasse(n) auswählen"
		);
	},

	noStudentIsSet: async function () {
		await this.isDefaultValueInContainer(
			studentsContainer,
			"Schüler:innen auswählen"
		);
	},

	clickCreateCourseAndContinueBtn: async function () {
		await elementHelpers.click(nextSectionBtn);
	},

	//Final section
	clickGoToCourseListBtn: async function () {
		await elementHelpers.click(goToCourseListBtn);
	},

	finalButtonsAreVisible: async function () {
		await expect(
			await elementHelpers.isElementPresent(createNewCourseBtn)
		).to.equal(true);
		await expect(
			await elementHelpers.isElementPresent(goToCourseListBtn)
		).to.equal(true);
	},
};
