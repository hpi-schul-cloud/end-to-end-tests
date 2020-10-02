/*[url/courses]/[courseId]/edit] | [url/courses]/[courseId]/copy]*/
const waitHelpers = require("../../../runtime/helpers/waitHelpers");

const submitBtn = "button.btn-submit";
const courseNameInput = "form > div:nth-child(3) > input";
const courseDescriptionInput = "textarea";
const deleteButton = "a.btn-delete-course";
const deleteButtonConfirmation = ".modal-content button.btn-submit";

module.exports = {
	clickSubmitButton: async function () {
		await waitHelpers.waitAndClick(submitBtn);
	},

	clickDeleteButtonConfirmation: async function () {
		await waitHelpers.waitAndClick(deleteButtonConfirmation);
	},

	clickDeleteButton: async function () {
		await waitHelpers.waitAndClick(deleteButton);
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
