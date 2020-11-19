/*[url/administration/teacher]*/
'use strict';

const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const teacherNameContainer = "tbody[data-testid='table-data-body']";
const tableOfTeacherssColumn = 'tbody[data-testid="table-data-body"] > tr';
const emailCell = '[data-testid="table-data-body"] td:nth-child(4)';
const newAdminTablesEditButton = 'a[data-testid="edit_teacher_button"]';



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

module.exports = {
    clickEditTeacherByMailBtn,
    isTeacherVisibleOnList,
};
