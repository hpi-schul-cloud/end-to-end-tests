/*[url/courses]/add]*/
"use strict";
const elementHelpers = require("../../../runtime/helpers/elementHelpers");
const courseListPage = require('./CRSSCourseListPage');
const navigationLeftPage= require('../NavigationLeftPage');
const waitHelpers = require("../../../runtime/helpers/waitHelpers");
const { waitUntilElementIsPresent } = require("../../../runtime/helpers/waitHelpers");
const APIhelpers = require("../../../runtime/helpers/APIhelpers");
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
const courseNameInput ='#nameOfTheCourse';
const teacherSelect = '#courseTeacher';
const teacherSubSelect ='#courseSubstitute';
const colourPicker = ".color-picker__item";
const timeSpan = {
		start: '[data-testid="date_start"]',
		end: "#untilDate",
};
//Participants section
const classSelect = '#addClassesToCourse';
const studentSelect = '#addStudentsToCourse';
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
		await navigationLeftPage.clickNavItemCourses();
		await courseListPage.clickCreateCourseBtn()
	}

async function goToNextSection () {
	await elementHelpers.clickAndWait(nextSectionBtn);
}


async function isDefaultInputValue (containerSelector, defaultText) {
	await waitHelpers.waitUntilElementIsVisible(containerSelector);
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
	await setCurrentUserAsTeacher();
	await goToNextSection();
	await goToNextSection();
	await clickGoToCourseListBtn();
}

async function createCourseWithStudents(courseName, studentNameList) {
	await goToAddCourses();
	await setCourseName(courseName);
	await setCurrentUserAsTeacher();
	await goToNextSection();
	await setStudent(studentNameList);
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

async function setTeacher (teacherFullname) {
	await elementHelpers.selectOptionByText(teacherSelect, teacherFullname);
}

async function setCurrentUserAsTeacher () {
	const userFullname = await APIhelpers.getUserName();
	await setTeacher(userFullname);
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

async function isTeachersNameSetByDefault() {
		const username = await APIhelpers.getUserName();
		const isSelected = await elementHelpers.isOptionSelected(teacherSelect, username);
		await expect(isSelected).to.be.true;
	}

async function isTeacherSubstituteNotSet () {
		const list = await elementHelpers.getListOfSelectedOption(teacherSubSelect);
		expect(list.length).to.equal(0);
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
	const list = await elementHelpers.getListOfSelectedOption(classSelect);
	expect(list.length).to.equal(0);
	}

async function isStudentNotSet () {
	const list = await elementHelpers.getListOfSelectedOption(studentSelect);
	expect(list.length).to.equal(0);
	}

async function setStudent(studentName) {
	await elementHelpers.selectOptionByText(studentSelect, studentName);
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
	setTeacher,
	setCurrentUserAsTeacher,
	setColour,
	createCourse,
	createCourseWithStudents,
};
