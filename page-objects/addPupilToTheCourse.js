'use strict';

const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const shared = { loginData };
const course = { courseData };
let name;

module.exports = {
  usrname: async function(username) {
    image = username;
  },
  count: async function() {
    const elem = await driver.$$('#section-courses .sc-card-wrapper');
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
  nextButton: async function() {
    let weiterBtn2 = await driver.$(courseData.elem.kursAnlegenUndWeiterBtn);
    await weiterBtn2.click();
  },
  addPupils: async function() {
    const container =
      '#section-course .course-submit-page .form-group:nth-of-type(2) ';
    let searchbox = await driver.$(container + '.search-field input');
    await searchbox.click();
    let selectbox = await driver.$(
      container + '.chosen-drop .active-result:nth-of-type(1)'
    );
    name = await selectbox.getText();
    await selectbox.click();
  },
  addVertretung: async function() {
    let container = await driver.$(
      '#section-course > div.wizard-card > form > div.panels.mb-2 > section:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div > ul'
    );
    await container.click();
  },
  addClass: async function() {
    const classContainer =
      '#section-course .course-submit-page .form-group:nth-of-type(1) ';
    let classSearchbox = await driver.$(classContainer + '.search-field input');
    await classSearchbox.click();
    let classSelectbox = await driver.$(
      classContainer + '.chosen-results .active-result:nth-of-type(1)'
    );
    await classSelectbox.click();
  },
  createCourseAndNext: async function() {
    let kursAnlegenUndWeiterBtn = await driver.$('#nextSection');
    await kursAnlegenUndWeiterBtn.click();
  },
  zurUebersicht: async function() {
    let zurUebersicht = await driver.$('#preshow');
    await zurUebersicht.click();
  },
  clickPupilIcon: async function() {
    const courses = await driver.$$('#section-courses .sc-card-wrapper');
    await driver.pause(500);
    let coursesLength = await courses.length;
    await driver.pause(500);
    let lastCourseIndex = coursesLength - 1;
    await driver.pause(500);
    let lastCourse = await courses[lastCourseIndex];
    await driver.pause(500);
    let pupilIcon = await lastCourse.$('.btn-member');
    await pupilIcon.click();
    await driver.pause(1000);
    let memberNames = await driver.$$('#member-modal-body ol li');
    let j = (await memberNames.length) - 1;
    let result = [];
    for (var i = 0; i <= j; i++) {
      let resultName = await memberNames[i].getText();
      await result.push(resultName);
    }
    await driver.pause(1500);
    await expect(result).to.include(name);
    await driver.pause(2000);
  },
  closeWindow: async function() {
    await driver.closeWindow();
  }
};
