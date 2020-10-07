/*[url/administration/students]*/
'use strict';
const startPage = require('../generalPagesBeforeLogin/StartPageBeforeLogin');
const loginPage = require('../generalPagesBeforeLogin/LoginPage');

const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const dateTimeHelpers= require('../../../runtime/helpers/dateTimeHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');
let oldPassword;

const fabBtn = 'button.fab.primary.button.is-medium.is-none';
const addStudentBtn = 'a[aria-label="Schüler:in anlegen"]';
const importStudentBtn = 'a[aria-label="Schüler:innen importieren"]';
const firstNameInput = "input[data-testid='input_create-user_firstname']";
const lastNameInput = "input[data-testid='input_create-user_lastname']";
const emailInput = "input[data-testid='input_create-user_email']";
const birthdateInput = "input[data-testid='input_create-student_birthdate']";
const sendRegistrationLinkCheckbox = "label[data-testid='input_create-student_send-registration']";
const tableOfStudents = "tbody[data-testid='table-data-body']";
const consentSubmitBtn = "button[data-testid='submit_consent']";
const addStudentSubmitBtn = "button[data-testid='button_create-user_submit']";
const passwordInput = '#passwd';

//
async function clickFABBtn() {
	await elementHelpers.clickAndWait(fabBtn);
}

async function clickAddStudentBtn() {
	await elementHelpers.clickAndWait(addStudentBtn);
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

async function submitStudentAddition() {
	await elementHelpers.clickAndWait(addStudentSubmitBtn);
}

async function createNewPupil(firstname, lastname, email) {
    await clickFABBtn();
	await clickAddStudentBtn();
	await setStudentFirstName(firstname);
	await setStudentLastName(lastname);
	await setStudentEmail(email);
	let birthdate = await dateTimeHelpers.setDate(0,0,-15,'.', false);
    await setStudentsBirthday(birthdate);
	await clickOnSendRegistrationLinkCheckbox();
	await submitStudentAddition();
}

async function setStudentsBirthday(date) {
	let dateSelector = await driver.$(birthdateInput);
    await dateSelector.waitForExist(1000);
    await dateSelector.setValue(date);
}

async function setStudentBirthday(birthdayDate) {
	await waitHelpers.waitUntilPageLoads();
	await driver.execute('document.querySelector("#create_birthday").value = "' + birthdayDate + '"'); //date format dd.mm.yyyy
}

async function getStudentsEmailList() {
	await waitHelpers.waitUntilElementIsPresent(tableOfStudents);
	let names = await driver.$$(tableOfStudents + ' > tr');
	return Promise.all(
		names.map(async (nameContainer) => {
			const emailContainer = await nameContainer.$('td:nth-child(5)');
			return await emailContainer.getText();
		})
	);
}
async function isStudentEmailOnTheList(email) {
	let emails = await getStudentsEmailList();
	await expect(emails).to.contain(email);
}
async function submitConsent(e_mail) {
    await waitHelpers.waitUntilElementIsPresent(tableOfStudents);
	let names = await driver.$$(tableOfStudents + ' > tr');
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
	createNewPupil,
	isStudentEmailOnTheList,
	submitConsent,
	studentLogsInWithDefaultPassword,
};
