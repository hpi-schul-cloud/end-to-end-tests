/*[url/courses]/[courseId]/edit] | [url/courses]/[courseId]/copy]*/

const elementHelpers = require("../../../runtime/helpers/elementHelpers");

const submitBtn = "button.btn-submit";
const courseNameInput = "form > div:nth-child(3) > input";
const courseDescriptionInput = "textarea";
const deleteButton = "a.btn-delete-course";
const deleteButtonConfirmation = ".modal-content button.btn-submit";

module.exports = {
	clickSubmitButton: async function () {
		await elementHelpers.clickAndWait(submitBtn);
	},

	clickDeleteButtonConfirmation: async function () {
		await elementHelpers.clickAndWait(deleteButtonConfirmation);
	},

	clickDeleteButton: async function () {
		await elementHelpers.clickAndWait(deleteButton);

	},

	setCourseName: async function (courseName) {
		try {
			const courseNameContainer = await driver.$(courseNameInput);
			await courseNameContainer.clearValue();
			await courseNameContainer.setValue(courseName);
		} catch (error) {
			log.error("Can not set value: " + error.message);
			throw error;
		}
	},

	setCourseDescription: async function (courseDescription) {
		try {
			const courseNameContainer = await driver.$(courseDescriptionInput);
			await courseNameContainer.clearValue();
			await courseNameContainer.setValue(courseDescription);
		} catch (error) {
			log.error("Can not set value: " + error.message);
			throw error;
		}
	},
};
