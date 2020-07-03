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
	setColour: async function(name) {
		const colors = ["grey","metallicGold","blue","green","darkGrey","goldenPoppy","martini","violetRed","corn"]
		const child = colors.indexOf(name) + 1
		if (child <= 0) {
		console.warn(`you did not insert a valid color. Must be ${colors},\n you inserted ${name}`)}

		const color = await driver.$(`.color-picker__item:nth-child(${child})`);
		await color.click();
		
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
		await this.goToNextSectionCreateCourse();
		await this.goToNextSectionCreateCourse();
		await this.goToCourseOverview();
	},
	getCourseNames: async function() {
		await this.goToCourses();
		let container = await driver.$('[data-testid="courses"]');
		let coursesNameContainer = await container.$$(courseData.elem.coursesPage.title);
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
			return children.length>0;
			case 2: let selector2 = await driver.$(courseData.elem.stage2Selector);
			let children2 = await selector2.$$(".//*");
			return children2.length>0	
		};
	},
	getUserName: async function() {
		const cookie = await driver.getCookies(['jwt']);
		const jwt = cookie[0].value;
		const info = await Axios.request({
		  url:  'http://localhost:3030/me',
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
		
	},
	nextScreenIsShown: async function(num) {
		switch (num) {
			case 1:
			let sectionSelector1 = await driver.$(courseData.elem.sections.sectionOne);
			let isShown1 = await sectionSelector1.isDisplayed();
			await expect(isShown1).to.equal(true);
			break;
			case 2:
			let sectionSelector2 = await driver.$(courseData.elem.sections.sectionTwo);
			let isShown2 = await sectionSelector2.isDisplayed();
			await expect(isShown2).to.equal(true);
			break;
			case 3:
			let sectionSelector3 = await driver.$(courseData.elem.sections.sectionThree);
			let isShown3 = await sectionSelector3.isDisplayed();
			await expect(isShown3).to.equal(true);
			break;
		}

	
	}, 
	noStudentsAreSet: async function() {
		let studentsContainer = await driver.$(courseData.elem.studentsContainer);
		let displayedStudentsSelector= await studentsContainer.$('.chosen-search-input.default');
		let contentOfPlaceholder = await displayedStudentsSelector.getValue();
		await expect(contentOfPlaceholder).to.equal("Schüler:innen auswählen");


	},
	noClassIsSet: async function() {
		let classContainer = await driver.$(courseData.elem.classContainer);
		let displayedClassesSelector= await classContainer.$('.chosen-search-input.default');
		let contentOfPlaceholder = await displayedClassesSelector.getValue();
		await expect(contentOfPlaceholder).to.equal("Klasse(n) auswählen");

	},
	btnsAreVisible: async function() {
		let elem1 = await driver.$$(courseData.elem.section_three_btns.einen_weiteren_kurs_anlegen_btn);
		await expect(elem1.length).not.to.equal(0);
		let elem2 = await driver.$$(courseData.elem.section_three_btns.zur_uebersicht_btn);
		await expect(elem2.length).not.to.equal(0);
	},
	clickCreateCourseAndNextBtn: async function() {
		let btn = await driver.$('#nextSection');
		await btn.click();
		await driver.pause(1500);
	},
	goToCoursePreview: async function() {
		let previewBtn = await driver.$(courseData.elem.section_three_btns.zur_uebersicht_btn);
		await previewBtn.click();
		await driver.pause(1000);
	},
	verifyColour: async function(colour) {
		await this.goToCourses();
		let activeCourses = await driver.$(courseData.elem.activeCourses);
		let coursesOnThePage = await activeCourses.$$(courseData.elem.coursesPage.container_of_element);
		let indexOfTheLastAddedCourse  = await coursesOnThePage.length;
		let container = await driver.$(courseData.elem.coursesPage.container_of_element+':nth-child('+indexOfTheLastAddedCourse+')');
		let lastAddedCourse = await container.$(courseData.elem.coursesPage.header_of_element);
		const styleArray = await lastAddedCourse.getHTML();
		let regexp = /background:#[A-Z, 0-9]{6};/;
		let styleMatches = styleArray.match(regexp);
		let style=styleMatches[0];
		switch (colour){
			case "grey":
			await expect(style).to.equal("background:#ACACAC;");
			break;

			case "metallicGold": 
			await expect(style).to.equal("background:#D4AF37;");
			break;
		
			case "blue":
			await expect(style).to.equal("background:#00E5FF;");
			break;
			      
			case "green":        
			await expect(style).to.equal("background:#1DE9B6;");
			break;

			case "darkGrey":    
			await expect(style).to.equal("background:#546E7A;");
			break;
			case "goldenPoppy":  
			await expect(style).to.equal("background:#FFC400;");
			break;

			case "martini":      
			await expect(style).to.equal("background:#BCAAA4;");
			break; 

			case "violetRed":    	
			await expect(style).to.equal("background:#FF4081;");
			break; 

			case "corn":       	
			await expect(style).to.equal("background:#FFEE58;");
			break;
		}
		
	},
	courseNameDisplayedCorrectly: async function(coursename){
		await this.goToCourses();
		let activeCourses = await driver.$(courseData.elem.activeCourses);
		let coursesOnThePage = await activeCourses.$$(courseData.elem.coursesPage.container_of_element);
		let indexOfTheLastAddedCourse  = await coursesOnThePage.length;
		let lastAddedCourse = await driver.$(courseData.elem.coursesPage.container_of_element+':nth-child('+indexOfTheLastAddedCourse+')');
		await lastAddedCourse.click();
		await driver.pause(1000);
		let displayedTextSelector = await driver.$('#page-title');
		let displayedText=await displayedTextSelector.getText();
		await expect(displayedText).to.equal(coursename);


	}
	

}
