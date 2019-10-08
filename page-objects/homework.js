'use strict';
const { CLIENT } = require("../shared-objects/servers");
const courseData = require('../shared-objects/courseData');
const { expect } = require('chai');
const Login = require('../shared-objects/loginData');
const copyCourse = require('../page-objects/copyCourse');
let teacherLogin = require('../page-objects/teacherLogin');
const firstLogin = require('../shared_steps/firstLogin.js');
let name;
let was_submitted_by; 

module.exports = {
  basicHomework: async function(taskname) {
    await copyCourse.chooseCourse();
    let homeworkSection = await driver.$('button[data-testid="hometasks"]');
    await homeworkSection.click();
    let addBtn = await driver.$('.col-sm-12.add-button');
    await addBtn.click();
    let nameField = await driver.$('input[data-testid="name_of_task"]');
    await nameField.setValue(taskname);
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
    var begin = await this.dateToString();
    await driver.execute('document.querySelector("#availableDate").value="15.08.2018 11:00"');
    var end = await this.randomDate();
    await driver.execute('document.querySelector("#dueDate").value="15.08.2022 11:00"');
  },
  clickAdd: async function() {
    let addBtn2 = await driver.$(
      '#homework-form > div.modal-footer > button.btn.btn-primary.btn-submit'
    );
    await addBtn2.click();
  },
  dateToString: async function() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let hours = "11";
    let minutes = "00";
  
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
  
    return dd + '.' + mm + '.' + yyyy + '.' + hours + '.' + minutes;
  
  },
  randomDate: async function() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear()+1;
    let hours = "11";
    let minutes = "00";
  
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
  
    return dd + '.' + mm + '.' + yyyy + '.' + hours + '.' + minutes;
  },
  addHomework: async function() {
    let btnContainer = await driver.$('#homework-form .modal-footer')
    let addBtn = await btnContainer.$('button[type="submit"]');
    await addBtn.click();
  },
  addBasicHomework: async function(taskname) {
    await this.basicHomework(taskname);
    await this.clickAdd();
    await driver.pause(1000);
  },
  gotoTasks: async function() {
    let url = `${CLIENT.URL}/homework/`;
    await helpers.loadPage(url, 20);
  },
  sortHometasksLastEditedFirst: async function() {
    let sortBtnContainer = await driver.$('.filter');
    let sortBtn = await sortBtnContainer.$('.md-ripple');
    await sortBtn.click();
    let select = await driver.$('#selection-picker > div > div');
    await select.click();
    let lastedited = await driver.$('body > div.md-select-menu.md-menu-content-bottom-start.md-menu-content-small.md-menu-content.md-theme-default > div > ul > li:nth-child(2) > button'
    );
    await lastedited.click();
    let ok = await driver.$('.md-button.md-primary.md-theme-default > div > div');
    await ok.click();
    await driver.pause(1500);
  },
  // check whether the tasks include the task we expect to be displayed, finish if found
  isTheTaskDisplayed: async function(taskname) {
    let tasksArray = await driver.$$('.col-xl-12 > li >a:nth-child(3)> h2');
    let length = (tasksArray.length)-1;
    for (var i =0; i<=length; i++) {
      let name = await tasksArray[i].getText();
      var isSubstring = await name.includes(taskname);
      if (isSubstring==true) {
        break;
      }
    }
    return isSubstring;
  },
  verify: async function(taskname) {
    await this.gotoTasks();
    await this.sortHometasksLastEditedFirst();
    let isTheTaskDisplayed = await this.isTheTaskDisplayed(taskname);
    await expect(isTheTaskDisplayed).to.be.true;
  },
  checkWithPupil: async function() {
    await helpers.loadPage(courseData.urlCourses, 20);
    await copyCourse.chooseCourse();
    let courseTasks = await driver.$(
      '#main-content > section > div.course-card > div.tabContainer > div > button:nth-child(2) > span'
    );
    await courseTasks.click();
  },
  // set a tick to a checkbox
  privateHometask: async function(taskname) {
    await this.basicHomework(taskname);
    let isPrivate = await driver.$(
      '#homework-form > div:nth-child(10) > label:nth-child(1) > input[type=checkbox]'
    );
    await isPrivate.click();
    await this.clickAdd();
  },
  privateTaskVerify: async function(taskname) {

    let allTaskNames = await Promise.all(
      (await driver.$$('#homeworks > ol > div > li > a')).map(
        async element => await element.getText()
      )
    );
    await expect(allTaskNames).not.to.include(taskname);
  },
  
  pupilEditsTextHomework: async function() {
    let pass = "Schulcloud1!";
    let name = "paula.meyer@schul-cloud.org";
    await firstLogin.logout();
    await firstLogin.pupilLogin(name, pass);
    await firstLogin.firstLoginPupilFullAge(name, pass);
    was_submitted_by = await firstLogin.getNameAndPosition();
    await helpers.loadPage(courseData.urlCourses, 20);
    await copyCourse.chooseCourse();
    let tasks = await driver.$(Login.elem.tasks_tab);
    await tasks.click();

    let task = await driver.$('#homeworks > ol > div > li:nth-child(1)');
    await task.click();
    let editBookmark = await driver.$('#submission-tab-link');
    await editBookmark.click();
    await driver.switchToFrame(0);
    let iframeBody = await driver.$('body');
    let assignmentText = 'here is some text which I want to submit';
    await iframeBody.setValue(assignmentText);
    await driver.switchToParentFrame();
    let ok = await driver.$('#submission > div.comment.editor > form > button');
    await ok.click();
  },
  teacherCanSeeTheTextSubmission: async function() {
    await firstLogin.logout();
    await teacherLogin.performLogin(
      Login.defaultTeacherUsername,
      Login.defaultTeacherpassword
    );
    await firstLogin.firstLoginTeacher();
    await helpers.loadPage(courseData.urlCourses, 20);
    await copyCourse.chooseCourse();
    let tasks = await driver.$(Login.elem.tasks_tab);
    await tasks.click();
    let homework = await driver.$('#homeworks > ol > div > li');
    await homework.click();
    let submissions_tab = await driver.$('#submissions-tab-link');
    await submissions_tab.click();
    
    let submitted_by_box = await driver.$('#submissions .groupNames > span');
    let submitted_by_name = await submitted_by_box.getText();
    await expect(was_submitted_by).to.contain(submitted_by_name);
  },
  evaluateSubmission: async function() {
    let submittedTasks = await driver.$('.usersubmission');
    await submittedTasks.click();
    let evaluationTab = await driver.$('#comment-tab-link');
    await evaluationTab.click();
    let evaluation = await driver.$(courseData.elem.evaluationInProcent);
    await evaluation.setValue(95);
    await driver.switchToFrame(0); 
    let body = await driver.$('body');
    let comment = 'sehr gut!';
    await body.setValue(comment);
    await driver.switchToParentFrame();
  }
};
