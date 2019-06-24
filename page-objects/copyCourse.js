'use strict';

const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const { expect } = require('chai');

const createCourse = require('../page-objects/createCourse');
const shared = { loginData };
const course = { courseData };

let existingCourses;

module.exports = {
  doesTheCourseExist: async function() {
    existingCourses = await createCourse.count();
    await driver.pause(1000);
    await expect(existingCourses).to.not.equal(0);
  },
  chooseCourse: async function() {
    const courses = await driver.$$('#section-courses .sc-card-wrapper');

    let coursesLength = await courses.length;

    let lastCourseIndex = coursesLength - 1;

    let lastCourse = await courses[lastCourseIndex];

    await lastCourse.click();
  },
  clickClone: async function() {
    let container = await driver.$('#page-title');
    await container.click();
    let cloneBtn = await driver.$(
      '#main-content > div.dropdown.dropdown-course.minimal-button.open > div > a:nth-child(4)'
    );
    await cloneBtn.click();
  },
  setName: async function(name) {
    let container = await driver.$(
      '#main-content > section > form > div:nth-child(3) > input'
    );
    await container.setValue(name);
  },
  confirmClone: async function() {
    let btn = await driver.$(
      '#main-content > section > form > div.modal-footer > button.btn.btn-primary.btn-submit'
    );
    await btn.click();
  },
  isSucessful: async function() {
    let mainCourses = await driver.$(
      'body > section > div.content-min-height > nav > ol > li:nth-child(1) > a'
    );
    await mainCourses.click();
    let newCourses = await createCourse.count();
    let difference = newCourses - existingCourses;
    await expect(difference).to.equal(1);
  }
};
