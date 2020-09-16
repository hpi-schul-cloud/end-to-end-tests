/*[url/courses]/[courseId]/edit] | [url/courses]/[courseId]/copy]*/
const wh = require("../../../runtime/helpers/waitHelpers.js");

const submitBtn = "button.btn-submit";
const courseNameInput = "form > div:nth-child(3) > input";
const courseDescriptionInput = "textarea";

module.exports = {
	clickSubmitButton: async function () {
		await wh.waitAndClick(submitBtn);
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
