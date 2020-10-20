/*[url/homework/new] | [url/homework/[homeworkId]/edit]*/
'use strict';
const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers.js');
const courseHomeworksPage = require('../pages/coursePages/CRSSCourseHomeworksPage');
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');

const uploadBtn = '//*[@id="main-content"]/div/section[1]/div/div/div[1]/input';
const teamSubmissionsCheckbox = '#teamSubmissions';
const privateHomeworkCheckbox = "[data-testid='private-checkbox']";
const publicSubmissionsCheckbox = '#publicSubmissionsCheckbox';
const homeworkTitleInput = "input[placeholder='Titel']";
const submitHomeworkBtn = '.btn-submit';
const courseSelect = '#coursePicker';
const activatePublicSubmissionsDialog = '.modal.fade.dontShowAgainAlert-modal.in';
const activatePublicSubmissionsButton = 'button[type="submit"]';

async function clickEditButton() {
	await elementHelpers.click();
}

async function clickPrivateHomeworkCheckbox() {
	await elementHelpers.click(privateHomeworkCheckbox);
}

async function clickPublicSubmissionsCheckbox() {
	const checkbox = await driver.$("[name='publicSubmissions']");
	const checkboxChecked = await checkbox.isSelected();

	if (checkboxChecked) {
		await elementHelpers.click(publicSubmissionsCheckbox);
	} else {
		await elementHelpers.click(publicSubmissionsCheckbox);

		let dialogContainerElement = await driver.$(activatePublicSubmissionsDialog);
		let submitBtnElement = await dialogContainerElement.$(activatePublicSubmissionsButton);

		if (dialogContainerElement != null) {
			await submitBtnElement.click();
		}
	}
}

async function clickTeamSubmissionsCheckbox() {
	await elementHelpers.click(teamSubmissionsCheckbox);
}

async function selectFirstCourseOnTheList() {
	let dropdown = await driver.$(courseSelect);
	await dropdown.selectByIndex(0);
}

async function setHomeworkName(taskName) {
	await driver.pause(global.SHORT_WAIT_MILLIS);
	const nameField = await driver.$(homeworkTitleInput);
	await nameField.setValue(taskName);
}

async function setHomeworkText(taskbody) {
	await driver.pause(global.SHORT_WAIT_MILLIS);
	let editorContent = await driver.$('.ck-content');

	await driver.pause(global.SHORT_WAIT_MILLIS);

	await editorContent.setValue(taskbody);
}

async function setAccomplishTime() {
	var begin = await dateTimeHelpers.dateToString();
	var end = await dateTimeHelpers.randomDate();

	await driver.execute(`document.querySelector("#availableDate").value="${begin}"`);
	await driver.execute(`document.querySelector("#dueDate").value="${end}"`);
}

async function clickSubmitHomeworkBtn() {
	await elementHelpers.click(submitHomeworkBtn);
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

async function uploadHomework() {
	//making the upload-element visible to selenium
	change_visibility = uploadBtn + '.css("visibility,"visible");';
	change_display = uploadBtn + '.css("display,"block");';
	await driver.execute_script(change_visibility);
	await driver.execute_script(change_display);

	const path = require('path');
	const filePath = path.join(__dirname, '../shared-objects/fileUpldFolder/upload.txt');
	await driver.$x(uploadBtn).send_keys(filePath);
}

module.exports = {
	clickPrivateHomeworkCheckbox,
	clickPublicSubmissionsCheckbox,
	clickTeamSubmissionsCheckbox,
	clickSubmitHomeworkBtn,
	selectFirstCourseOnTheList,
	setHomeworkName,
	setHomeworkText,
	setAccomplishTime,
	addHomework,
	uploadHomework,
};
