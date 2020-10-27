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


async function clickPrivateHomeworkCheckbox() {
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

async function clickTeamSubmissionsCheckbox() {
	await elementHelpers.click(teamSubmissionsCheckbox);
}

async function selectFirstCourseOnTheList() {
	let dropdown = await waitHelpers.waitUntilElementIsPresent(courseSelect);
	await dropdown.selectByIndex(0);
}

async function setHomeworkName(taskName) {
	await waitHelpers.waitAndSetValue(homeworkTitleInput, taskName);
}

async function setHomeworkText(text) {
	await waitHelpers.waitAndSetValue(homeworkTextArea, text);

}

async function setAccomplishTime() {
	var begin = await dateTimeHelpers.dateToString();
	var end = await dateTimeHelpers.randomDate();
	await driver.execute(`document.querySelector("#availableDate").value="${begin}"`);
	await driver.execute(`document.querySelector("#dueDate").value="${end}"`);
}

async function clickSubmitHomeworkBtn() {
	await elementHelpers.clickAndWait(submitHomeworkBtn);
}

async function addHomework(courseName, taskName, isPrivate) {
	await courseHomeworksPage.clickAddNewTaskInCourse(courseName);
	await setHomeworkName(taskName);
	await clickTeamSubmissionsCheckbox();
	await setAccomplishTime();
	await setHomeworkText();
	if (isPrivate) await clickPrivateHomeworkCheckbox();
	await clickSubmitHomeworkBtn();
}

async function uploadHomework() {
	//making the upload-element visible to selenium
	let change_visibility = uploadBtn + '.css("visibility,"visible");';
	let change_display = uploadBtn + '.css("display,"block");';
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
