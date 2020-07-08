'use strict';


const courseData = require('../shared-objects/courseData');
const createCourse = require('../page-objects/createCourse');
const helpers = require('../runtime/helpers.js')

module.exports = {

	copyCourse: async function(coursename) {
		await this.chooseCourse(coursename);
		await this.cloneCourse();

	},
	chooseCourseHelper: async function(coursename) {
		await createCourse.goToCourses();
		let sectionActiveCoursesSelector = await driver.$('div[data-section="js-active"]');
		let container = await sectionActiveCoursesSelector.$('div[data-testid="courses"]');
		let numOfCourses = await container.$$('.sc-card-wrapper.col-xl-3.col-lg-4.col-md-6.col-sm-12');
		for (var i=1; i<=numOfCourses.length; i++) {
			let container = await driver.$('[data-testid="courses"]');
			let courseNameContainer = await container.$('.sc-card-wrapper.col-xl-3.col-lg-4.col-md-6.col-sm-12:nth-child('+i+') .title');
			let courseName = await courseNameContainer.getText();
			let a = courseName;
			if (courseName==coursename) {
				return i;
			}
		}
	},
	chooseCourse: async function(coursename) {
		let courseHasIndex = await this.chooseCourseHelper(coursename);
		let sectionActiveCoursesSelector = await driver.$('div[data-section="js-active"]');
		let container = await sectionActiveCoursesSelector.$('div[data-testid="courses"]');
		let course = await container.$('div:nth-child('+courseHasIndex+')');
		await course.click();
		await driver.pause(1500);

	},
	cloneCourse: async function() {
		let settingsBtn =  ".fa.fa-cog.i-cog";
		await helpers.waitAndClick(settingsBtn);
		let copyCourseBtn = await driver.$('div.dropdown.dropdown-course.minimal-button.open > div > a:nth-child(4)') ;
		await copyCourseBtn.click();
		await driver.pause(1500);
		let submitBtn= "button.btn.btn-primary.btn-submit";
		await helpers.waitAndClick(submitBtn);
	},
	countCourses: async function() {
		await createCourse.goToCourses();
		let sectionActiveCoursesSelector = await driver.$('div[data-section="js-active"]');
		let container = await sectionActiveCoursesSelector.$('div[data-testid="courses"]');
		let numOfCourses = await container.$$('.sc-card-wrapper.col-xl-3.col-lg-4.col-md-6.col-sm-12');
		return numOfCourses.length;
	},

	addTopic: async function(topicname) {
		let addBtn = ".add-button > a";
		await helpers.waitAndClick(addBtn);
		let nameSelector = await driver.$('.form-group > .form-control');
		await nameSelector.setValue(topicname);
		await driver.pause(500);


	},
	addText: async function(text) {
		const textBtn = ".btn-group > button:nth-child(1)";
		await helpers.waitAndClick(textBtn);
		const textField = await driver.$('.ck-content');
		await driver.pause(global.SHORT_WAIT_MILLIS);
		await textField.setValue(text);
		const submitBtn = "button.btn.btn-primary.btn-submit";
		await helpers.waitAndClick(submitBtn);
	},

	verify: async function(coursename, topicname) {
		await createCourse.goToCourses();
		await this.chooseCourse(coursename)
		let topicNames = await Promise.all(
			(await driver.$$('#topic-list > div > div > div')).map(
				async element => await element.getText()
			)
		);
		await expect(topicNames).to.include(topicname);
	},

	addGeoGebra: async function(geogebraID) {
		let geogebraBtn = ".btn-group > button:nth-child(2)";
		await helpers.waitAndClick(geogebraBtn);
		await driver.pause(100);
		let idContainer = await driver.$('#content-blocks');
		let geoIDSelector = await idContainer.$('.form-control');
		await geoIDSelector.setValue(geogebraID);
		await driver.pause(500);
		let submitBtn = "button.btn.btn-primary.btn-submit";
		await helpers.waitAndClick(submitBtn);
	},
	addMaterial: async function() {
		let materialBtn = ".btn-group > button:nth-child(3)";
		await helpers.waitAndClick(materialBtn);
		let currentBrowser = await driver.getWindowHandle();
		let addMaterialBtn = ".btn.btn-secondary.btn-add";
		await helpers.waitAndClick(addMaterialBtn);
		// window switch
		await driver.pause(9000);
		//await driver.switchWindow(courseData.lernStoreUrl);
		let browsers = await driver.getWindowHandles();
		let currentBrowserAfterClickAdd = await driver.switchWindow(browsers[1]);
		let materialContainer = await driver.$('.div.ajaxcontent > div');

		let btnContainer = await materialContainer.$('.fa.fa-plus-square');
		await btnContainer.click();
		await driver.pause(1500);
	},

	addEtherpad: async function(name, description) {
		let etherpadBtn = ".btn-group > button:nth-child(4)";
		await helpers.waitAndClick(etherpadBtn);
		let nameField = await driver.$('#content-blocks > div > div:nth-child(1) .form-control');
		await nameField.setValue(name);
		let descriptionField = await driver.$('#content-blocks > div > div:nth-child(1) .form-control');
		await descriptionField.setValue(description);
		let submitBtn = ".btn.btn-primary.btn-submit";
		await helpers.waitAndClick(submitBtn);
	},
	editEtherpad: async function() {
		await helpers.loadPage(courseData.urlCourses, 20);
		await this.chooseCourse();
		await this.gotoTopics();
		let etherpad = await driver.$('#topic-list > div > div > div > p');
		await etherpad.click();
		await driver.switchToFrame(0);
		let body = await driver.$('#innerdocbody');
		await body.click();
		await body.clear();
	},
	verifyCopyWithStudents: async function(coursename) {
		await createCourse.goToCourses();
		let copiedName = coursename + " - Kopie";
		let courseHasIndex = await this.chooseCourseHelper(copiedName);
		let sectionActiveCoursesSelector = await driver.$('div[data-section="js-active"]');
		let container = await sectionActiveCoursesSelector.$('div[data-testid="courses"]');
		let areThereStudentsInCourseContainer  = await container.$('.sc-card-wrapper.col-xl-3.col-lg-4.col-md-6.col-sm-12:nth-child('+courseHasIndex+') .additionalInfo .btn-member');
		let areThereStudentsInCourse = await areThereStudentsInCourseContainer.getText();
		let number = await parseInt(areThereStudentsInCourse);
		await expect(number).to.equal(0);

	}

};
