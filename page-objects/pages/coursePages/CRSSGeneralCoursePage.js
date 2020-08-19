/*[url/courses]/[courseId]]*/
"use strict";

const waitHelpers = require("../../../runtime/helpers/waitHelpers.js");

module.exports = {
	
	cloneCourse: async function () {
		let settingsBtn = ".fa.fa-ellipsis-v.i-cog";
		await waitHelpers.waitAndClick(settingsBtn);
		let copyCourseBtn = await driver.$(
			"div.dropdown.dropdown-course.minimal-button.open > div > a:nth-child(4)"
		);
		await copyCourseBtn.click();
		await driver.pause(1500);
		let submitBtn = "button.btn.btn-primary.btn-submit";
		await waitHelpers.waitAndClick(submitBtn);
    },
    clickOnButtonErstelleEinThema: async function () {
		let addBtn = ".add-button > a";
		await waitHelpers.waitAndClick(addBtn);
	},
}
