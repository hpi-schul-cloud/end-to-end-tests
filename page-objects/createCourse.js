'use strict';

const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const imageCompare = require('../runtime/imageCompare');
const shared = { loginData };
const course = { courseData };

module.exports = {
  usrname: async function(username) {
    image = username;
  },
  count: async function() {
    const elem = await driver.$$('#section-courses .sc-card-wrapper');
    await driver.pause(1000);
    return elem.length;
  },
  clickAdd: async function() {
    let clickBtn = await driver.$(courseData.elem.addBtn);
    await clickBtn.click();
  },
  inputCourseName: async function(courseName) {
    /* ___________Section 1_____________*/
    let inputCourseName = await driver.$(courseData.elem.nameCourse);
    await inputCourseName.setValue(courseName);
  },
  chooseColor: async function() {
    let inputColor = await driver.$(courseData.elem.colorCourse);
    await inputColor.click();
  },
  performCreateCourse: async function() {
    let weiterBtn2 = await driver.$(courseData.elem.kursAnlegenUndWeiterBtn);
    await weiterBtn2.click();
    let kursAnlegenUndWeiterBtn = await driver.$(
      courseData.elem.kursAnlegenUndWeiterBtn
    );
    await kursAnlegenUndWeiterBtn.click();
  },
  zurUebersicht: async function() {
    let zurUebersicht = await driver.$(courseData.elem.zurUebersichtBtn);
    await zurUebersicht.click();
  }
};
