'use strict';

const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const { expect } = require('chai');

const createCourse = require('../page-objects/createCourse');
const addPupilToTheCourse = require('../page-objects/addPupilToTheCourse');
const shared = { loginData };
const course = { courseData };
let before;

module.exports = {
  create: async function(name) {
    await createCourse.clickAdd();
    await createCourse.inputCourseName(name);
    await createCourse.chooseColor();
    await addPupilToTheCourse.addVertretung();
    await addPupilToTheCourse.nextButton();
    await addPupilToTheCourse.addPupils();
    await addPupilToTheCourse.addClass();
    await addPupilToTheCourse.createCourseAndNext();
    await driver.pause(1000);
    let url = courseData.urlCourses;
    await helpers.loadPage(url, 20);
  },
  copyCourse: async function() {
    await helpers.loadPage(courseData.urlCourses, 20);
    await this.countBeforeCopied();
    await this.chooseCourse();
    await this.clickClone();
    await this.confirmClone();
  },
  chooseCourse: async function() {
    let coursesContainer = await driver.$('div[data-testid=\'courses\']');
    let courses = await driver.$$('div[data-testid=\'courses\'] > div');
    let lastCourseIndex = courses.length;
    //let lastCourse = await driver.$('div[data-testid=\'courses\'] > div:nth-child' + '('+ lastCourseIndex + ')');
    let lastCourse = await driver.$('div[data-testid=\'courses\'] > div:nth-child(1)');
    await lastCourse.click(); 
    // wir gehen davon aus, dass noch keine aktuelle Kurse vorhanden sind:
    /*let course = await driver.$('div[data-testid=\'courses\'] > div');
    await course.click(); */
  },
  addThema: async function() {
    let addBtn = await driver.$(
      ' #main-content > section > div.course-card > div.sectionsContainer > div > div.section.active > div > div:nth-child(2) > div.add-button > a'
    );
    await addBtn.click();
  },
  addText: async function() {
    await this.chooseCourse();
    await this.addThema();
    let textBtn = await driver.$(
      '#content-blocks > div > div.form-group > div > button:nth-child(1)'
    );
    await textBtn.click();
    let text = 'lalalala, blala';
    await driver.pause(4000);
    let iframe = await driver.$('#cke_1_contents > iframe');
    let textField = await driver.$('body');
    await iframe.click();
    await driver.switchToFrame(iframe);
    await textField.setValue(text);
    await driver.switchToParentFrame();
  },
  themaAndSubthema: async function() {
    const thema = 'TEST';
    let themaTitle = await driver.$(
      '#main-content > section > form > div:nth-child(4) > input'
    );
    await themaTitle.setValue(thema);
    let subthema = 'Subtopic';
    let subthemaWindow = await driver.$(
      '#content-blocks > div > div:nth-child(1) > div > div > div.card-header > div > input.form-control'
    );
    await subthemaWindow.setValue(subthema);
    let submitBtn = await driver.$(
      '#main-content > section > form > div.modal-footer > button.btn.btn-primary.btn-submit'
    );
    await submitBtn.click();
  },
  gotoTopics: async function() {
    let topicsBtn = await driver.$(
      '#main-content > section > div.course-card > div.tabContainer > div > button.tab.active'
    );
    await topicsBtn.click();
  },
  verify: async function() {
    await await helpers.loadPage(courseData.urlCourses, 20);
    await this.chooseCourse();
    await this.gotoTopics();
    let topicNames = await Promise.all(
      (await driver.$$('#topic-list > div > div > div')).map(
        async element => await element.getText()
      )
    );
    await expect(topicNames).to.include('TEST');
  },
  verifyPupils: async function() {
    let numberOfPupils = await driver.$(
      '.section-course.active > section > div > div > div:nth-child(2) > article a.btn-member'
    );
    let numberText = await numberOfPupils.getText();
    let number = await parseInt(numberText);
    await expect(number).to.equal(0);
  },
  addGeoGebraArbeitsblatt: async function() {
    await this.chooseCourse();
    await this.addThema();
    let geoGebraBtn = await driver.$(
      '#content-blocks > div > div.form-group > div > button:nth-child(2)'
    );
    await geoGebraBtn.click();
    let geoID = await driver.$('.form-control');
    let id = 'ucxngdjf';
    await geoID.setValue(id);
    var thema = 'geoGebra';
    await this.themaAndSubthema();
  },
  addNeXboard: async function() {
    await this.chooseCourse();
    await this.addThema();
    let name = 'Test';
    let description = 'here is some text';
    let neXboard = await driver.$(
      '#content-blocks > div > div.form-group > div > button:nth-child(4)'
    );
    await neXboard.click();
    let insertName = await driver.$(
      '#content-blocks > div > div:nth-child(1) > div > div > div.card-block > div > div:nth-child(1) > input'
    );
    await insertName.setValue(name);
    let insertDescription = await driver.$(
      '#content-blocks > div > div:nth-child(1) > div > div > div.card-block > div > div:nth-child(2) > textarea'
    );
    await insertDescription.setValue(description);
    await this.themaAndSubthema();
  },
  addEtherpad: async function() {
    await this.chooseCourse();
    await this.addThema();
    let name = 'Test';
    let description = 'etherpad test';
    let etherpadBtn = await driver.$(
      '#content-blocks > div > div.form-group > div > button:nth-child(5)'
    );
    await etherpadBtn.click();
    let nameField = await driver.$(
      '#content-blocks > div > div:nth-child(1) > div > div > div.card-block > div > div:nth-child(1) > input'
    );
    let descriptionField = await driver.$(
      '#content-blocks > div > div:nth-child(1) > div > div > div.card-block > div > div:nth-child(2) > textarea'
    );
    await nameField.setValue(name);
    await descriptionField.setValue(description);
    await this.themaAndSubthema();
  },
  editEtherpad: async function() {
    await helpers.loadPage(courseData.urlCourses, 20);
    await this.chooseCourse();
    await this.gotoTopics();
    let etherpad = await driver.$('#topic-list > div > div > div > p');
    await etherpad.click();
    //let iframe = await driver.$('#outerdocbody > iframe');
    // await iframe.click();
    await driver.switchToFrame(0);
    let body = await driver.$('#innerdocbody');
    await body.click();
    await body.clear();
  },

  delete: async function() {
    await helpers.loadPage(courseData.urlCourses, 20);
    const courses = await driver.$$('#section-courses .sc-card-wrapper');
    let lastCourseIndex = (await courses.length) - 1;
    let lastCourse = await courses[lastCourseIndex];
    await lastCourse.click();
    let course = await driver.$('#page-title');
    await course.click();
    let deleteBtn = await driver.$(
      '#main-content > div.dropdown.dropdown-course.minimal-button.open > div > a.dropdown-item.btn-course-edit'
    );
    await deleteBtn.click();
    let deleteBtn2 = await driver.$(
      '#main-content > section > form > div.modal-footer > a'
    );
    await deleteBtn2.click();
    let lastBtn = await driver.$(
      'body > div.modal.fade.delete-modal.in > div > div > div.modal-footer > button.btn.btn-primary.btn-submit'
    );
    await lastBtn.click();
  },
  deleteAll: async function() {
    await this.delete();
    await this.delete();
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
    await driver.$('[href*="/topics/add"]');
    await helpers.loadPage(courseData.urlCourses, 20);
  },
  countBeforeCopied: async function() {
    before = await createCourse.count();
    return before;
  },
  verifySimpleCopyCourse: async function() {
    let after = await createCourse.count();
    let result = after - before;
    await expect(result).to.equal(1);
  }
};
