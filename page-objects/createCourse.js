'use strict';

const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const imageCompare = require('../runtime/imageCompare');
const teacherLogin = require('../page-objects/teacherLogin');
const shared = { loginData };
const course = { courseData };

module.exports = {
  usrname: async function(username) {
    image = username;
  },
  performteacherLogin: async function(username, passwort) {
    await teacherLogin.performLogin(username, passwort);
    await teacherLogin.loginResult();
    await teacherLogin.compareScreenshots();
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
  },
  zurUebersicht: async function() {
    let zurUebersicht = await driver.$('#preshow');
    await zurUebersicht.click();
  }
};
