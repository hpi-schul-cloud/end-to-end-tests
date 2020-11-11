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
const firstNameCell = 'td:nth-child(2) > div';
const lastNameCell = 'td:nth-child(3) > div';
const emailCell = 'td:nth-child(5) > div';
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

async function createNewPupil(firstname, lastname, email) {
	await clickFABBtn();
	await clickAddStudentBtn();
	await setStudentFirstName(firstname);
	await setStudentLastName(lastname);
	await setStudentEmail(email);
	let birthdate = dateTimeHelpers.getDate({
		day: 0,
		month: 0,
		year: -15,
		delimiter: '.',
		isOrderYearMonthDay: false,
	});
	await setStudentsBirthday(birthdate);
	//	await clickOnSendRegistrationLinkCheckbox(); Commented out because this doesn't work currently
	await submitStudentAddition();
}

async function setStudentsBirthday(date) {
	let dateField = await driver.$(birthdateInput);
	await dateField.setValue(date);
}

async function getStudentsEmailList() {
	await waitHelpers.waitUntilElementIsPresent(tableOfStudents);
	let names = await driver.$$(tableOfStudents + ' > tr');
	return Promise.all(
		names.map(async (nameContainer) => {
			const emailContainer = await nameContainer.$('td:nth-child(5)');
			return emailContainer.getText();
		})
	);
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
	await waitHelpers.waitUntilElementIsVisible(tableOfStudents);
	let names = await driver.$$(tableOfStudents);
	for (var i = 1; i <= names.length; i++) {
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
