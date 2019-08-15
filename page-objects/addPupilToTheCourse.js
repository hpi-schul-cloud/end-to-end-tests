'use strict';

const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const shared = { loginData };
const course = { courseData };
let name;

module.exports = {
  clickAdd: async function() {
    let clickBtn = await driver.$(
      '#main-content > section > div.course-card > div.sectionsContainer > div > div.section.section-course.active > div:nth-child(3) > div > div > div > a.btn.btn-primary.btn-add'
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
    await searchbox.click();
    let anotherPupil = await driver.$(
      container + '.chosen-drop .active-result:nth-of-type(2)'
    );
    await anotherPupil.click();
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
    const courses = await driver.$$(
      '#main-content > section > div.course-card > div.sectionsContainer > div > div.section.section-course.active > section > div > div > div'
    );
    await driver.pause(1000);
    let coursesLength = await courses.length;
    let lastCourseIndex = coursesLength - 1;
    let lastCourse = await courses[lastCourseIndex];
    let pupilIcon = await lastCourse.$('.btn-member');
    await pupilIcon.click();
    await driver.pause(500);
  },
  whatName: function() {
    return name;
  },
  verify: async function() {
    const elements = await driver.$$('#member-modal-body > ol > li');
    const namePromises = elements.map(async element => await element.getText());
    const memberNames = await Promise.all(namePromises);
    return memberNames;
  }
};
