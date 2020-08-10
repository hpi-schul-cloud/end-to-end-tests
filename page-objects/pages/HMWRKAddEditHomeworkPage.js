/*[url/homework/new] | [url/homework/[homeworkId]/edit]*/
'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers.js');
const courseData = require('../../shared-objects/courseData');
const courseHomeworksPage = require("../pages/coursePages/CRSSCourseHomeworksPage.js");

const taskNameField = "input[placeholder='Titel']";
const submitTaskButton = ".btn-submit";

    module.exports = {

        setPrivate: async function () {

            await waitHelpers.waitAndClick(courseData.elem.checkbox);

        },

        setHomeworkName: async function(taskName) {
            const nameField = await driver.$(taskNameField);
            await nameField.setValue(taskName);
        },

        setHometaskText: async function () {

            await driver.pause(global.SHORT_WAIT_MILLIS);
            const editorContent = await driver.$('.ck-content');
            const message = 'Here is some TEXT!';
            await editorContent.setValue(message);

        },
        setAccomplishTime: async function () {

            var begin = await dateTimeHelpers.dateToString();
            await driver.execute(`document.querySelector("#availableDate").value="${begin}"`);
            var end = await dateTimeHelpers.randomDate();
            await driver.execute(`document.querySelector("#dueDate").value="${end}"`);

        },
        clickAdd: async function () {

            let container = await driver.$('#homework-form');
            let addBtn = await container.$('button[type="submit"]');
            await addBtn.click();
            let selectorToBeLoaded = await driver.$('#homeworks');
            await selectorToBeLoaded.waitForExist(2000);

        },

        clickSubmitTaskButton: async function() {
            await waitHelpers.waitAndClick(submitTaskButton);
        },

        addBasicHometask: async function (coursename, taskname) {

            await courseHomeworksPage.clickCreateNewTaskInTheCourse(coursename);
            let nameSelector = await driver.$(courseData.elem.homeworkName);
            await nameSelector.setValue(taskname);
            await waitHelpers.waitAndClick(courseData.elem.teamworkActivate);
            await this.setAccomplishTime();
            await this.setHometaskText();
            await waitHelpers.waitAndClick(courseData.elem.submitAddHomeworkBtn);

        },
        addPrivateHometask: async function (coursename, taskname) {

            await courseHomeworksPage.clickCreateNewTaskInTheCourse(coursename);
            let nameSelector = await driver.$(courseData.elem.homeworkName);
            await nameSelector.setValue(taskname);
            await waitHelpers.waitAndClick(courseData.elem.teamworkActivate);
            await this.setAccomplishTime();
            await this.setHometaskText();
            await this.setPrivate();
            await waitHelpers.waitAndClick(courseData.elem.submitAddHomeworkBtn);

        },
    
        getTaskNames: async function() {
            await driver.pause(1000 * 10);
            const container = await driver.$(".col-xl-12");
            const tasksArray = await container.$$("li");
            const namesArray = [];
            for (var i = 1; i <= tasksArray.length; i++) {
                const task = await container.$(
                    "li:nth-child(" + i + ") > a:nth-child(1)"
                );
                const taskName = (await task.getAttribute("title"))
                    .replace("Details der Aufgabe: '", "")
                    .replace(/'$/gi, "");
                await namesArray.push(taskName);
            }
            return namesArray;
        }

    }
