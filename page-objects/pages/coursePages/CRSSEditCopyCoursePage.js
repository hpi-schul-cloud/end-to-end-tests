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
		const courseNameContainer = await driver.$(courseNameInput);
		await courseNameContainer.clearValue();
		await courseNameContainer.setValue(courseName);
	},

	setCourseDescription: async function (courseDescription) {
		const courseNameContainer = await driver.$(courseDescriptionInput);
		await courseNameContainer.clearValue();
		await courseNameContainer.setValue(courseDescription);
	},
}
