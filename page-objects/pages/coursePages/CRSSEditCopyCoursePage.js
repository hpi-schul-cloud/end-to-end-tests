/*[url/courses]/[courseId]/edit] | [url/courses]/[courseId]/copy]*/
const waitHelpers = require("../../../runtime/helpers/waitHelpers.js");

const selectors = {
	submitBtn: "button.btn-submit",
	courseNameInput: "form > div:nth-child(3) > input",
	courseDescriptionInput: "textarea",
}

module.exports = {
	clickSubmitButton: async function () {
		await waitHelpers.waitAndClick(selectors.submitBtn);
	},

	setCourseName: async function (courseName) {
		try {
			const courseNameContainer = await driver.$(selectors.courseNameInput);
			await courseNameContainer.clearValue();
			await courseNameContainer.setValue(courseName);
		} catch (error) {
			log.error("Can not set value: " + error.message);
			throw error;
		}
	},

	setCourseDescription: async function (courseDescription) {
		try {
			const courseNameContainer = await driver.$(selectors.courseDescriptionInput);
			await courseNameContainer.clearValue();
			await courseNameContainer.setValue(courseDescription);
		} catch (error) {
			log.error("Can not set value: " + error.message);
			throw error;
		}
	},
};
