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
const teacherSelect = '#courseTeacher_chosen';
const teacherSubSelect ='#courseSubstitute_chosen';
const colourPicker = '[data-testid="color-picker"]';
const timeSpan = {
		start: '[data-testid="date_start"]',
		end: "#untilDate",
};
//Participants section
const classSelect = '#addClassesToCourse_chosen';
const studentSelect = '#addStudentsToCourse_chosen';
//Final section
const createNewCourseBtn ='[data-testid="einen-weiteren-kurs-anlegen-btn"]';
const goToCourseListBtn = '[data-testid="zur-uebersicht-btn"]';


async function goToAddCourses() {
	await navigationLeftPage.clickNavItemCourses();
	await courseListPage.clickCreateCourseBtn();
}

async function goToNextSection() {
	await elementHelpers.clickAndWait(nextSectionBtn);
}

async function isDefaultInputValue(containerSelector, defaultText) {
	await waitHelpers.waitUntilElementIsVisible(containerSelector);
	await waitHelpers.waitUntilElementAttributeEquals(containerSelector, 'placeholder', defaultText);
}

async function isSectionDisplayed(sectionNumber) {
	const element = await driver.$(getSectionSelector(sectionNumber));
	await element.waitForDisplayed();
}

async function isSectionNotDisplayed(sectionNumber) {
	const element = await driver.$(getSectionSelector(sectionNumber));
	await element.waitForDisplayed({ reverse: true });
}

function getSectionSelector(sectionNumber) {
	const sectionSelectors = {
		1: section.one,
		2: section.two,
		3: section.three
	};
	if (!(sectionNumber in sectionSelectors)) {
			console.error(`This section: ${sectionNumber} does not exist on the list of possible choices`);
			return undefined;
	}
	return sectionSelectors[sectionNumber]
}

/**
 * Use this method to create a course
 * if studentName is not set no student is added
 * if studentName is set a student is added
 */

async function createCourseWithStudent(courseName, studentName = 'default') {
	await goToAddCourses();
	await setCourseName(courseName);
	await goToNextSection();
	if (studentName !== 'default') await setStudent(studentName);
	await goToNextSection();
	await clickGoToCourseListBtn();
}

async function createCourse (courseName) {
	await goToAddCourses();
	await setCourseName(courseName);
	await goToNextSection();
	await goToNextSection();
	await clickGoToCourseListBtn();
}

async function isTeachersNameSetByDefault() {
	const username = await APIhelpers.getUserName();
	let listOfUsers = await elementHelpers.getTextFromAllElements(teacherSelect);
	await expect(listOfUsers).to.includes(username);
}

//Course data section
async function isCourseNameNotSet() {
	await isDefaultInputValue(courseNameInput, courseDefaultInputValue);
}

async function setCourseName(courseName) {
	await waitHelpers.waitAndSetValue(courseNameInput, courseName);
}

async function setTeacher(teacherFullname) {
	await elementHelpers.selectOptionsByText(teacherSelect, teacherFullname);
}

async function setCurrentUserAsTeacher() {
	const userFullname = await APIhelpers.getUserName();
	await setTeacher(userFullname);
}

async function getColourElement(colourName) {
	const listOfColours = courseListPage.courseColours;
	if (listOfColours.includes(colourName)) {
		const childNumber = listOfColours.indexOf(colourName) + 1;
		const colourElement = await waitUntilElementIsPresent(colourPicker + `:nth-child(${childNumber})`);
		return colourElement;
	} else {
		console.warn(`you did not insert a valid color. Must be ${listOfColours},\n you inserted ${colourName}`);
	}
}

async function setColour(colourName) {
	const element = await getColourElement(colourName);
	await elementHelpers.click(element);
}

async function isTeacherSubstituteNotSet () {
		const list = await elementHelpers.getListOfSelectedOption(teacherSubSelect);
		expect(list.length).to.equal(0);
	}

// could be extended with verifying the date is correct
async function isTimeSpanSet() {
	const startValueSelector = await waitHelpers.waitUntilElementIsPresent(timeSpan.start);
	const startValue = await startValueSelector.getValue();
	await expect(startValue.length).not.to.equal(0);

	const endsValueSelector = await waitHelpers.waitUntilElementIsPresent(timeSpan.end);
	const endsValue = await endsValueSelector.getValue();
	await expect(endsValue.length).not.to.equal(0);
}

//Members section
async function isClassNotSet() {
	const list = await elementHelpers.getListOfSelectedOption(classSelect);
	expect(list.length).to.equal(0);
}

async function isStudentNotSet () {
	const list = await elementHelpers.getListOfSelectedOption(studentSelect);
	expect(list.length).to.equal(0);
}

async function setStudent(studentName) {
	await elementHelpers.selectOptionsByText(studentSelect, studentName);
}

async function clickCreateCourseAndContinueBtn() {
	await elementHelpers.clickAndWait(nextSectionBtn);
}

//Final section
async function clickGoToCourseListBtn() {
	await elementHelpers.clickAndWait(goToCourseListBtn);
}

async function areFinalButtonsVisible() {
	await waitHelpers.waitUntilElementIsPresent(createNewCourseBtn);
	await waitHelpers.waitUntilElementIsPresent(goToCourseListBtn);
}

module.exports = {
	goToAddCourses,
	goToNextSection,
	clickCreateCourseAndContinueBtn,
	clickGoToCourseListBtn,
	isSectionDisplayed,
	isSectionNotDisplayed,
	isCourseNameNotSet,
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
	createCourseWithStudent,
	setStudent,
	createCourse
};

