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
const multipleChoiceSelectForStudents ='select[data-testid="pupils"]';
	//Course data section
const courseNameInput ='[data-testid="coursename"]';
const teacherContainer = 'select[data-testid="teachersearch"]';
const teacherList = '[data-testid="teacher"]'
const teacherSubContainer ='[data-testid="courseSubstitute_container"]';
const subTeachersList = '[data-testid="substituent"] option'
const colourPicker = ".color-picker__item";
const timeSpan = {
		start: '[data-testid="date_start"]',
		end: "#untilDate",
};
//Participants section
const classContainer = '[data-testid="class_container"]';
const classList = '[data-testid="classes"] option'
const studentsContainer = '[data-testid="students_container"]';
const studentsList = '[data-testid="pupils"] option'
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


async function goToAddCourses() {
		await elementHelpers.loadPage(urlCoursesAdd, 20)
	}

async function goToNextSection () {
		await elementHelpers.click(nextSectionBtn);
	}

async function getListOfSelected (containerSelector, list) {
		const container = await driver.$(containerSelector);
		const listOfElements = await container.$$(list);
		return await elementHelpers.getTextListFromListOfElements(listOfElements);
	}

async function noElementIsSelected (containerSelector, list) {
		const container = await driver.$(containerSelector);
		const listOfElements = await container.$$(list);
		listOfElements.forEach( (el) => {
			const selectedOption = el.getAttribute('selected');
			expect(selectedOption).is.not.true;
		});
	}

async function isSectionDisplayed (sectionNumber) {
		const sectionToCheck =
			sectionNumber === 1 ? sectionNumber : sectionNumber - 1;
		const selector = this.getSectionSelector(sectionToCheck);
		const element = await driver.$(selector);
		const hasChildren = (await element.$$(".//*")).length > 0;

		if (sectionNumber === 1) {
			await expect(await elementHelpers.isElementPresent(selector)).to.equal(true);
			await expect(hasChildren).to.equal(false);
		} else {
			await expect(hasChildren).to.equal(true);
		}
	}

async function isSectionNotDisplayed (sectionNumber) {
		const sectionToCheck =
			sectionNumber === 1 ? sectionNumber : sectionNumber - 1;
		const element = await driver.$(this.getSectionSelector(sectionToCheck));
		const hasChildren = (element.$$(".//*").length) > 0;

		if (sectionNumber === 1) {
			await expect(await elementHelpers.isElementPresent(sectionToCheck)).to.equal(
				false
			);
		} else {
			await expect(hasChildren).to.equal(false);
		}
	}

function getSectionSelector(sectionNumber) {
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
	}

async function getUserName () {
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
	}

async function createCourse(courseName) {
		await this.goToAddCourses();
		await this.setCourseName(courseName);
		await this.goToNextSection();
		await this.goToNextSection();
		await this.clickGoToCourseListBtn();
	}

async function createCourseWithStudents(courseName, studentName) {
		await this.goToAddCourses();
		await this.setCourseName(courseName);
		await this.goToNextSection();
		await elementHelpers.selectOptionByText(multipleChoiceSelectForStudents ,studentName);
		await this.goToNextSection();
		await this.clickGoToCourseListBtn();
	}

	//Course data section
async function isCourseNameNotEntered () {
		const courseNameContainer = await driver.$(courseNameInput);
		const placeholderText = await courseNameContainer.getAttribute("placeholder");
		await expect(placeholderText).to.equal("z.B. Mathe 10a");
	}

async function setCourseName (courseName) {
		const courseNameContainer = await driver.$(courseNameInput);
		await courseNameContainer.setValue(courseName);
	}

async function setColour (colourName) {
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
	}

async function isTeachersNameSetByDefault () {
		const username = await this.getUserName();
		const listOfTeachersNames = await this.getListOfSelected(
			teacherContainer, teacherList
		);
		await expect(listOfTeachersNames.toString()).to.include(username);
	}

async function isTeacherSubstituteNotSet () {
		await this.noElementIsSelected(
			teacherSubContainer,
			subTeachersList
		);
	}

	// could be extended with verifying the date is correct
async function isTimeSpanSet () {
		const startValueSelector = await driver.$(timeSpan.start);
		const startValue = await startValueSelector.getValue();
		await expect(startValue.length).not.to.equal(0);

		const endsValueSelector = await driver.$(timeSpan.end);
		const endsValue = await endsValueSelector.getValue();
		await expect(endsValue.length).not.to.equal(0);
	}

	//Participants section
async function isClassNotSet () {
		await this.noElementIsSelected(
			classContainer,
			classList
		);
	}

async function isStudentNotSet () {
		await this.noElementIsSelected(
			studentsContainer,
			studentsList
		);
	}

async function clickCreateCourseAndContinueBtn () {
		await elementHelpers.click(nextSectionBtn);
	}

	//Final section
async function clickGoToCourseListBtn () {
		await elementHelpers.click(goToCourseListBtn);
	}

async function areFinalButtonsVisible () {
		await expect(
			await elementHelpers.isElementPresent(createNewCourseBtn)
		).to.equal(true);
		await expect(
			await elementHelpers.isElementPresent(goToCourseListBtn)
		).to.equal(true);
	}

module.exports = {
	goToAddCourses,
	goToNextSection,
	getListOfSelected,
	noElementIsSelected,
	isSectionDisplayed,
	isSectionNotDisplayed,
	getSectionSelector,
	getUserName,
	createCourse,
	createCourseWithStudents,
	isCourseNameNotEntered,
	setCourseName,
	setColour,
	isTeachersNameSetByDefault,
	isTeacherSubstituteNotSet,
	isTimeSpanSet,
	isClassNotSet,
	isStudentNotSet,
	clickCreateCourseAndContinueBtn,
	clickGoToCourseListBtn,
	areFinalButtonsVisible
};
