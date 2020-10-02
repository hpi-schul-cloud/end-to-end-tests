/*[url/courses]/[courseId]]*/
"use strict";

const editCopyCoursePage = require("../../../page-objects/pages/coursePages/CRSSEditCopyCoursePage");
const elementHelpers = require("../../../runtime/helpers/elementHelpers");

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
		await elementHelpers.click(tab.topics);
	},

	openHomeworksTab: async function () {
		await elementHelpers.click(tab.homeworks);
	},

	openToolsTab: async function () {
		await elementHelpers.click(tab.tools);
	},

	openGroupsTab: async function () {
		await elementHelpers.click(tab.groups);
	},

	clickThreePointSettingsIcon: async function () {
		await elementHelpers.click(courseSettingsBtn);
	},

	clickSettingsDropdownMenuBtn: async function (settingsBtnSelector) {
		await elementHelpers.click(settingsBtnSelector);
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
