/*[url/courses]/add]*/
"use strict";
const { CLIENT } = require("../../../shared-objects/servers");
const elementHelpers = require("../../../runtime/helpers/elementHelpers");
const axios = require("axios");
const waitHelpers = require("../../../runtime/helpers/waitHelpers");
const { waitUntilElementIsPresent } = require("../../../runtime/helpers/waitHelpers");
const APIhelpers = require("../../../runtime/helpers/APIhelpers");

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
const courseDefaultInputValue = "z.B. Mathe 10a";
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
	await elementHelpers.clickAndWait(nextSectionBtn);
}

async function getListOfSelected (containerSelector, list) {
	const container = await waitHelpers.waitUntilElementIsPresent(containerSelector);
		const listOfElements = await container.$$(list);
		return await elementHelpers.getTextListFromListOfElements(listOfElements);
	}

async function noElementIsSelected (containerSelector, list) {
	const container = await waitHelpers.waitUntilElementIsPresent(containerSelector);
		const listOfElements = await container.$$(list);
		listOfElements.forEach( (el) => {
			const selectedOption = el.getAttribute('selected');
			expect(selectedOption).is.not.true;
		});
	}



async function isDefaultInputValue (containerSelector, defaultText) {
	const container = await waitHelpers.waitUntilElementIsPresent(containerSelector);
	await waitHelpers.waitUntilElementAttributeEquals(containerSelector, "placeholder", defaultText)
}

async function isSectionDisplayed (sectionNumber) {
	await waitHelpers.waitUntilPageLoads();
	const sectionToCheck = sectionNumber === 1 ? sectionNumber : sectionNumber - 1;
	const selector = getSectionSelector(sectionToCheck);
	const element = await waitHelpers.waitUntilElementIsPresent(selector);
	const hasChildren = (await element.$$(".//*")).length > 0;

	if (sectionNumber === 1) {
		await expect(await elementHelpers.isElementPresent(selector)).to.equal(true);
		await expect(hasChildren).to.equal(false);
	} else {
		await expect(hasChildren).to.equal(true);
	}
}

async function isSectionNotDisplayed (sectionNumber) {
	await waitHelpers.waitUntilPageLoads();
	const sectionToCheck = sectionNumber === 1 ? sectionNumber : sectionNumber - 1;
	const element = await driver.$(getSectionSelector(sectionToCheck));
	const hasChildren = (await element.$$(".//*").length) > 0;
	if (sectionNumber == 1) {
		await expect(await elementHelpers.isElementPresent(sectionToCheck)).to.equal(false);
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
			console.error(`This section: ${sectionNumber} does not exist on the list of possible choices`);
			break;
	}
	return selector;
}

async function createCourse(courseName) {
	await goToAddCourses();
	await setCourseName(courseName);
	await goToNextSection();
	await goToNextSection();
	await clickGoToCourseListBtn();
}

async function createCourseWithStudents(courseName, studentName) {
	await goToAddCourses();
	await setCourseName(courseName);
	await goToNextSection();
	await selectStudent(studentName);
	await goToNextSection();
	await clickGoToCourseListBtn();
}

//Course data section
async function isCourseNameNotEntered () {
	await isDefaultInputValue(courseNameInput, courseDefaultInputValue);
}

async function setCourseName (courseName) {
	await waitHelpers.waitAndSetValue(courseNameInput, courseName);
}

async function getColourElement(colourName) {
	const listOfColours = courseColour;
	if (listOfColours.includes(colourName)) {
		const childNumber = listOfColours.indexOf(colourName) + 1;
		const colourElement = await waitUntilElementIsPresent(colourPicker + `:nth-child(${childNumber})`);
		return colourElement;
	} else {
		console.warn(
			`you did not insert a valid color. Must be ${listOfColours},\n you inserted ${colourName}`);
	}
}

async function setColour (colourName) {
	const element = await getColourElement(colourName);
	await elementHelpers.click(element);
}

async function isTeachersNameSetByDefault () {
		const username = await APIhelpers.getUserName();
		const listOfTeachersNames = await getListOfSelected(
			teacherContainer, teacherList
		);
		await expect(listOfTeachersNames.toString()).to.include(username);
	}

async function isTeacherSubstituteNotSet () {
		await noElementIsSelected(
			teacherSubContainer,
			subTeachersList
		);
	}

// could be extended with verifying the date is correct
async function isTimeSpanSet () {
	const startValueSelector = await waitHelpers.waitUntilElementIsPresent(timeSpan.start);
	const startValue = await startValueSelector.getValue();
	await expect(startValue.length).not.to.equal(0);

	const endsValueSelector = await waitHelpers.waitUntilElementIsPresent(timeSpan.end);
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

async function selectStudent(studentName) {
	await elementHelpers.selectOptionByText(multipleChoiceSelectForStudents, studentName);
}

async function clickCreateCourseAndContinueBtn () {
	await elementHelpers.clickAndWait(nextSectionBtn);
}

//Final section
async function clickGoToCourseListBtn () {
	await elementHelpers.clickAndWait(goToCourseListBtn);
}

async function areFinalButtonsVisible () {
	await waitHelpers.waitUntilElementIsPresent(createNewCourseBtn);
	await waitHelpers.waitUntilElementIsPresent(goToCourseListBtn)
}

module.exports = {
	goToAddCourses,
	goToNextSection,
	getListOfSelected,
	noElementIsSelected,
	clickCreateCourseAndContinueBtn,
	clickGoToCourseListBtn,
	isSectionDisplayed,
	isSectionNotDisplayed,
	isCourseNameNotEntered,
	isTeachersNameSetByDefault,
	isTeacherSubstituteNotSet,
	isTimeSpanSet,
	isClassNotSet,
	isStudentNotSet,
	areFinalButtonsVisible,
	setCourseName,
	setColour,
	createCourse,
	createCourseWithStudents,
};
