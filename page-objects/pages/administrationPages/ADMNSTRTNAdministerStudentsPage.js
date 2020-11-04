/*[url/administration/students]*/
'use strict';
const startPage = require('../generalPagesBeforeLogin/StartPageBeforeLogin');
const loginPage = require('../generalPagesBeforeLogin/LoginPage');

const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');
let oldPassword;

const addStudentBtn = "button[data-testid='btn_add_student']";
const firstNameInput = "input[data-testid='create_student_input_firstname']";
const lastNameInput = "input[data-testid='create_student_input_lastname']";
const emailInput = "input[data-testid='create_student_input_email']";
const sendRegistrationLinkCheckbox = "input[data-testid='create_student_input_send_link']";
const tableOfStudents = "tbody[data-testid='students_names_container']";
const consentSubmitBtn = "button[data-testid='submit_consent']";
const addStudentSubmitBtn = 'div.modal.fade.add-modal.in button.btn-submit';
const passwordInput = '#passwd';
const createBirthday = '#birthday';
const sendConsentFormEmails = '.btn-send-links-emails';
// const editStudentBtn = 'a[title="Nutzer bearbeiten"]';
// const editStudentBtnEN = 'a[title="Edit users"]';
const editStudentBtn = '.table-actions .btn .fa-edit';

const pageTitle = '#page-title';
const newAdminTablesEditButton = 'a[datatest-id="edit_student_button"]';
const tableOfStudentsColumn = 'tbody[data-testid="students_names_container"] > tr';
const firstNameCell = 'td:nth-child(1)';
const lastNameCell = 'td:nth-child(2)';
const emailCell = 'td:nth-child(3)';

async function clickAddStudentBtn() {
	await waitHelpers.waitUntilAjaxIsFinished();
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
	await elementHelpers.click(sendConsentFormEmails);
}

async function submitStudentAddition() {
	await elementHelpers.clickAndWait(addStudentSubmitBtn);
}

async function createNewPupil(firstname, lastname, email) {
	await clickAddStudentBtn();
	await setStudentFirstName(firstname);
	await setStudentLastName(lastname);
	await setStudentEmail(email);
	await setStudentsBirthday('13.08.1990');
	await clickOnSendRegistrationLinkCheckbox();
	await submitStudentAddition();
}
async function setStudentsBirthday(birthdayDate) {
	await waitHelpers.waitUntilElementIsClickable(createBirthday);
	await driver.execute('document.querySelector("#birthday").value = "' + birthdayDate + '"'); //date format dd.mm.yyyy
}

// choose between email, firstname, lastname
async function getStudentsDetailsList(whichCell) {
	await waitHelpers.waitUntilElementIsPresent(tableOfStudents);
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
	let names = await driver.$$(tableOfStudentsColumn);
	for (var i = 1; i <= names.length; i++) {
		let emailPromise = await driver.$(tableOfStudents + ' > tr:nth-child(' + i + ') > td:nth-child(3)');
		let email = await emailPromise.getText();
		if (email === e_mail) {
			let boxConsent = tableOfStudents + ' > tr:nth-child(' + i + ') > td:nth-child(7) > a:nth-child(2) > i';
			await elementHelpers.click(boxConsent);
			let passwordField = await waitHelpers.waitUntilElementIsPresent(passwordInput);
			let password_old = await passwordField.getValue();
			oldPassword = password_old;
			await elementHelpers.clickAndWait(consentSubmitBtn);
			break;
		}
	}
}
async function studentLogsInWithDefaultPassword(email) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(email, oldPassword);
}

module.exports = {
	clickSendConsentFormEmailsButton,
	clickEditStudentBtn,
	createNewPupil,
	isStudentEmailOnTheList,
	isStudentFirstnameOnTheList,
	isStudentLastnameOnTheList,
	submitConsent,
	studentLogsInWithDefaultPassword,
};
