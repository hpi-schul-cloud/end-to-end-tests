'use strict';

const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const teacherLogin = require('../page-objects/teacherLogin');
const shared = { loginData };
const course = { courseData };
const { expect } = require('chai');
let before;

module.exports = {
  count: async function() {
    const elem = await driver.$$(
      '#main-content > section > div.course-card > div.sectionsContainer > div > div.section.section-course.active > section > div > div > div'
    );
    await driver.pause(1000);
    return elem.length;
  },
  countBefore: async function() {
    before = await this.count();
    return before;
  },
  verify: async function() {
    let after = await this.count();
    let result = after - before;
    await expect(result).to.equal(1);
  },
  clickAdd: async function() {
    let actualCourses = await driver.$(
      '#main-content > section > div.course-card > div.tabContainer > div > button.tab.active > span'
    );
    await actualCourses.click();
    let clickBtn = await driver.$(
      'a[href="/courses/add"]'
    );
    await clickBtn.click();
  },
  inputCourseName: async function(courseName) {
    let inputCourseName = await driver.$(courseData.elem.nameCourse);
    await inputCourseName.setValue(courseName);
  },
  chooseColor: async function() {
    let inputColor = await driver.$(courseData.elem.colorCourse);
    await inputColor.click();
  },
  performCreateCourse: async function() {
    let weiterBtn2 = await driver.$('#nextSection');
    await weiterBtn2.click();

    let kursAnlegenUndWeiterBtn = await driver.$('#nextSection');
    await kursAnlegenUndWeiterBtn.click();
    await driver.$('.form-submitted');
  },

};


