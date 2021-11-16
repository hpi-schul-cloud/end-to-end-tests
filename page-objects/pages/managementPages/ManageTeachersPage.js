/*[url/administration/teachers]*/
'use strict';

const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const teacherNameContainer = "tbody[data-testid='table-data-body']";
const tableOfTeacherssColumn = 'tbody[data-testid="table-data-body"] > tr';
const emailCell = '[data-testid="table-data-body"] td:nth-child(4)';
const newAdminTablesEditButton = 'a[data-testid="edit_teacher_button"]';
const firstNameInput = "input[name='firstName']";
const lastNameInput = "input[name='lastName']";
const emailInput = "input[name='email']";
const tableOfTeachers = "tbody[data-testid='table-data-body']";
const tableOfTeachersRow = tableOfTeachers + ' > tr';
const firstNameCells = tableOfTeachers + ' td:nth-child(2)';
const lastNameCells = tableOfTeachers + ' td:nth-child(3)';
const emailCells = tableOfTeachers + ' td:nth-child(4)';

async function clickEditTeacherByMailBtn(userEmail) {
	await waitHelpers.waitUntilElementIsVisible(tableOfTeacherssColumn);
	let teachersTable = await getTeachersDetailsList(emailCell);
	let editsElements = await elementHelpers.getListOfAllElements(newAdminTablesEditButton);
	for (let index = 1; index <= teachersTable.length; index++) {
		let emailPromise = await driver.$(teacherNameContainer + '> tr:nth-child('+index+') > td:nth-child(4)');
		let email = await emailPromise.getText();
		if (email === userEmail) {
			await elementHelpers.clickAndWait(editsElements[index-1]);
			break;
		}
	}
}

async function isTeacherVisibleOnList(userEmail, expectedValue) {
	await waitHelpers.waitUntilElementIsVisible(tableOfTeacherssColumn);
	let teachersTable = await getTeachersDetailsList(emailCell);
		let isEmailExists = false;
		for (let index = 1; index <= teachersTable.length; index++) {
			let emailPromise = await driver.$(teacherNameContainer + '> tr:nth-child('+index+') > td:nth-child(4)');
			let email = await emailPromise.getText();
			email === userEmail ? isEmailExists = true : '';
		}
	expect(isEmailExists).to.equal(expectedValue);
}

// choose between email, firstname, lastname
async function getTeachersDetailsList(whichCell) {
	let names = await elementHelpers.getTextFromAllElements(whichCell);
	return names;
}

async function setTeacherFirstName(firstname) {
	await waitHelpers.waitAndSetValue(firstNameInput, firstname);
}

async function setTeacherLastName(lastname) {
	await waitHelpers.waitAndSetValue(lastNameInput, lastname);
}

async function setTeacherEmail(email) {
	await waitHelpers.waitAndSetValue(emailInput, email);
}

async function isTeacherFirstnameOnTheList(firstname) {
	let firstnames = await getTeachersDetailsList(firstNameCells);
	const msg = `Teacher with firstname ${firstname} is not visible on the teachers firstname list \n`;
	const resultMsg = `List of firstnames ${firstnames}`;
	await expect(firstnames, msg + resultMsg).to.include(firstname);
}

async function isTeacherLastnameOnTheList(lastname) {
	let lastnames = await getTeachersDetailsList(lastNameCells);
	const msg = `Teacher with lastname ${lastname} is not visible on the teachers lastname list \n`;
	const resultMsg = `List of lastnames ${lastnames}`;
	await expect(lastnames, msg + resultMsg).to.include(lastname);
}

async function isTeacherEmailOnTheList(email) {
	let emails = await getTeachersDetailsList(emailCells);
	const msg = `Teacher with email ${email} is not visible on the teachers email list \n`;
	const resultMsg = `List of emails ${emails}`;
	await expect(emails, msg + resultMsg).to.include(email);
}

module.exports = {
    clickEditTeacherByMailBtn,
    isTeacherVisibleOnList,
	setTeacherFirstName,
	setTeacherLastName,
	setTeacherEmail,
	isTeacherFirstnameOnTheList,
	isTeacherLastnameOnTheList,
	isTeacherEmailOnTheList,
};
