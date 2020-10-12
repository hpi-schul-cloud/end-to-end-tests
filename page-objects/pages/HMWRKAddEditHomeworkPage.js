/*[url/homework/new] | [url/homework/[homeworkId]/edit]*/
'use strict';
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers.js');
const courseHomeworksPage = require("../pages/coursePages/CRSSCourseHomeworksPage");
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const { getElement } = require('../../runtime/helpers/sharedHelpers.js');

const uploadBtn = '//*[@id="main-content"]/div/section[1]/div/div/div[1]/input';
const teamSubmissionsCheckbox = "#teamSubmissions";
const privateHomeworkCheckbox = "[data-testid='private-checkbox']";
const publicSubmissionsCheckbox = "#publicSubmissionsCheckbox";
const homeworkTitleInput = "input[placeholder='Titel']";
const submitHomeworkBtn = ".btn-submit";
const courseSelect = '#coursePicker';
const courseOption = '.active-result:nth-child(1)';
const activatePublicSubmissionsDialog = '.modal.fade.dontShowAgainAlert-modal.in'
const activatePublicSubmissionsButton = 'button[type="submit"]';

module.exports = {
    clickEditButton: async function(){
        await elementHelpers.click()
    },

    clickPrivateHomeworkCheckbox: async function () {
        await elementHelpers.click(privateHomeworkCheckbox);
    },

    clickPublicSubmissionsCheckbox: async function (){
        if(publicSubmissionsCheckbox.checked){
            await elementHelpers.click(publicSubmissionsCheckbox)
        } else {
            await elementHelpers.click(publicSubmissionsCheckbox)

            let dialogContainerElement = await driver.$(activatePublicSubmissionsDialog);
            let submitBtnElement = await dialogContainerElement.$(activatePublicSubmissionsButton);

            if(dialogContainerElement != null){
                await submitBtnElement.click();

            }
        }
    },

    clickTeamSubmissionsCheckbox: async function () {
        await elementHelpers.click(teamSubmissionsCheckbox);
    },

    selectCourse: async function(){
    
       let dropdown = await driver.$(courseSelect);
       
       await dropdown.selectByIndex(0);
      
    },

    setHomeworkName: async function (taskName) {
        await driver.pause(global.SHORT_WAIT_MILLIS);
        const nameField = await driver.$(homeworkTitleInput);
        await nameField.setValue(taskName);
    },

    setHomeworkText: async function (taskbody) {
        await driver.pause(global.SHORT_WAIT_MILLIS);
        let editorContent = await driver.$('.ck-content');
       
        await driver.pause(global.SHORT_WAIT_MILLIS);

        await editorContent.setValue(taskbody);
        
    },

    setAccomplishTime: async function () {
        var begin = await dateTimeHelpers.dateToString();
        var end = await dateTimeHelpers.randomDate();

        await driver.execute(`document.querySelector("#availableDate").value="${begin}"`);
        await driver.execute(`document.querySelector("#dueDate").value="${end}"`);
    },

    clickSubmitHomeworkBtn: async function () {
        await elementHelpers.click(submitHomeworkBtn);
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
        await driver.pause(1000 * 3);
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
