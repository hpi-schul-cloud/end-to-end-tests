/*[url/courses]/[courseId]]*/
"use strict";

const waitHelpers = require("../../../runtime/helpers/waitHelpers.js");
const editCopyCoursePage = require("../../../page-objects/pages/coursePages/CRSSEditCopyCoursePage");

const selectors = {
	courseSettingsBtn: ".fa.fa-ellipsis-v.i-cog",
	setting: {
		editCourse: ".btn-course-edit",
		createInvitation: ".btn-create-invitation",
		createShareCourse: ".btn-create-share-course",
		cloneCourse: ".fa-clone",
	},
	tab: {
		topics: "[data-tab='js-topics']",
		homeworks: "[data-tab='js-homeworks']",
		tools: "[data-tab='js-tools']",
		groups: "[data-tab='js-groups']",
	},
}

module.exports = {
	openTopicsTab: async function () {
		await waitHelpers.waitAndClick(selectors.tab.topics);
	},

	openHomeworksTab: async function () {
		await waitHelpers.waitAndClick(selectors.tab.homeworks);
	},

	openToolsTab: async function () {
		await waitHelpers.waitAndClick(selectors.tab.tools);
	},

	openGroupsTab: async function () {
		await waitHelpers.waitAndClick(selectors.tab.groups);
	},

	clickThreePointSettingsIcon: async function () {
		await waitHelpers.waitAndClick(selectors.courseSettingsBtn);
	},

	clickSettingsDropdownMenuBtn: async function(settingsBtnSelector) {
		await waitHelpers.waitAndClick(settingsBtnSelector);
	},
	
	cloneCourse: async function () {
		await this.clickThreePointSettingsIcon();
		await waitHelpers.waitAndClick(selectors.setting.cloneCourse);
		await editCopyCoursePage.clickSubmitButton();
    }
}
