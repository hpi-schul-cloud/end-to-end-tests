/*[url/administration/students[studentId]/edit]*/
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const pageTitle = '#page-title';
const cancelButton = '.btn-cancel';
const firstNameInput = "input[name='firstName']";
const lastNameInput = "input[name='lastName']";
const emailInput = "input[name='email']";
const birthdayInput = '#birthday';
const deleteButtonConfirmation = '.cancel-modal button.btn-close';
const deleteButtonCancel = '.cancel-modal button.historyback';

async function getPageTitle() {
	await waitHelpers.waitUntilPageLoads();
	const title = await elementHelpers.getElementText(pageTitle);
	const msg = 'Expected page title to be Schüler bearbeiten';
	expect(title, msg).to.equal('Schüler bearbeiten');
}

async function clickCancelButton() {
	await elementHelpers.clickAndWait(cancelButton);
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
	const msg = `Expected birthdate to equal ${birthdayDate}`;
	expect(birthdate, msg).to.equal(birthdayDate);
}

async function chooseOptionInCancelModal(discard) {
	// true for discard changes
	// false for continue editing

	if (discard) {
		await elementHelpers.clickAndWait(deleteButtonCancel);
	} else {
		await elementHelpers.clickAndWait(deleteButtonConfirmation);
	}
}

module.exports = {
	getPageTitle,
	clickCancelButton,
	chooseOptionInCancelModal,
	setStudentFirstName,
	setStudentLastName,
	setStudentEmail,
	setStudentBirthday,
	isStudentBirthdayCorrect,
};
