/*[url/courses]/[courseId]/edit] | [url/courses]/[courseId]/copy]*/

const elementHelpers = require("../../../runtime/helpers/elementHelpers");
const waitHelpers = require("../../../runtime/helpers/waitHelpers");

const submitBtn = "button.btn-submit";
const courseNameInput = "form > div:nth-child(3) > input";
const courseDescriptionInput = "textarea";
const deleteButton = "a.btn-delete-course";
const deleteButtonConfirmation = ".modal-content button.btn-submit";

async function clickSubmitButton () {
	await elementHelpers.clickAndWait(submitBtn);
}

async function clickConfirmDeleteButton () {
	await elementHelpers.clickAndWait(deleteButtonConfirmation);
}

async function clickDeleteButton () {
	await elementHelpers.clickAndWait(deleteButton);

}

async function setCourseName (courseName) {
	try {
		const courseNameContainer = await waitHelpers.waitUntilElementIsPresent(courseNameInput);
		await courseNameContainer.clearValue();
		await courseNameContainer.setValue(courseName);
	} catch (error) {
		log.error("Can not set value: " + error.message);
		throw error;
	}
}

async function setCourseDescription (courseDescription) {
	try {
		const courseNameContainer = await waitHelpers.waitUntilElementIsPresent(courseDescriptionInput);
		await courseNameContainer.clearValue();
		await courseNameContainer.setValue(courseDescription);
	} catch (error) {
		log.error('Can not set value: ' + error.message);
		throw error;
	}
}

module.exports = {
	clickSubmitButton,
	clickConfirmDeleteButton,
	clickDeleteButton,
	setCourseName,
	setCourseDescription,
};
