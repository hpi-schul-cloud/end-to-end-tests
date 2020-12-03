/*[url/courses]/[courseId]/edit] | [url/courses]/[courseId]/copy]*/

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');

const submitBtn = 'button.btn-submit';
const courseNameInput = 'form > div:nth-child(3) > input';
const courseDescriptionInput = 'textarea';
const deleteButton = 'a.btn-delete-course';
const deleteButtonConfirmation = '.modal-content button.btn-submit';

async function clickSubmitButton() {
	await elementHelpers.clickAndWait(submitBtn);
}

async function clickConfirmDeleteButton() {
	await elementHelpers.clickAndWait(deleteButtonConfirmation);
}

async function clickDeleteButton() {
	await elementHelpers.clickAndWait(deleteButton);
}

async function setNewCourseName(courseName) {
	await waitHelpers.waitAndSetValue(courseNameInput, courseName);
}

async function setNewCourseDescription(courseDescription) {
	await waitHelpers.waitAndSetValue(courseDescriptionInput, courseDescription);
}

module.exports = {
	clickSubmitButton,
	clickConfirmDeleteButton,
	clickDeleteButton,
	setNewCourseName,
	setNewCourseDescription,
};
