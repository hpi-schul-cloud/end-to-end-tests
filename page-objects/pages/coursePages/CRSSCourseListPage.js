/*[url/courses]*/
"use strict";
const {CLIENT} = require("../../../shared-objects/servers")
const elementHelpers = require("../../../runtime/helpers/elementHelpers");
const waitHelpers = require("../../../runtime/helpers/waitHelpers");
const startPage = require('../../../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin');
const loginPage = require('../../../page-objects/pages/generalPagesBeforeLogin/LoginPage');
const logoutPage = require('../../../page-objects/pages/generalPagesBeforeLogin/LogoutPage');

const urlCourses = `${CLIENT.URL}/courses`;

const selector = {
    searchCourseFiled: ".input-group .search-field",
    courseWrapper: ".sc-card-wrapper",
    titleOfCourse: ".title",
    memberBtn: ".btn-member",
    homeworktab: '.tabs button[data-testid="hometasks"]',
    importCourseBtn: '[data-testid="import-course-btn"]',
    createCourseBtn: '[data-testid="create-course-btn"]',
    container_of_element: '[data-testid="container_of_element"]',
    header_of_element: '[data-testid="header-of-element"]',
};

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
        await elementHelpers.loadPage(urlCourses, 30);
    },

    importAndCreateCourseBtnsAreVisible: async function () {
        expect(await elementHelpers.isElementPresent(selector.importCourseBtn)).to.equal(true);
        expect(await elementHelpers.isElementPresent(selector.createCourseBtn)).to.equal(true);
    },

    courseIsDisplayedCorrectly: async function (courseName) {
        const activeCoursesContainer = await driver.$(this.section.activeCourses);
        const coursesOnThePage = await activeCoursesContainer.$$(selector.titleOfCourse);
        const courseCount = await coursesOnThePage.length;
        const courseTitleCard = coursesOnThePage[courseCount - 1];
        const courseTitle = await courseTitleCard.getText();
        expect(courseTitle).to.equal(courseName);
    },

    isCourseOnList: async function (coursename) {
        const allCourses = await this.getListOfCourseTitlesInSection(this.section.allCourses);
        expect(allCourses).to.include(coursename);
    },

    isCorrectCourseColour: async function (colour) {
        const activeCoursesContainer = await driver.$(this.section.activeCourses);
        const coursesOnThePage = await activeCoursesContainer.$$(selector.container_of_element);
        const indexOfTheLastAddedCourse = await coursesOnThePage.length;
        const container = await driver.$(selector.container_of_element + ":nth-child(" + indexOfTheLastAddedCourse + ")");
        const lastAddedCourse = await container.$(selector.header_of_element);
        const styleArray = await lastAddedCourse.getHTML();
        const regexp = /background:#[A-F, 0-9]{6}/;
        const styleMatches = styleArray.match(regexp);
        const style = styleMatches[0];
        const colourNumber = this.getColourSelector(colour);
        expect(style).to.equal(colourNumber);
    },

    clickCreateCourseBtn: async function () {
        await waitHelpers.waitAndClick(selector.createCourseBtn);
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
        await elementHelpers.fillInputField(selector.searchCourseFiled, courseName);
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
        return elementHelpers.getTextListFromListOfElements(listOfMembers);
    },

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
        await waitHelpers.waitUntilElementIsPresent(section + " " + selector.courseWrapper);
        const listOfCourses = await driver.$$(section + " " + selector.courseWrapper);
        return listOfCourses;
    },

    getIndexOfGivenCourseInSection: async function (courseName, section) {
        const listOfCourseTitlesForSection = await this.getListOfCourseTitlesInSection(section);
        var index = listOfCourseTitlesForSection.indexOf(courseName);
        return index;
    },

    getDescriptionCourse: async function (index) {
        try {
            return await elementHelpers.getElementText(".section-activeCourses div:nth-child(" + index + ") > article > div.sc-card-body.ckcontent");
        } catch (error) {
			log.error("Can not get value: " + error.message);
			throw error;
		}
    },

    getCourseName: async function (index) {
        try {
            return await elementHelpers.getElementText(".section-activeCourses div:nth-child(" + index + ") > article span.title");
        } catch (error) {
			log.error("Can not get value: " + error.message);
			throw error;
		}
    },

    getColorCourse: async function (index) {
        try {
            let courseContainer = await driver.$(".section-activeCourses div:nth-child(" + index + ") > article > div.sc-card-header");
            const css = await courseContainer.getCSSProperty("background-color");
            let color = css.parsed.hex;
            return color;
        } catch (error) {
			log.error("Can not get value: " + error.message);
			throw error;
		}
    },

    getWrapperOfCourseInSection: async function (courseName, section) {
        var index = await this.getIndexOfGivenCourseInSection(courseName, section);
        const list = await this.getListOfCoursesInSection(section);
        const element = list[index];
        return element;
    },

    getListOfCourseTitlesInSection: async function (section) {
        const courseList = await this.getListOfCoursesInSection(section);
        let courseTitleList = await Promise.all(courseList.map(async (element) => (await element.$(selector.titleOfCourse)).getText()));
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
        const element = await courseWrapper.$(selector.memberBtn);
        let text = await element.getText();
        let number = parseInt(text);
        return number;
    },

    clickPupilIconInCourseInSection: async function (courseName, section) {
        const courseWrapper = await this.getWrapperOfCourseInSection(courseName, section);
        await driver.pause(1000);
        let pupilIcon = await courseWrapper.$(selector.memberBtn);
        await pupilIcon.click();
        await driver.pause(500);
    },

    goToTasksOfTheCourse: async function (coursename) {
        await this.goToCourses();
        await this.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
        await this.gotoTasksTab();
    },

    studentLogsInAndGoesToTasksOfTheCourse: async function (username, password, coursename) {
        await logoutPage.goToLogoutPage();
        await startPage.performLogin(username, password);
        await loginPage.firstLoginStudent(username, password);
        await this.goToTasksOfTheCourse(coursename);
    },

    verifyCourseAndTopic: async function (coursename, topicname) {
        await this.clickOnCourseInSection(coursename, this.section.activeCourses);
        let topicNames = await Promise.all((await driver.$$("#topic-list > div > div > div")).map(async (element) => await element.getText()));
        await expect(topicNames).to.include(topicname);
    },
    verifyCopyWithStudents: async function (coursename) {
        let copiedName = coursename + " - Kopie";
        let courseHasIndex = await this.getIndexOfGivenCourseInSection(copiedName, this.section.activeCourses);
        let areThereStudentsInCourseContainer = await driver.$('.sc-card-wrapper.col-xl-3.col-lg-4.col-md-6.col-sm-12:nth-child(' + (
            courseHasIndex + 1
        ) + ') .additionalInfo .btn-member');
        let areThereStudentsInCourse = await areThereStudentsInCourseContainer.getText();
        let number = parseInt(areThereStudentsInCourse);
        await expect(number).to.equal(0);

    }
};
