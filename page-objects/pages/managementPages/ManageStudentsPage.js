/*[url/administration/students]*/
'use strict';
const loginPage = require('../generalPagesBeforeLogin/LoginPage');

const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const dateTimeHelpers = require('../../../runtime/helpers/dateTimeHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');
let oldPassword;

const floatingActionButtonBtn = "[data-testid='fab_button_students_table']";
const addStudentBtn = "[data-testid='fab_button_add_students']";
const importStudentBtn = "[data-testid='fab_button_import_students']";
const firstNameInput = "input[data-testid='input_create-user_firstname']";
const lastNameInput = "input[data-testid='input_create-user_lastname']";
const emailInput = "input[data-testid='input_create-user_email']";
const birthdateInput = 'input[data-testid="input_create-student_birthdate"]';
const sendRegistrationLinkCheckbox = "label[data-testid='input_create-student_send-registration']";
const tableOfStudents = "tbody[data-testid='table-data-body']";
const skipConsentBtn = '.fa-check-square-o';
const createLinkBtn = '.btn-invitation-link-with-hash';
const cancelLinkModal = '.invitation-modal .btn-close';
const consentSubmitBtn = "button[data-testid='submit_consent']";
const addStudentSubmitBtn = "button[data-testid='button_create-user_submit']";
const passwordInput = '#passwd';
const createBirthday = '#birthday';
const editStudentBtn = 'a[data-testid="edit_student_button"]';
const tableOfStudentsRow = tableOfStudents + ' > tr';
const firstNameCells = tableOfStudents + ' td:nth-child(2)';
const lastNameCells = tableOfStudents + ' td:nth-child(3)';
const emailCells = tableOfStudents + ' td:nth-child(5)';
const selectAllCheckbox = 'th:nth-child(1) > div';
const actionsBtn = '.actions > button';
const sendEmailBtn = 'button.context-menu__button:nth-child(2)';

async function clickFloatingActionButtonBtn() {
	await elementHelpers.clickAndWait(floatingActionButtonBtn);
}

async function clickAddStudentBtn() {
	await elementHelpers.clickAndWait(addStudentBtn);
}

async function clickEditStudentBtn() {
	await elementHelpers.click(editStudentBtn);
}

async function clickEditStudentByMailBtn(userEmail) {
	await waitHelpers.waitUntilElementIsVisible(tableOfStudentsRow);
	let studentsTable = await getStudentsDetailsList(emailCells);
	let editsElements = await elementHelpers.getListOfAllElements(editStudentBtn);
	for (let index = 0; index < studentsTable.length; index++) {
		if (studentsTable[index] === userEmail) {
			await elementHelpers.clickAndWait(editsElements[index]);
			break;
		}
	}
}

async function isStudentVisible(userEmail, expectedValue) {
	await waitHelpers.waitUntilElementIsVisible(tableOfStudentsRow);
	let studentsTable = await getStudentsDetailsList(emailCells);
	let isEmailExists = false;
	for (let index = 0; index < studentsTable.length; index++) {
		if (studentsTable[index] === userEmail) {
			isEmailExists = true;
			break;
		}
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
	await clickSelectAllStudentsCheckbox();
	await clickActionsButton();
	await clickSendEmailsButton();
}

async function clickActionsButton() {
	await elementHelpers.clickAndWait(actionsBtn);
}

async function submitStudentAddition() {
	await elementHelpers.clickAndWait(addStudentSubmitBtn);
}

async function clickSendEmailsButton() {
	await elementHelpers.clickAndWait(sendEmailBtn);
}

async function clickSelectAllStudentsCheckbox() {
	await elementHelpers.click(selectAllCheckbox);
}

async function createNewPupil(firstname, lastname, email, birthday, addBirthday) {
	await clickFloatingActionButtonBtn();
	await clickAddStudentBtn();
	await waitHelpers.waitUntilPageLoads();
	await setStudentFirstName(firstname);
	await setStudentLastName(lastname);
	await setStudentEmail(email);
	//this function makes the birthday parameters in the feature file unrelevant
	//ToDo: remove them or find a way to make it working with those parameters
	//let birthdate = dateTimeHelpers.getCurrentFormattedDateWithOffset({years: -14, format: "dd/mm/yyyy"});
	//await setStudentsBirthday(birthdate);
	if (addBirthday) await setStudentsBirthday(birthday);
//	await clickOnSendRegistrationLinkCheckbox(); disabled until notification service is reworked
	await submitStudentAddition();
	await waitHelpers.waitUntilPageLoads();
}

async function setStudentsBirthday(date) {
	let dateField = await driver.$(birthdateInput);
	await waitHelpers.waitAndSetValue(dateField, date);
}

// choose between email, firstname, lastname
async function getStudentsDetailsList(whichCell) {
	let names = await elementHelpers.getTextFromAllElements(whichCell);
	return names;
}

async function isStudentEmailOnTheList(email) {
	let emails = await getStudentsDetailsList(emailCells);
	const msg = `Student with email ${email} is not visible on the students email list \n`;
	const resultMsg = `List of emails ${emails}`;
	await expect(emails, msg + resultMsg).to.include(email);
}

async function isStudentFirstnameOnTheList(firstname) {
	let firstnames = await getStudentsDetailsList(firstNameCells);
	const msg = `Student with firstname ${firstname} is not visible on the students firstname list \n`;
	const resultMsg = `List of firstnames ${firstnames}`;
	await expect(firstnames, msg + resultMsg).to.include(firstname);
}

async function isStudentLastnameOnTheList(lastname) {
	let lastnames = await getStudentsDetailsList(lastNameCells);
	const msg = `Student with lastname ${lastname} is not visible on the student lastname list \n`;
	const resultMsg = `List of lastnames ${lastnames}`;
	await expect(lastnames, msg + resultMsg).to.include(lastname);
}

async function submitConsent(e_mail) {
	await waitHelpers.waitUntilElementIsVisible(tableOfStudentsRow);
	let names = await driver.$$(tableOfStudentsRow);
	for (let i = 1; i <= names.length; i++) {
		let emailPromise = await driver.$(tableOfStudents + ' > tr:nth-child(' + i + ') > td:nth-child(5)');
		let email = await emailPromise.getText();
		if (email === e_mail) {
			let boxConsent = tableOfStudents + ' > tr:nth-child(' + i + ') > td:nth-child(9)';
			await elementHelpers.click(boxConsent);
			await elementHelpers.clickAndWait(createLinkBtn);
			await elementHelpers.click(cancelLinkModal);
			await driver.refresh();
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
	clickSelectAllStudentsCheckbox,
	clickActionsButton,
	isStudentEmailOnTheList,
	isStudentFirstnameOnTheList,
	clickSendEmailsButton,
	isStudentLastnameOnTheList,
	submitConsent,
	studentLogsInWithPasswordGenaratedByAdminDuringManualSubmission,
};
