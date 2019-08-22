'use strict';
let teacherLogin = require('../page-objects/teacherLogin');
const firstLogin = require('../shared_steps/firstLogin.js');
const homework = require('../page-objects/homework');
const { expect } = require('chai');
let name;
const Login = require('../shared-objects/loginData');

module.exports = {
  gotoNews: async function() {
    let newsTab = await driver.$(
      'body > aside > nav > ul > li:nth-child(6) > a > span'
    );
    await newsTab.click();
  },
  createNews: async function() {
    let createNewsBtn = await driver.$('#main-content > div.route-news > a');
    await createNewsBtn.click();
    let nameField = await driver.$('#news-form > div:nth-child(3) > input');
    name = 'Title&Name';
    let bodytext = 'Here are some announcements for my pupuils';
    await nameField.setValue(name);
    await driver.pause(2000);
    await driver.switchToFrame(0);
    await driver.pause(300);

    let body = await driver.$('body');
    await body.setValue(bodytext);
    await driver.switchToParentFrame();
    await driver.pause(300);
  },
  performCreateNews: async function() {
    await firstLogin.firstLoginTeacher();
    await this.gotoNews();
    await this.createNews();
    let add = await driver.$(Login.elem.submitNewsBtn);
    await add.click();
  },
  performCreateNewsLater: async function() {
    await firstLogin.firstLoginTeacher();
    await this.gotoNews();
    await this.createNews();
    let dateBox = await driver.$(Login.elem.timeNewsMustBePublished);
    await dateBox.click();
    let date = "22.08.2025 16:44"
    await dateBox.addValue(date);
    await driver.pause(2000);
    let add = await driver.$(Login.elem.submitNewsBtn);
    await add.click();


  },
  loginAsPupil: async function() {
    let name= "paula.meyer@schul-cloud.org";
    let pass= "Schulcloud1!";
    await firstLogin.logout();
    await firstLogin.pupilLogin(name,pass);
    await firstLogin.firstLoginPupilFullAge(name, pass);
  },
  
  verifyWhetherVisible: async function() {
    const elements = await driver.$$(
      '#main-content > div.route-news > div > section > div > div > div > article > div.sc-card-header > span > div > span'
    );
    const namePromises = elements.map(async element => await element.getText());
    const newsNames = await Promise.all(namePromises);
    return newsNames;

  },
  ShouldBeVisible: async function() {
    let newsNames = await this.verifyWhetherVisible();
    await expect(newsNames).to.include(name);
  },
  ShouldNotBeVisible: async function() {
    let newsNames = await this.verifyWhetherVisible();
    await expect(newsNames).to.not.include(name);
  },

};
