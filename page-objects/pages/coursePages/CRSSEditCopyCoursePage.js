/*[url/courses]/[courseId]/edit] | [url/courses]/[courseId]/copy]*/
const waitHelpers = require("../../../runtime/helpers/waitHelpers.js");

const selectors = {
	submitBtn = "button.btn-submit",
}

module.exports = {
    clickSubmitButton: async function () {
		await waitHelpers.waitAndClick(selectors.submitBtn);
	}
}
