'use strict';
const courseData = require('../shared-objects/courseData');
const helpers = require('../runtime/helpers.js')
const Axios = require('axios')


const chosenSearchableSelectHelper = (driver, selectSelector) => ({
	getAvailableOptions: async () => {
			const options = await driver.$$(`${selectSelector} > option`);
			return Promise.all(options.map(async opt => {
					return {
							text: (await opt.getHTML(false)).trim(),
							value: await opt.getAttribute("value")
					}
			}))
	},
	selectOptionByName: async (name) => {
			// TODO search by full name (including spaces) => remove split()
			const searchName = name.trim().split(" ")[0]
			const container = await driver.$(`${selectSelector} + .chosen-container`);
			const searchInput = await container.$(".chosen-search-input");
			await searchInput.click();
			await searchInput.setValue(searchName);
			const searchResult = await container.$(`.chosen-results .active-result.highlighted`)
			await searchResult.click();
	}
})

module.exports = {
	goToAddCourses: async function() {
		await helpers.loadPage(courseData.urlCoursesAdd, 20)
	},
	goToCourses: async function() {
		await helpers.loadPage(courseData.urlCourses, 20);
		await driver.pause(1000);
	},
	setCourseName: async function(coursename) {
		let nameSelector = await driver.$('[data-testid="coursename"]');
		await nameSelector.setValue(coursename)
	},
	setColour: async function() {
		let inputColor = await driver.$(courseData.elem.colorCourse);
		await inputColor.click();
	},
	goToNextSectionCreateCourse: async function() {
		let toNextSectionBtn = "#nextSection";
		await  helpers.waitAndClick(toNextSectionBtn)
	},

	goToCourseOverview: async function() {
		let toCourseOverview = await driver.$('a.btn.btn-primary');
		await toCourseOverview.click();
	},
	createCourse: async function(coursename) {
		await this.goToAddCourses();
		await this.setCourseName(coursename);
		await this.setColour();
		await this.goToNextSectionCreateCourse();
		await this.goToNextSectionCreateCourse();
		await this.goToCourseOverview();
	},
	getCourseNames: async function() {
		await this.goToCourses();
		let container = await driver.$('[data-testid="courses"]');
		let coursesNameContainer = await container.$$('div > div >article > div > span > div > span');
		let courseNames = await Promise.all(
			(await coursesNameContainer.map(async element => await element.getText())
		));
	return courseNames;
	},
	verify: async function(coursename) {
		let allCourses = await this.getCourseNames();
		await expect(allCourses).to.include(coursename);
	},

	createCourseWithStudents: async function(coursename, name) {
		await this.goToAddCourses();
		await this.setCourseName(coursename);
		await this.setColour();
		await this.goToNextSectionCreateCourse();
		const helper = chosenSearchableSelectHelper(driver, courseData.elem.selectorWithMultipleChoiceStudents);
		await helper.selectOptionByName(name);
		await this.goToNextSectionCreateCourse();
	},
	areSelectorsOnThePage: async function() {
	let isImportCourseBtnOnThePage = await helpers.isSelectorOnThePage(courseData.elem.importCourseBtn);
	await expect(isImportCourseBtnOnThePage).to.equal(1);
	let isCreatedCourseBtnOnThePage = await helpers.isSelectorOnThePage(courseData.elem.createCourseBtn);
	await expect(isCreatedCourseBtnOnThePage).to.equal(1);

	},
	clickCreateCourseBtn: async function()  {
		let btn = await driver.$(courseData.elem.createCourseBtn);
		await btn.click();
		await driver.pause(1000);
	},
	canProceedToStage: async function(stageNum) {
		switch (stageNum) {
			case 2: let selector = await driver.$(courseData.elem.stage1Selector);
			let children = await selector.$$(".//*");
			if (children.length>0) {
				return true;
			} else {
			return false};
			case 2: let selector2 = await driver.$(courseData.elem.stage2Selector);
			let children2 = await selector2.$$(".//*");
			if (children2.length>0) {
				return true;
			} else {
				return false};
			
		};
	},
	getUserName: async function() {
		const cookie = await driver.getCookies(['jwt']);
		const jwt = cookie[0].value;
		const info = await Axios.request({
		  url:  `${"http://localhost:3030"}/me`,
		  method: 'get',
		  headers: {
			Authorization: `${jwt}`
		  }
		});
		const firstName = info.data.firstName;
		const lastName = info.data.lastName; 
		return firstName+" "+lastName;
	

	},
	theTeachersNameisSetAutomatically: async function() {
		let teacherName = await this.getUserName();
		let placeHolderSelector = await driver.$(courseData.elem.teacherNamesInCreateCourse);
		let displayedNameSelector= await placeHolderSelector.$('.search-choice');
		let displayedName = await displayedNameSelector.getText();
		await expect(displayedName).to.equal(teacherName);
	},
	// could be extended with verifying the date is correct
	timeSpanIsSet: async function() {
		let startValueSelector = await driver.$(courseData.elem.timeSpan.start);
		let startValue = await startValueSelector.getValue();
		await expect (startValue.length).not.to.equal(0);
		let endsValueSelector = await driver.$(courseData.elem.timeSpan.end);
		let endsValue = await endsValueSelector.getValue();
		await expect(endsValue.length).not.to.equal(0);
		
	},
	supplyTeacherIsNotSet: async function() {
		let placeHolderSelector = await driver.$(courseData.elem.representativeContainer);
		let displayedNameSelector= await placeHolderSelector.$('.chosen-search-input.default');
		let displayedName = await displayedNameSelector.getValue();
		await expect(displayedName).to.equal("Lehrer:in auswählen");
		
	}

}
