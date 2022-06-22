/*[url/courses]/[courseId]/edit] | [url/courses]/[courseId]/copy]*/

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');

const submitBtn = 'button.btn-submit';
const courseNameInput = 'form > div:nth-child(3) > input';
const courseDescriptionInput = 'textarea';
const deleteButton = 'a.btn-delete-course';
const deleteButtonConfirmation = '.modal-content button.btn-submit';
const courseTeacherInput = "select[name='teacherIds[]'] + div.chosen-container  span";
const editOptionBtn = "//div[contains(text(), 'Bearbeiten/Löschen')]"

async function clickSubmitButton() {
	await elementHelpers.clickAndWait(submitBtn);
}

async function clickConfirmDeleteButton() {
	await elementHelpers.clickAndWait(deleteButtonConfirmation);
}

async function clickDeleteButton() {
	await elementHelpers.clickAndWait(deleteButton);
}

async function clickEditOptionButton() {
	await elementHelpers.clickAndWait(editOptionBtn)
}

async function setNewCourseName(courseName) {
	await clickEditOptionButton()
	await waitHelpers.waitAndSetValue(courseNameInput, courseName);
}

async function setNewCourseDescription(courseDescription) {
	await waitHelpers.waitAndSetValue(courseDescriptionInput, courseDescription);
}

async function isTeacherVisible(courseTeacher, expectedResult) {
	let teachersNames = await elementHelpers.getTextFromAllElements(courseTeacherInput);
	const msg = `Teacher with name ${courseTeacher} is not visible on the list \n`;
	const resultMsg = `List of teachersNames: ${teachersNames}`;
	expectedResult
		? expect(teachersNames).to.include(courseTeacher)
		: expect(teachersNames).to.not.include(courseTeacher);
	return expect(teachersNames, msg + resultMsg).to.not.include(courseTeacher);
}

module.exports = {
	clickSubmitButton,
	clickConfirmDeleteButton,
	clickDeleteButton,
	setNewCourseName,
	setNewCourseDescription,
	isTeacherVisible,
	clickEditOptionButton,
};
