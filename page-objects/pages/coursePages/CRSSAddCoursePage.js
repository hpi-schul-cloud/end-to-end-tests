/*[url/courses]/add]*/
"use strict";

const addCourseData = require("../../../shared-objects/CRSSAddCourseData");
const eh = require("../../../runtime/helpers/elementHelpers");
const wh = require("../../../runtime/helpers/waitHelpers");
const axios = require("axios");

module.exports = {
	goToNextSection: async function () {
		await wh.waitAndClick(addCourseData.nextSectionBtn);
	},

	getListOfSelected: async function (containerSelector) {
		let container = await driver.$(containerSelector);
		let listOfElements = await container.$$(addCourseData.chosenInput);
		return await eh.getTextListFromListOfElements(listOfElements);
	},

	isDefaultValueInContainer: async function (containerSelector, defaultText) {
		let container = await driver.$(containerSelector);
		let listOfElements = await container.$$(addCourseData.chosenDefInput);
		let valueList = await eh.getValueListFromListOfElements(listOfElements);
		let isOnlyOneText = valueList.length == 1;
		await expect(isOnlyOneText).is.equal(true);
		await expect(valueList).includes(defaultText);
	},

	sectionIsDisplayed: async function (sectionNumber) {
		let sectionToCheck =
			sectionNumber == 1 ? sectionNumber : sectionNumber - 1;
		let selector = this.getSectionSelector(sectionToCheck);
		let element = await driver.$(selector);
		let hasChildren = (await element.$$(".//*")).length > 0;

		if (sectionNumber == 1) {
			await expect(await eh.isElementPresent(selector)).to.equal(true);
			await expect(hasChildren).to.equal(false);
		} else {
			await expect(hasChildren).to.equal(true);
		}
	},

	sectionIsNotDisplayed: async function (sectionNumber) {
		let sectionToCheck =
			sectionNumber == 1 ? sectionNumber : sectionNumber - 1;
		let element = await driver.$(this.getSectionSelector(sectionToCheck));
		let hasChildren = (await element.$$(".//*").length) > 0;

		if (sectionNumber == 1) {
			await expect(await eh.isElementPresent(sectionToCheck)).to.equal(
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
				selector = addCourseData.section.one;
				break;
			case 2:
				selector = addCourseData.section.two;
				break;
			case 3:
				selector = addCourseData.section.three;
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

	//Course data section
	courseNameIsNotEntered: async function () {
		let courseNameInput = await driver.$(addCourseData.courseNameInput);
		let placeholderText = await courseNameInput.getAttribute("placeholder");
		await expect(placeholderText).to.equal("z.B. Mathe 10a");
	},

	setCourseName: async function (courseName) {
		let courseNameInput = await driver.$(addCourseData.courseNameInput);
		await courseNameInput.setValue(courseName);
	},

	setColour: async function (colourName) {
		const listOfColours = addCourseData.listOfColours;
		if (listOfColours.includes(colourName)) {
			const childNumber = listOfColours.indexOf(colourName) + 1;
			const colour = await driver.$(
				addCourseData.colourPicker + `:nth-child(${childNumber})`
			);
			await colour.click();
		} else {
			console.warn(
				`you did not insert a valid color. Must be ${listOfColours},\n you inserted ${colourName}`
			);
		}
	},

	teachersNameisSetByDefault: async function () {
		let username = await this.getUserName();
		let listOfTeachersNames = await this.getListOfSelected(
			addCourseData.teacherContainer
		);
		await expect(listOfTeachersNames).to.include(username);
	},

	noTeacherSubstituteIsSet: async function () {
		await this.isDefaultValueInContainer(
			addCourseData.teacherSubContainer,
			"Lehrer:in auswählen"
		);
	},

	// could be extended with verifying the date is correct
	timeSpanIsSet: async function () {
		let startValueSelector = await driver.$(addCourseData.timeSpan.start);
		let startValue = await startValueSelector.getValue();
		await expect(startValue.length).not.to.equal(0);

		let endsValueSelector = await driver.$(addCourseData.timeSpan.end);
		let endsValue = await endsValueSelector.getValue();
		await expect(endsValue.length).not.to.equal(0);
	},

	//Participants section

	noClassIsSet: async function () {
		await this.isDefaultValueInContainer(
			addCourseData.classContainer,
			"Klasse(n) auswählen"
		);
	},

	noStudentIsSet: async function () {
		await this.isDefaultValueInContainer(
			addCourseData.studentsContainer,
			"Schüler:innen auswählen"
		);
	},

	clickCreateCourseAndContinueBtn: async function () {
		await wh.waitAndClick(addCourseData.nextSectionBtn);
	},

	//Final section
	clickGoToCourseListBtn: async function () {
		await wh.waitAndClick(addCourseData.goToCourseListBtn);
	},

	finalButtonsAreVisible: async function () {
		await expect(
			await eh.isElementPresent(addCourseData.createNewCourseBtn)
		).to.equal(true);
		await expect(
			await eh.isElementPresent(addCourseData.goToCourseListBtn)
		).to.equal(true);
	},
};
