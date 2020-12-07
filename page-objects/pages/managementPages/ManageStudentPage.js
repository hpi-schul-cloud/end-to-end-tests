/*[url/administration/students[studentId]/edit]*/
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const cancelButton = '.btn-cancel';
const firstNameInput = "input[name='firstName']";
const lastNameInput = "input[name='lastName']";
const emailInput = "input[name='email']";
const birthdayInput = '#birthday';
const deleteButton = '.btn-delete';
const cancelButtonConfirmation = '.cancel-modal button.btn-close';
const deleteButtonCancel = '.cancel-modal button.historyback';
const deleteButtonConfirmation = '.delete-modal.in  button.btn-submit';

async function clickDeleteBtn() {
	await elementHelpers.click(deleteButton);
}
async function clickCancelButton() {
	await elementHelpers.clickAndWait(cancelButton);
}

async function clickDeleteInModal() {
	await elementHelpers.clickAndWait(deleteButtonConfirmation);
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

async function setStudentBirthday(birthdayDate) {
	await waitHelpers.waitUntilElementIsClickable(birthdayInput);
	await driver.execute('document.querySelector("#birthday").value = "' + birthdayDate + '"'); //date format dd.mm.yyyy
}

async function getStudentBirthdate() {
	const birthday = await elementHelpers.getValueOfElement(birthdayInput);
	return birthday;
}

async function isStudentBirthdayCorrect(birthdayDate) {
	const birthdate = await getStudentBirthdate();
	const msg = `Expected: ${birthdate}, Actual: ${birthdayDate}`;
	expect(birthdate, msg).to.equal(birthdayDate);
}

async function clickCancelInModal() {
	await elementHelpers.clickAndWait(cancelButtonConfirmation);
}
async function clickDiscardChangesInModal() {
	await elementHelpers.clickAndWait(deleteButtonCancel);
}

module.exports = {
	clickCancelButton,
	clickDiscardChangesInModal,
	clickCancelInModal,
	clickDeleteBtn,
	setStudentFirstName,
	setStudentLastName,
	setStudentEmail,
	setStudentBirthday,
	isStudentBirthdayCorrect,
	clickDeleteInModal,
};
