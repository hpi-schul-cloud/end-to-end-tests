/*[url/homework/new] | [url/homework/[homeworkId]/edit]*/
'use strict';
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers.js');
const courseHomeworksPage = require("../pages/coursePages/CRSSCourseHomeworksPage");
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');

const uploadBtn = '//*[@id="main-content"]/div/section[1]/div/div/div[1]/input';
const teamSubmissionsCheckbox = "#teamSubmissions";
const privateHomeworkCheckbox = "[data-testid='private-checkbox']";
const publicSubmissionsCheckbox = "#publicSubmissionsCheckbox";
const homeworkTitleInput = "input[placeholder='Titel']";
const homeworkTextArea = '#homework-form .ck-content';
const submitHomeworkBtn = ".btn-submit";
const courseSelect = '#coursePicker';
const activatePublicSubmissionsDialog = '.modal.fade.dontShowAgainAlert-modal.in'
const activatePublicSubmissionsButton = '.modal-dialog .modal-checkbox button.btn-submit';



async function clickPrivateHomeworkCheckbox () {
    await elementHelpers.click(privateHomeworkCheckbox);
}

async function clickPublicSubmissionsCheckbox() {
	const checkbox = await waitHelpers.waitUntilElementIsPresent(publicSubmissionsCheckbox);
	const checkboxChecked = await checkbox.isSelected();
	if (checkboxChecked) {
		await elementHelpers.click(checkbox);
	} else {
		await elementHelpers.click(checkbox);
		let dialogContainerElement = await waitHelpers.waitUntilElementIsPresent(activatePublicSubmissionsDialog);
		if (dialogContainerElement != null) {
			await elementHelpers.clickAndWait(activatePublicSubmissionsButton);
		}
	}
}
async function clickTeamSubmissionsCheckbox () {
    await elementHelpers.click(teamSubmissionsCheckbox);
}

async function selectFirstCourseOnTheList(){
   let dropdown = await waitHelpers.waitUntilElementIsPresent(courseSelect);
   await dropdown.selectByIndex(0);
}

async function setHomeworkName (taskName) {
    await waitHelpers.waitAndSetValue(homeworkTitleInput, taskName);
}

async function setHomeworkText (text) {
    await waitHelpers.waitAndSetValue(homeworkTextArea, text);
    
}

async function setAccomplishTime () {
    var begin = await dateTimeHelpers.dateToString();
    var end = await dateTimeHelpers.randomDate();
    await driver.execute(`document.querySelector("#availableDate").value="${begin}"`);
    await driver.execute(`document.querySelector("#dueDate").value="${end}"`);
}

async function clickSubmitHomeworkBtn () {
    await elementHelpers.clickAndWait(submitHomeworkBtn);
}

async function addHomework(coursename, taskname, isPrivate) {
	await courseHomeworksPage.clickAddNewTaskInCourse(coursename);
	await setHomeworkName(taskname);
	await clickTeamSubmissionsCheckbox();
	await setAccomplishTime();
	await setHomeworkText();
	if (isPrivate) await clickPrivateHomeworkCheckbox();
	await clickSubmitHomeworkBtn();
}

async function uploadHomework () {
    //making the upload-element visible to selenium
    change_visibility = uploadBtn +'.css("visibility,"visible");';
    change_display = uploadBtn +'.css("display,"block");';
    await driver.execute_script(change_visibility);
    await driver.execute_script(change_display);

    const path = require('path');
    const filePath = path.join(__dirname, '../shared-objects/fileUpldFolder/upload.txt');
    await driver.$x(uploadBtn).send_keys(filePath);
}
module.exports = {
    clickPrivateHomeworkCheckbox: async function () {
        await elementHelpers.click(privateHomeworkCheckbox);
    },

    clickTeamSubmissionsCheckbox: async function () {
        await elementHelpers.click(teamSubmissionsCheckbox);
    },

    setTaskName: async function (taskName) {
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
        await elementHelpers.click(submitHomeworkBtn);
    },

    addBasicHometask: async function (coursename, taskname) {
        await courseHomeworksPage.clickAddNewTaskInCourse(coursename);
        await this.setTaskName(taskname);
        await this.clickTeamSubmissionsCheckbox();
        await this.setAccomplishTime();
        await this.setHomeworkText();
        await this.clickSubmitHomeworkBtn();
    },

    addPrivateHometask: async function (coursename, taskname) {
        await courseHomeworksPage.clickAddNewTaskInCourse(coursename);
        await this.setTaskName(taskname);
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
    },
clickPrivateHomeworkCheckbox ,
clickPublicSubmissionsCheckbox,
clickTeamSubmissionsCheckbox,
clickSubmitHomeworkBtn,
selectFirstCourseOnTheList,
setHomeworkName,
setHomeworkText,
setAccomplishTime,
addBasicHometask,
addPrivateHometask,
uploadHomework

}
