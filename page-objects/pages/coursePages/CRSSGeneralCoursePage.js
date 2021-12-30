/*[url/courses]/[courseId]]*/
"use strict";

const editCopyCoursePage = require("../../../page-objects/pages/coursePages/CRSSEditCopyCoursePage");
const elementHelpers = require("../../../runtime/helpers/elementHelpers");
const CRSSCourseListPage = require("./CRSSCourseListPage");

const courseSettingsBtn = ".fa.fa-ellipsis-v.i-cog";
const courseDescriptionSel = '#courseDescription';
const topicSelector = '#topic-list .card';
const trashcanBtnSelector = ".fa-trash-o";
const deleteTopicButtonInPopup = "body > div.modal.fade.delete-modal.in > div > div > div.modal-footer > button.btn.btn-primary.btn-submit";

const setting = {
	editCourse: '.btn-course-edit',
	createInvitation: '.btn-create-invitation',
	createShareCourse: '.btn-create-share-course',
	cloneCourse: '.fa-clone',
};

const tab = {
	topics: "[data-tab='js-topics']",
	tasks: "[data-tab='js-homeworks']",
	tools: "[data-tab='js-tools']",
	groups: "[data-tab='js-groups']",
};

async function openTopicsTab() {
	await elementHelpers.clickAndWait(tab.topics);
}

async function openTasksTab () {
	await elementHelpers.clickAndWait(tab.tasks);
}

async function openToolsTab () {
	await elementHelpers.clickAndWait(tab.tools);
}

async function openGroupsTab () {
	await elementHelpers.clickAndWait(tab.groups);
}

async function clickThreePointSettingsIcon () {
	await elementHelpers.clickAndWait(courseSettingsBtn);
}

async function clickSettingsDropdownMenuBtn (settingsBtnSelector) {
	await elementHelpers.clickAndWait(settingsBtnSelector);
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

async function copyCourseWithName(courseName) {
	await CRSSCourseListPage.goToCourses();
	await CRSSCourseListPage.clickOnCourseInSection(courseName, courseListPage.section.activeCourses);
	await cloneCourse();
}

async function clickOnTopicDeleteTrashcanButton(name) {
	let listOfTopicElements = await elementHelpers.getListOfAllElements(topicSelector);
	let topicTitleList = await elementHelpers.getTextFromAllElements(topicSelector);
	await elementHelpers.clickAndWait(listOfTopicElements[topicTitleList.indexOf(name)].$(trashcanBtnSelector));
}

async function clickDeleteTopicButtonInPopup() {
	await elementHelpers.clickAndWait(deleteTopicButtonInPopup);
}

module.exports = {
	openTopicsTab,
	openTasksTab,
	openToolsTab,
	openGroupsTab,
	clickThreePointSettingsIcon,
	clickSettingsDropdownMenuBtn,
	cloneCourse,
	clickEditCourse,
	copyCourseWithName,
	clickOnTopicDeleteTrashcanButton,
	clickDeleteTopicButtonInPopup,
	courseDescriptionSel,
};
