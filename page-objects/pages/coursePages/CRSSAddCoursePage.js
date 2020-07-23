/*[url/courses]/add]*/
"use strict";

const addCourseData = require("../../../shared-objects/CRSSAddCourseData");
const eh = require("../../../runtime/helpers/elementHelpers");
const wh = require("../../../runtime/helpers/waitHelpers.js");
const { expectTrue } = require("../../../runtime/helpers/elementHelpers");

module.exports = {
	goToNextSection: async function () {
		await wh.waitAndClick(addCourseData.nextSectionBtn);
	},

	getSectionSelector: async function (sectionNumber) {
		let selector;
		switch (sectionNumber) {
			case 1:
				selector = addCourseData.section.one;
			case 2:
				selector = addCourseData.section.two;
			case 3:
				selector = addCourseData.section.three;
			default:
				console.error(
					`This section: ${sectionNumber} does not exist on the list of possible choices`
				);
				break;
		}
		return selector;
	},

	getListOfSelected: async function (containerSelector) {
		let container = await driver.$(addCourseData.teacherContainer);
		return await container.$$(addCourseData.chosenInput);
	},

	isDefaultTextInContainer: async function (
		containerSelector,
		defaultContainerText
	) {
		let container = await driver.$(containerSelector);
		let defInputText = await container
			.$(addCourseData.chosenDefInput)
			.getValue();
		await expect(defInputText).to.equal(defaultContainerText);
	},

	sectionIsDisplayed: async function (sectionNumber) {
		await expectTrue(
			eh.isElementDisplayed(getSectionSelector(sectionNumber))
		);
	},

	sectionIsNotDisplayed: async function (sectionNumber) {
		await expectFalse(
			eh.isElementDisplayed(getSectionSelector(sectionNumber))
		);
	},

	getUserName: async function () {
		const cookie = await driver.getCookies(["jwt"]);
		const jwt = cookie[0].value;
		const info = await Axios.request({
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
	setCourseName: async function (courseName) {
		let courseNameInput = await driver.$(addCourseData.courseNameInput);
		await courseNameInput.setValue(courseName);
	},

	setColour: async function (colourName) {
		const listOfColours = addCourseData.listOfColours;

		if (listOfColours.includes(colourName)) {
			const childNumber = listOfColours.indexOf(colourName) + 1;
			const element = eh.getNthChildOfSelector(
				addCourseData.colourPicker,
				childNumber
			);
			await element.click();
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
		await this.isDefaultTextInContainer(
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
		await this.isDefaultTextInContainer(
			addCourseData.classContainer,
			"Klasse(n) auswählen"
		);
	},

	noStudentIsSet: async function () {
		await this.isDefaultTextInContainer(
			addCourseData.studentsContainer,
			"Schüler:innen auswählen"
		);
	},

	clickCreateCourseAndNextBtn: async function () {
		await driver.$(addCourseData.nextSectionBtn).click();
		await driver.pause(1500);
	},

	//Final section
	goToCourseListPage: async function () {
		let button = await driver.$(addCourseData.goToCourseListPageBtn);
		await button.click();
		await driver.pause(1000);
	},

	buttonsAreVisible: async function () {
		let elem1 = await driver.$$(addCourseData.createNewCourseBtn);
		await expectTrue(eh.isElementPresent(addCourseData.createNewCourseBtn));
		await expectTrue(
			eh.isElementPresent(addCourseData.goToCourseListPageBtn)
		);
	},
};
