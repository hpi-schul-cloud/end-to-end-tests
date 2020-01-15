'use strict';
const courseData = require('../shared-objects/courseData');
const helpers = require('../runtime/helpers.js')


module.exports = {
  goToAddCourses: async function() {
    await helpers.loadPage(courseData.urlCoursesAdd, 20)
  },
  goToCourses: async function() {
    await helpers.loadPage(courseData.urlCourses, 20);
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
    await this.clickAddCourseButton();
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
  }




  
  }
  


