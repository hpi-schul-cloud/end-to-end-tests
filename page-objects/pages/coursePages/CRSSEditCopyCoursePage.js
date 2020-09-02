/*[url/courses]/[courseId]/edit] | [url/courses]/[courseId]/copy]*/
const wh = require("../../../runtime/helpers/waitHelpers.js");

const submitBtn = "button.btn-submit";

module.exports = {
    clickSubmitButton: async function () {
		await wh.waitAndClick(submitBtn);
	}
}