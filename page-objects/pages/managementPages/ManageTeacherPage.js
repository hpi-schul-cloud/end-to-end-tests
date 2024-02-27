/*[url/administration/teachers[teacherId]/edit]*/
'use strict'

const elementHelpers = require('../../../runtime/helpers/elementHelpers')
const waitHelpers = require('../../../runtime/helpers/waitHelpers')

const deleteButton = '.btn-delete'
const deleteButtonConfirmation = '.delete-modal.in  button.btn-submit'
const floatingActionButtonBtn = "[data-testid='fab_button_teachers_table']"
const addTeacherBtn = "[data-testid='fab_button_add_teachers']"
const firstNameInput = "[data-testid='input_create-user_firstname'] div.v-field__field input"
const lastNameInput = "[data-testid='input_create-user_lastname'] div.v-field__field input"
const emailInput = "[data-testid='input_create-user_email'] div.v-field__field input"
const addTeacherSubmitBtn = "button[data-testid='button_create-user_submit']"
const tableOfTeachers = "tbody[data-testid='table-data-body']"
const tableOfTeachersRow = tableOfTeachers + ' > tr'
const firstNameCells = tableOfTeachers + ' td:nth-child(2)'
const lastNameCells = tableOfTeachers + ' td:nth-child(3)'
const emailCells = tableOfTeachers + ' td:nth-child(4)'

async function clickDeleteBtn () {
	await elementHelpers.click(deleteButton)
}

async function clickDeleteInModal () {
	await elementHelpers.clickAndWait(deleteButtonConfirmation)
}

async function clickFloatingActionButtonBtnTeacher () {
	await elementHelpers.clickAndWait(floatingActionButtonBtn)
}

async function clickAddTeacherBtn () {
	await elementHelpers.clickAndWait(addTeacherBtn)
}

async function goToCreateForm () {
	await clickFloatingActionButtonBtnTeacher()
	await clickAddTeacherBtn()
	await waitHelpers.waitUntilPageLoads()
}

async function setTeacherFirstName (firstname) {
	await waitHelpers.waitAndSetValue(firstNameInput, firstname)
}

async function setTeacherLastName (lastname) {
	await waitHelpers.waitAndSetValue(lastNameInput, lastname)
}

async function setTeacherEmail (email) {
	await waitHelpers.waitAndSetValue(emailInput, email)
}

async function submitTeacherAddition () {
	await elementHelpers.clickAndWait(addTeacherSubmitBtn)
}

async function createNewTeacher (firstname, lastname, email) {
	// await waitHelpers.waitUntilPageLoads();
	await setTeacherFirstName(firstname)
	await setTeacherLastName(lastname)
	await setTeacherEmail(email)
	await submitTeacherAddition()
	// await waitHelpers.waitUntilPageLoads()
}

async function getTeachersDetailsList (whichCell) {
	let names = await elementHelpers.getTextFromAllElements(whichCell)
	return names
}

async function isTeacherVisible (userEmail, expectedValue) {
	await waitHelpers.waitUntilElementIsVisible(tableOfTeachersRow)
	let teachersTable = await getTeachersDetailsList(emailCells)
	let isEmailExists = false
	for (let index = 0; index < teachersTable.length; index++) {
		if (teachersTable[index] === userEmail) {
			isEmailExists = true
			break
		}
	}
	expect(isEmailExists).to.equal(expectedValue)
}

module.exports = {
	clickDeleteBtn,
	clickDeleteInModal,
	goToCreateForm,
	createNewTeacher,
	isTeacherVisible,
}
