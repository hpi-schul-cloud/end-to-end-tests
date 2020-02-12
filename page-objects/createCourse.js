'use strict';
const courseData = require('../shared-objects/courseData');
const helpers = require('../runtime/helpers.js')


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
  createCourse: async function(coursename) {
    await this.goToAddCourses();
    await this.setCourseName(coursename);
    await this.setColour();
    await this.goToNextSectionCreateCourse();
    await this.goToNextSectionCreateCourse();
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
  }
  }
  


