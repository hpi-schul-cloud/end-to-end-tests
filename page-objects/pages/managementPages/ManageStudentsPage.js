/*[url/administration/students]*/
'use strict';
const loginPage = require('../generalPagesBeforeLogin/LoginPage');

const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const dateTimeHelpers = require('../../../runtime/helpers/dateTimeHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');
let oldPassword;

const fabBtn = "[data-testid='fab_button_students_table']";
const addStudentBtn = "[data-testid='fab_button_add_students']";
const importStudentBtn = "[data-testid='fab_button_import_students']";
const firstNameInput = "input[data-testid='input_create-user_firstname']";
const lastNameInput = "input[data-testid='input_create-user_lastname']";
const emailInput = "input[data-testid='input_create-user_email']";
const birthdateInput = 'input[data-testid="input_create-student_birthdate"]';
const sendRegistrationLinkCheckbox = "label[data-testid='input_create-student_send-registration']";
const tableOfStudents = "tbody[data-testid='table-data-body']";
const skipConsentBtn = '.fa-check-square-o';
const consentSubmitBtn = "button[data-testid='submit_consent']";
const addStudentSubmitBtn = "button[data-testid='button_create-user_submit']";
const passwordInput = '#passwd';
const createBirthday = '#birthday';
const editStudentBtn = '.table-actions .btn .fa-edit';
const newAdminTablesEditButton = 'a[data-testid="edit_student_button"]';
//Might be obsolete. Maybe add here the selector from NAT, then use it?
const tableOfStudentsColumn = 'tbody[data-testid="table-data-body"] > tr';
// OLD const firstNameCell = 'td:nth-child(2) > div';
const firstNameCell = '[data-testid="table-data-body"] td:nth-child(2)';
// OLD const lastNameCell = 'td:nth-child(3) > div';
const lastNameCell = '[data-testid="table-data-body"] td:nth-child(3)';
// OLD const emailCell = 'td:nth-child(5) > div';
const emailCell = '[data-testid="table-data-body"] td:nth-child(5)';
const selectAllCheckbox = 'th:nth-child(1) > div';
const actionsBtn = '.actions > button';
const sendEmailBtn = '.context-menu:nth-child(2)';

async function clickFABBtn() {
	await elementHelpers.clickAndWait(fabBtn);
}

async function clickAddStudentBtn() {
	await elementHelpers.clickAndWait(addStudentBtn);
}

async function clickEditStudentBtn() {
	// to make it work on new admin tables
	try {
		await elementHelpers.click(newAdminTablesEditButton);
	} catch (e) {
		await elementHelpers.click(editStudentBtn);
	}
}

async function clickEditStudentByMailBtn(userEmail) {
	await waitHelpers.waitUntilElementIsVisible(tableOfStudentsColumn);
	let studentsTable = await getStudentsDetailsList(emailCell);
	let editsElements = await elementHelpers.getListOfAllElements(newAdminTablesEditButton);
	for (let index = 1; index <= studentsTable.length; index++) {
		let emailPromise = await driver.$(tableOfStudents + '> tr:nth-child(' + index + ') > td:nth-child(5)');
		let email = await emailPromise.getText();
		if (email === userEmail) {
			await elementHelpers.clickAndWait(editsElements[index - 1]);
			break;
		}
	}
}

async function isStudentVisible(userEmail, expectedValue) {
	await waitHelpers.waitUntilElementIsVisible(tableOfStudentsColumn);
	let studentsTable = await getStudentsDetailsList(emailCell);
	let isEmailExists = false;
	for (let index = 1; index <= studentsTable.length; index++) {
		let emailPromise = await driver.$(tableOfStudents + '> tr:nth-child(' + index + ') > td:nth-child(5)');
		let email = await emailPromise.getText();
		email === userEmail ? (isEmailExists = true) : '';
	}
	expect(isEmailExists).to.equal(expectedValue);
}

async function setStudentFirstName(firstname) {
	await waitHelpers.waitAndSetValue(firstNameInput, firstname);
}

async function setStudentLastName(lastname) {
	await waitHelpers.waitAndSetValue(lastNameInput, lastname);
}

async function setStudentEmail(email) {
	await waitHelpers.waitAndSetValue(emailInput, email);
}

async function clickOnSendRegistrationLinkCheckbox() {
	await elementHelpers.click(sendRegistrationLinkCheckbox);
}

async function clickSendConsentFormEmailsButton() {
	await selectAllStudents();
	await clickActionsButton();
	await sendEmailsFromActionsDropdown();
}

async function clickActionsButton() {
	await elementHelpers.clickAndWait(actionsBtn);
}

async function submitStudentAddition() {
	await elementHelpers.clickAndWait(addStudentSubmitBtn);
}

async function sendEmailsFromActionsDropdown() {
	await elementHelpers.clickAndWait(sendEmailBtn);
}

async function selectAllStudents() {
	await elementHelpers.click(selectAllCheckbox);
}

async function createNewPupil(firstname, lastname, email, birthday, addBirthday) {
	await clickFABBtn();
	await clickAddStudentBtn();
	await setStudentFirstName(firstname);
	await setStudentLastName(lastname);
	await setStudentEmail(email);
	//this function makes the birthday parameters in the feature file unrelevant
	//ToDo: remove them or find a way to make it working with those parameters
	//let birthdate = dateTimeHelpers.getCurrentFormattedDateWithOffset({years: -14, format: "dd/mm/yyyy"});
	//await setStudentsBirthday(birthdate);
	if (addBirthday) await setStudentsBirthday(birthday);
	await clickOnSendRegistrationLinkCheckbox();
	await submitStudentAddition();
}

async function setStudentsBirthday(date) {
	let dateField = await driver.$(birthdateInput);
	await dateField.setValue(date);
}

// choose between email, firstname, lastname
async function getStudentsDetailsList(whichCell) {
	let names = await elementHelpers.getTextFromAllElements(whichCell);
	return names;
}

async function isStudentEmailOnTheList(email) {
	let emails = await getStudentsDetailsList(emailCell);
	const msg = `Student with email ${email} is not visible on the students email list \n`;
	const resultMsg = `List of emails ${emails}`;
	await expect(emails, msg + resultMsg).to.include(email);
}

async function isStudentFirstnameOnTheList(firstname) {
	let firstnames = await getStudentsDetailsList(firstNameCell);
	const msg = `Student with firstname ${firstname} is not visible on the students firstname list \n`;
	const resultMsg = `List of firstnames ${firstnames}`;
	await expect(firstnames, msg + resultMsg).to.include(firstname);
}

async function isStudentLastnameOnTheList(lastname) {
	let lastnames = await getStudentsDetailsList(lastNameCell);
	const msg = `Student with lastname ${lastname} is not visible on the student lastname list \n`;
	const resultMsg = `List of lastnames ${lastnames}`;
	await expect(lastnames, msg + resultMsg).to.include(lastname);
}

async function submitConsent(e_mail) {
	await waitHelpers.waitUntilElementIsVisible(tableOfStudentsColumn);
	let names = await driver.$$(tableOfStudentsColumn);
	for (let i = 1; i <= names.length; i++) {
		let emailPromise = await driver.$(tableOfStudents + ' > tr:nth-child(' + i + ') > td:nth-child(5)');
		let email = await emailPromise.getText();
		if (email === e_mail) {
			let boxConsent = tableOfStudents + ' > tr:nth-child(' + i + ') > td:nth-child(9)';
			await elementHelpers.click(boxConsent);
			await elementHelpers.clickAndWait(skipConsentBtn);
			let passwordField = await waitHelpers.waitUntilElementIsPresent(passwordInput);
			let password_old = await passwordField.getValue();
			oldPassword = password_old;
			await elementHelpers.clickAndWait(consentSubmitBtn);
			break;
		}
	}
}

async function studentLogsInWithPasswordGenaratedByAdminDuringManualSubmission(userName) {
	await loginPage.performLogin(userName, oldPassword);
}

module.exports = {
	oldPassword,
	isStudentVisible,
	clickEditStudentByMailBtn,
	clickSendConsentFormEmailsButton,
	clickEditStudentBtn,
	createNewPupil,
	selectAllStudents,
	clickActionsButton,
	isStudentEmailOnTheList,
	isStudentFirstnameOnTheList,
	sendEmailsFromActionsDropdown,
	isStudentLastnameOnTheList,
	submitConsent,
	studentLogsInWithPasswordGenaratedByAdminDuringManualSubmission,
};
