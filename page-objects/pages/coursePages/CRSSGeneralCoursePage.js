/*[url/courses]/[courseId]]*/
"use strict";

const wh = require("../../../runtime/helpers/waitHelpers.js");
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
		await wh.waitAndClick(tab.topics);
	},

	openHomeworksTab: async function () {
		await wh.waitAndClick(tab.homeworks);
	},

	openToolsTab: async function () {
		await wh.waitAndClick(tab.tools);
	},

	openGroupsTab: async function () {
		await wh.waitAndClick(tab.groups);
	},

	clickThreePointSettingsIcon: async function () {
		await wh.waitAndClick(courseSettingsBtn);
	},

	clickSettingsDropdownMenuBtn: async function(settingsBtnSelector) {
		await wh.waitAndClick(settingsBtnSelector);
	},
	
	cloneCourse: async function () {
		await this.clickThreePointSettingsIcon();
		await this.clickSettingsDropdownMenuBtn(setting.cloneCourse);
		await editCopyCoursePage.clickSubmitButton();
	},
	
	clickEditCourse: async function () {
		await this.clickThreePointSettingsIcon();
		await this.clickSettingsDropdownMenuBtn(setting.editCourse);
    }
}
