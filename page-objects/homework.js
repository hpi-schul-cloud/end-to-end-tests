'use strict';
const { CLIENT } = require("../shared-objects/servers");
const courseData = require('../shared-objects/courseData');
const { expect } = require('chai');
const Login = require('../shared-objects/loginData');
const copyCourse = require('../page-objects/copyCourse');
const firstLogin = require('../shared_steps/firstLogin.js');
let name;
let was_submitted_by; 

// TODO: choose course, SORT

module.exports = {
  // add homework related functions (as a teacher)
  clickCreateNewTaskInTheCourse: async function(coursename) {
    await this.chooseCourse(coursename)
    await driver.pause(2500);
    let homeworkSectionContainer = await driver.$('.tabContainer');
    let homeworkBtn = await homeworkSectionContainer.$('button[data-testid="hometasks"]');
    await homeworkBtn.click();
    //await driver.pause(2500);
    let selectorToBeLoaded2 = await driver.$('a[title="Aufgabe hinzufügen"]');
    await selectorToBeLoaded2.waitForDisplayed(3000);
    let addBtn = await driver.$('div.col-sm-12.add-button > a');
    await addBtn.click();
    let selectorToBeLoaded3 = await driver.$('#coursePicker');
    await selectorToBeLoaded3.waitForExist(2000);

  }, 
  setHometaskData: async function(taskname) {
    let nameField = await driver.$('#homework-form > div:nth-child(5) > input');
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
    let container = await driver.$('#homework-form');
    let addBtn = await container.$('button[type="submit"]');
    await addBtn.click();
    let selectorToBeLoaded = await driver.$('#homeworks');
    await selectorToBeLoaded.waitForExist(2000);
  },
  addPrivateHometask: async function(taskname) {
    await this.clickCreateNewTaskInTheCourse();
    await this.setHometaskData(taskname);
    let isPrivate = await driver.$(
      '#homework-form > div:nth-child(10) > label:nth-child(1) > input[type=checkbox]'
    );
    await isPrivate.click();
    await this.clickAdd();
  },

  // set deadline helpers

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
  gotoTasks: async function() {
    let url = `${CLIENT.URL}/homework/`;
    await helpers.loadPage(url, 100);
  },
  gotoTasksTab: async function() {
   let hometasksTab = await driver.$('button[data-testid="hometasks"]');
   await hometasksTab.click();
   let selectorToBeLoaded = await driver.$('.col-sm-12.container');
   await selectorToBeLoaded.waitForExist(3000); 
  }, 
  gotoCourses: async function() {
    let url = `${CLIENT.URL}/courses/`;
    await helpers.loadPage(url, 100);
  },
  sortHometasks: async function() {
    let sortBtn = await driver.$(
      '#filter > div > div.md-chip.md-theme-default.md-deletable.md-clickable > div'
    );
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
  returnTaskIndex: async function(taskname) {
    
    const containerWithTasks = await driver.$('.col-xl-12');
    await containerWithTasks.waitForExist(2000);
    let numOfElems = await containerWithTasks.$$('li');
    for (var i=1; i<=numOfElems.length-1; i++) {
      let nameOfTheTaskSelector = await driver.$('.col-xl-12 > li:nth-child('+i+') > a:nth-child(3) > h2' );
      let nameOfTheTask = await nameOfTheTaskSelector.getText();
      if(await nameOfTheTask.includes(taskname)) {
        return i;
      } 
    }
    return false;
  },
  chooseTaskAmongAllTasks: async function(taskname) {
    let taskindex = await this.returnTaskIndex(taskname);
    if(taskindex!=false) {
      let task = await driver.$('.col-xl-12 > li:nth-child('+taskindex+') > a:nth-child(3)> h2');
      await task.click();
      await driver.pause(1500);
      let selectorToBeLoaded = await driver.$('#page-title');
      await selectorToBeLoaded.waitForExist(2000);

    } else {
    console.log("No such task was found");
    await driver.close();
    }
  }, 
  chooseTasksAmongCourseTasks: async function() {
    let container = await driver.$('#homeworks .homework .row');
    let taskObjects = await container.$$('li');
    for (var i=1; i<=taskObjects.length-1; i++) {
      let container = await driver.$('#homeworks .homework .row');
      let nameSelector = await container.$('li:nth-child('+i+') > a > .dates > h5.title');
      let nameOfTask = await nameSelector.getText();
      if(taskname==nameOfTask) {

      }

    }


  },
 /* chooseCourse: async function(coursename) {
    const container = await driver.$('div[data-section="js-active"] div[data-testid="courses"] > div');
    let coursesObjects = await container.$$('div');
    for (var i=1; i<=coursesObjects.length-1; i++) {
      const container = await driver.$('div[data-section="js-active"] div[data-testid="courses"] > div');
      let nameOfCourseSelector = await container.$('div:nth-child('+i+') .title');
      let nameOfCourse = await nameOfCourseSelector.getText();
      if(nameOfCourse==coursename) {
        let theRightCourse = await container.$('div:nth-child('+i+') > article > div') ;
        await theRightCourse.click();
        break;
      }
    }
  },
  */
  chooseCourse: async function(coursename) {
    // div.sc-card-wrapper[data-id='id']
    const container = await driver.$('div[data-section="js-active"] div[data-testid="courses"] > div');
    let coursesObjects = await container.$$('div .title');
    let objectsPromises = coursesObjects.filter(async elem => {await elem.getText()==coursename;}); 
    let objects = await Promise.all(objectsPromises);
  },


  verify: async function(taskname) {
    await this.gotoTasks();
    await this.sortHometasks();
    await this.chooseTaskAmongAllTasks(taskname);
    let pageTitleSelector = await driver.$('#page-title');
    let courseAndTaskName = await pageTitleSelector.getText();
    let tasknameArray = await courseAndTaskName.split("- ");
    let taskName = tasknameArray[1];
    await expect(taskName).to.equal(taskname);
  },

  // other user logs in to verify 
  pupilLogsIn: async function(username, password) {
    await this.userLogsOut();
    await this.pupilLogin(username,password);
    await firstLogin.firstLoginPupilFullAge(username, password);
  },
  goToTasksOfTheCourse: async function (coursename, taskname) {
    await this.gotoCourses();
    await this.chooseCourse(coursename);
    await this.gotoTasksTab();
    await this.chooseTaskAmongAllTasks(taskname);
  },


  privateTaskVerify: async function() {
    let taskNames = await Promise.all(
      (await driver.$$('#homeworks > ol > div > li > a')).map(
        async element => await element.getText()
      )
    );
    await expect(allTaskNames).not.to.include(taskname);
  },
  pupilLogin: async function(username, password) {
    return firstLogin.pupilLogin(username,password);
  },
  userLogsOut: async function() {
    await helpers.loadPage(courseData.urlLogout, 20);
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
  },
  
  uploadAHomework: async function() {


  },
};
