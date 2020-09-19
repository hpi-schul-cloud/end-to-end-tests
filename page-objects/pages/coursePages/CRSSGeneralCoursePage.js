/*[url/courses]/[courseId]]*/
"use strict";

const waitHelpers = require("../../../runtime/helpers/waitHelpers.js");
const editCopyCoursePage = require("../../../page-objects/pages/coursePages/CRSSEditCopyCoursePage");

const courseSettingsBtn = ".fa.fa-ellipsis-v.i-cog";

const setting = {
	editCourse: ".btn-course-edit",
	createInvitation: ".btn-create-invitation",
	createShareCourse: ".btn-create-share-course",
	cloneCourse: ".fa-clone",
};

const tab = {
	topics: "[data-tab='js-topics']",
	homeworks: "[data-tab='js-homeworks']",
	tools: "[data-tab='js-tools']",
	groups: "[data-tab='js-groups']",
};

module.exports = {
	openTopicsTab: async function () {
		await waitHelpers.waitAndClick(tab.topics);
	},

	openHomeworksTab: async function () {
		await waitHelpers.waitAndClick(tab.homeworks);
	},

	openToolsTab: async function () {
		await waitHelpers.waitAndClick(tab.tools);
	},

	openGroupsTab: async function () {
		await waitHelpers.waitAndClick(tab.groups);
	},

	clickThreePointSettingsIcon: async function () {
		await waitHelpers.waitAndClick(courseSettingsBtn);
	},

	clickSettingsDropdownMenuBtn: async function (settingsBtnSelector) {
		await waitHelpers.waitAndClick(settingsBtnSelector);
	},

	cloneCourse: async function () {
		await this.clickThreePointSettingsIcon();
		await this.clickSettingsDropdownMenuBtn(setting.cloneCourse);
		await editCopyCoursePage.clickSubmitButton();
	},

	clickEditCourse: async function () {
		try {
			await this.clickThreePointSettingsIcon();
			await this.clickSettingsDropdownMenuBtn(setting.editCourse);
		} catch (error) {
			log.error("Can not click on element: " + error.message);
			throw error;
		}
	},
};
