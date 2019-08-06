'use strict';
const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const { expect } = require('chai');

const createCourse = require('../page-objects/createCourse');
const copyCourse = require('../page-objects/copyCourse');
const adminLogin = require('../page-objects/adminLogin');
//const addPupilToTheCourse = require('../page-objects/addPupilToTheCourse');
//const shared = { loginData };
//const course = { courseData };
const imageCompare = require('../runtime/imageCompare');
var fs = require('fs');

module.exports = {
  basicHomework: async function() {
    await copyCourse.chooseCourse();
    let homeworkSection = await driver.$(
      '#main-content .tab[data-tab=b] .text'
    );
    await homeworkSection.click();
    let addBtn = await driver.$(
      '#main-content > section > div.course-card > div.sectionsContainer > div > div.section.active > div.row > div.col-sm-12.add-button > a'
    );
    await addBtn.click();
    let nameField = await driver.$('#homework-form > div:nth-child(5) > input');
    let name = 'Homework Test';
    await nameField.setValue(name);
    let teamwork = await driver.$('#teamSubmissions');
    await teamwork.click();
    await this.setAccomplishTime();
    await this.setHometaskText();
  },
  setHometaskText: async function() {
    // Aufgabenstellung:
    await driver.switchToFrame(0);
    let body = await driver.$('body');
    let message = 'Here is some TEXT!';
    await body.setValue(message);
    await driver.switchToParentFrame();
  },
  setAccomplishTime: async function() {
    let startDate = await driver.$('#availableDate');
    let dueDate = await driver.$('#dueDate');

    var begin = await new Date();
    var beginToString = await this.dateToString(begin);
    var end = await this.randomDate(new Date(), new Date(2022, 0));
    var endToString = await this.dateToString(end);

    await startDate.setValue(beginToString);
    await dueDate.setValue(endToString);
  },
  clickAdd: async function() {
    let addBtn2 = await driver.$(
      '#homework-form > div.modal-footer > button.btn.btn-primary.btn-submit'
    );
    await addBtn2.click();
  },

  dateToString: async function(date) {
    var dd = await date.getDate().toString();
    var mm = ((await date.getMonth()) + 1).toString();
    var yyyy = await date.getFullYear().toString();
    var minutes = await date.getHours().toString();
    var seconds = await date.getMinutes().toString();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (minutes < 10) {
      mm = '0' + mm;
    }
    var dateToBeSet =
      dd + '.' + mm + '.' + yyyy + '.' + minutes + '.' + seconds;
    return dateToBeSet;
  },
  randomDate: async function(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  },
  addHomework: async function() {
    let addBtn = await driver.$(
      '#homework-form > div.modal-footer > button.btn.btn-primary.btn-submit'
    );
    await addBtn.click();
  },
  addBasicHomework: async function() {
    await this.basicHomework();
    await this.clickAdd();
  },
  verify: async function() {
    let hometasks = await driver.$(
      'body > aside > nav > ul > li:nth-child(4) > a > i'
    );
    await hometasks.click();
    let sortBtn = await driver.$(
      '#filter > div > div.md-chip.md-theme-default.md-deletable.md-clickable > div'
    );
    await sortBtn.click();
    let select = await driver.$('#selection-picker > div > div');
    await select.click();
    let lastedited = await driver.$(
      'body > div.md-select-menu.md-menu-content-bottom-start.md-menu-content-small.md-menu-content.md-theme-default > div > ul > li:nth-child(2) > button'
    );
    await lastedited.click();
    let ok = await driver.$(
      'body > div.md-dialog.md-dialog-fullscreen.md-theme-default > div > div.md-dialog-actions > button.md-button.md-primary.md-theme-default > div > div'
    );
    await ok.click();

    let editBtn = await driver.$(
      '#main-content > div > section > ol > div:nth-child(1) > div > li:nth-child(1) > div > a.btn.btn-secondary.btn-sm.btn-edit'
    );
    await editBtn.click();
    await adminLogin.compareScreenshots();
  }
};
