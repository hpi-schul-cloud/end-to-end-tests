/*[url/homework/new] | [url/homework/[homeworkId]/edit]*/
'use strict';
const wh = require('../../runtime/helpers/waitHelpers.js');
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers.js');
const courseHomeworksPage = require("../pages/coursePages/CRSSCourseHomeworksPage");

const uploadBtn = '//*[@id="main-content"]/div/section[1]/div/div/div[1]/input';
const teamSubmissionsCheckbox = "#teamSubmissions";
const privateHomeworkCheckbox = "[data-testid='private-checkbox']";
const homeworkTitleInput = "input[placeholder='Titel']";
const submitHomeworkBtn = ".btn-submit";

module.exports = {
    clickPrivateHomeworkCheckbox: async function () {
        await wh.waitAndClick(privateHomeworkCheckbox);
    },

    clickTeamSubmissionsCheckbox: async function () {
        await wh.waitAndClick(teamSubmissionsCheckbox);
    },

    setHomeworkName: async function (taskName) {
        const nameField = await driver.$(homeworkTitleInput);
        await nameField.setValue(taskName);
    },

    setHomeworkText: async function () {
        await driver.pause(global.SHORT_WAIT_MILLIS);
        const editorContent = await driver.$('.ck-content');
        const message = 'Here is some TEXT!';
        await editorContent.setValue(message);
    },

    setAccomplishTime: async function () {
        var begin = await dateTimeHelpers.dateToString();
        var end = await dateTimeHelpers.randomDate();

        await driver.execute(`document.querySelector("#availableDate").value="${begin}"`);
        await driver.execute(`document.querySelector("#dueDate").value="${end}"`);
    },

    clickSubmitHomeworkBtn: async function () {
        await wh.waitAndClick(submitHomeworkBtn);
    },

    addBasicHometask: async function (coursename, taskname) {
        await courseHomeworksPage.clickAddNewTaskInCourse(coursename);
        await this.setHomeworkName(taskname);
        await this.clickTeamSubmissionsCheckbox();
        await this.setAccomplishTime();
        await this.setHomeworkText();
        await this.clickSubmitHomeworkBtn();
    },

    addPrivateHometask: async function (coursename, taskname) {
        await courseHomeworksPage.clickAddNewTaskInCourse(coursename);
        await this.setHomeworkName(taskname);
        await this.clickTeamSubmissionsCheckbox();
        await this.setAccomplishTime();
        await this.setHomeworkText();
        await this.clickPrivateHomeworkCheckbox();
        await this.clickSubmitHomeworkBtn();
    },

    uploadHomework: async function () {
		//making the upload-element visible to selenium
		change_visibility = uploadBtn +'.css("visibility,"visible");';
		change_display = uploadBtn +'.css("display,"block");';
		await driver.execute_script(change_visibility);
		await driver.execute_script(change_display);

		const path = require('path');
		const filePath = path.join(__dirname, '../shared-objects/fileUpldFolder/upload.txt');
		await driver.$x(uploadBtn).send_keys(filePath);
	},

    getTaskNames: async function () {
        await driver.pause(1000 * 10);
        const container = await driver.$(".col-xl-12");
        const tasksArray = await container.$$("li");
        const namesArray = [];
        for (let i = 1; i <= tasksArray.length; i++) {
            const task = await container.$("li:nth-child(" + i + ") h2");
            const taskName = (await task.getText());
            namesArray.push(taskName);
        }
        return namesArray;

    },
}
