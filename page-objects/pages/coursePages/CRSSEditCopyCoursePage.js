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

/**
 * Use this method to set text of inputfields
 * textBox defines the input field
 * text defines the input itself
 */

async function setTextOfTextbox(textBox, text) {
	try {
		const courseNameContainer = await waitHelpers.waitUntilElementIsPresent(textBox);
		await courseNameContainer.clearValue();
		await courseNameContainer.setValue(text);
	} catch (error) {
		log.error('Can not set value: ' + error.message);
		throw error;
	}
}

async function setCourseName(courseName) {
	setTextOfTextbox(courseNameInput, courseName);
}

async function setCourseDescription(courseDescription) {
	setTextOfTextbox(courseDescriptionInput, courseDescription);
}

module.exports = {
	clickSubmitButton,
	clickConfirmDeleteButton,
	clickDeleteButton,
	setCourseName,
	setTextOfTextbox,
	setCourseDescription,
};
