/*[url/courses]/[courseId]]*/
"use strict";

const editCopyCoursePage = require("../../../page-objects/pages/coursePages/CRSSEditCopyCoursePage");
const elementHelpers = require("../../../runtime/helpers/elementHelpers");

const courseSettingsBtn = ".fa.fa-ellipsis-v.i-cog";

const setting = {
	editCourse: '.btn-course-edit',
	createInvitation: '.btn-create-invitation',
	createShareCourse: '.btn-create-share-course',
	cloneCourse: '.fa-clone',
};

const tab = {
	topics: "[data-tab='js-topics']",
	homeworks: "[data-tab='js-homeworks']",
	tools: "[data-tab='js-tools']",
	groups: "[data-tab='js-groups']",
};

async function openTopicsTab() {
	await elementHelpers.click(tab.topics);
}

async function openHomeworksTab () {
	await elementHelpers.click(tab.homeworks);
}

async function openToolsTab () {
	await elementHelpers.click(tab.tools);
}

async function openGroupsTab () {
	await elementHelpers.click(tab.groups);
}

async function clickThreePointSettingsIcon () {
	await elementHelpers.click(courseSettingsBtn);
}

async function clickSettingsDropdownMenuBtn (settingsBtnSelector) {
	await elementHelpers.click(settingsBtnSelector);
}

async function cloneCourse () {
	await clickThreePointSettingsIcon();
	await clickSettingsDropdownMenuBtn(setting.cloneCourse);
	await editCopyCoursePage.clickSubmitButton();
}

async function clickEditCourse () {
	try {
		await clickThreePointSettingsIcon();
		await clickSettingsDropdownMenuBtn(setting.editCourse);
	} catch (error) {
		log.error("Can not click on element: " + error.message);
		throw error;
	}
}

module.exports = {
	openTopicsTab,
	openHomeworksTab,
	openToolsTab,
	openGroupsTab,
	clickThreePointSettingsIcon,
	clickSettingsDropdownMenuBtn,
	cloneCourse,
	clickEditCourse,
};
