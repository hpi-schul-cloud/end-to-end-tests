/*[url/courses]*/
"use strict";
const {CLIENT} = require("../../../shared-objects/servers");
const eh = require("../../../runtime/helpers/elementHelpers");
const wh = require("../../../runtime/helpers/waitHelpers");
const {expect} = require("chai");

const urlCourses = `${ CLIENT.URL }/courses`;
const searchCourseFiled = ".input-group .search-field";

const courseWrapper = ".sc-card-wrapper";
const titleOfCourse = ".title";
const memberBtn = ".btn-member";

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
    corn: "background:#FFEE58"
};

module.exports = {
    section: {
        allCourses: ".section-courses",
        activeCourses: ".section-activeCourses",
        archievedCourses: ".section-archievedCourses"
    },

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
        const allCourses = await this.getListOfCourseTitlesInSection(section.allCourses);
        expect(allCourses).to.include(coursename);
    },

    isCorrectCourseColour: async function (colour) {
        const activeCoursesContainer = await driver.$(section.activeCourses);
        const coursesOnThePage = await activeCoursesContainer.$$(container_of_element);
        const indexOfTheLastAddedCourse = await coursesOnThePage.length;
        const container = await driver.$(container_of_element + ":nth-child(" + indexOfTheLastAddedCourse + ")");
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
            case "grey": colourSelector = courseColour.grey;
                break;
            case "metallicGold": colourSelector = courseColour.metallicGold;
                break;
            case "blue": colourSelector = courseColour.blue;
                break;
            case "green": colourSelector = courseColour.green;
                break;
            case "darkGrey": colourSelector = courseColour.darkGrey;
                break;
            case "goldenPoppy": colourSelector = courseColour.goldenPoppy;
                break;
            case "martini": colourSelector = courseColour.martini;
                break;
            case "violetRed": colourSelector = courseColour.violetRed;
                break;
            case "corn": colourSelector = courseColour.corn;
                break;
            default:
                console.error(`This colour: ${colourName} does not exist on the list of possible choices`);
                break;
        }
        return colourSelector;
    },

    fillCourseNameIntoSearchInputField: async function (courseName) {
        await eh.fillInputField(searchCourseFiled, courseName);
    },

    countDisplayedCoursesForSection: async function (section) {
        const elem = await this.getListOfCoursesInSection(section);
        var numberOfDisplayedCourses = 0;
        for (var i = 0; i < elem.length; i++) {
            if ((await elem[i].isDisplayed()) == true) {
                numberOfDisplayedCourses += 1;
            }
        }
        return numberOfDisplayedCourses;
    },

    getCourseWrapper: async function (courseName) {
        const courseWrapper = await driver.$('//*[contains(@class,"sc-card-wrapper") and contains(.//span, "' + courseName + '")]');
        return courseWrapper;
    },

    getNamesOfMembers: async function () {
        const listOfMembers = await driver.$$("#member-modal-body > ol > li");
        return eh.getTextListFromListOfElements(listOfMembers);
    },

    // GENERAL
    areMembersOnTheListInCourseForSection: async function (courseName, members, section) {
        await this.clickPupilIconInCourseInSection(courseName, section);
        await driver.pause(1000);
        let names = await this.getNamesOfMembers();
        expect(names).to.have.members(members);
    },

    isCorrectNumberOfMembersInCourseForSection: async function (courseName, members, section) {
        const numberOfExpectedMembers = members.length;
        const numberOfMembers = await this.getNumberOfMembersInGivenCourseInSection(courseName, section);
        expect(numberOfMembers).to.equal(numberOfExpectedMembers);
    },

    getListOfCoursesInSection: async function (section) {
        const listOfCourses = await driver.$$(section + " " + courseWrapper);
        return listOfCourses;
    },

    getIndexOfGivenCourseInSection: async function (courseName, section) {
        const listOfCourseTitlesForSection = await this.getListOfCourseTitlesInSection(section);
        var index = listOfCourseTitlesForSection.indexOf(courseName);
        return index;
    },

    getWrapperOfCourseInSection: async function (courseName, section) {
        var index = await this.getIndexOfGivenCourseInSection(courseName, section);
        const list = await this.getListOfCoursesInSection(section);
        const element = list[index];
        return element;
    },

    getListOfCourseTitlesInSection: async function (section) {
        const courseList = await this.getListOfCoursesInSection(section);
        let courseTitleList = await Promise.all(courseList.map(async (element) => (await element.$(titleOfCourse)).getText()));
        return courseTitleList;
    },

    countCoursesWhichTitlesContainTextInSection: async function (text, section) {
        let listOfCourseNames = await this.getListOfCourseTitlesInSection(section);
        var re = new RegExp(text, "gi");
        const matchingNames = listOfCourseNames.filter((n) => n.match(re));
        return matchingNames.length;
    },

    clickOnCourseInSection: async function (courseName, section) {
        const courseIndex = await this.getIndexOfGivenCourseInSection(courseName, section);
        const courseList = await this.getListOfCoursesInSection(section);
        const element = courseList[courseIndex];
        await element.click();
    },

    getNumberOfMembersInGivenCourseInSection: async function (courseName, section) {
        const courseWrapper = await this.getWrapperOfCourseInSection(courseName, section);
        await driver.pause(1000);
        const element = await courseWrapper.$(memberBtn);
        let text = await element.getText();
        let number = parseInt(text);
        return number;
    },

    clickPupilIconInCourseInSection: async function (courseName, section) {
        const courseWrapper = await this.getWrapperOfCourseInSection(courseName, section);
        await driver.pause(1000);
        let pupilIcon = await courseWrapper.$(memberBtn);
        await pupilIcon.click();
        await driver.pause(500);
    },

    // ALL COURSES
    getListOfAllCourses: async function () {
        return await this.getListOfCoursesInSection(section.allCourses);
    },

    countAllDisplayedCourses: async function () {
        return await this.countDisplayedCoursesForSection(section.allCourses);
    },

    countAllCoursesWhichTitlesContainText: async function (text) {
        return await this.countCoursesWhichTitlesContainTextInSection(text, section.allCourses);
    },

    // ACTIVE COURSES
    areMembersOnTheListInActiveCourse: async function (courseName, members) {
        await this.areMembersOnTheListInCourseForSection(courseName, members, section.activeCourses);
    },

    isCorrectNumberOfMembersInActiveCourse: async function (courseName, members) {
        await this.isCorrectNumberOfMembersInCourseForSection(courseName, members, section.activeCourses);
    },

    clickPupilIconInActiveCourse: async function (courseName) {
        await this.clickPupilIconInCourseInSection(courseName, section.activeCourses);
    },

    clickOnActiveCourse: async function (courseName) {
        await element.clickOnCourseInSection(courseName, section.activeCourses);
    },

    getNumberOfMembersInGivenActiveCourse: async function (courseName) {
        return await this.getNumberOfMembersInGivenCourseInSection(courseName, section.activeCourses);
    },

    getIndexOfActiveCourseWithName: async function (courseName) {
        return await this.getIndexOfGivenCourseInSection(courseName, section.activeCourses);
    },

    getListOfActiveCourses: async function () {
        return await this.getListOfCoursesInSection(section.activeCourses);
    },

    countActiveDisplayedCourses: async function () {
        return await this.countDisplayedCoursesForSection(section.activeCourses);
    },

    countActiveCoursesWhichTitlesContainText: async function (text) {
        return await this.countCoursesWhichTitlesContainTextInSection(text, section.activeCourses);
    }
};
