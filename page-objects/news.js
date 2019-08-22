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
    let whenItMustBeShown = await driver.$(
      '#news-form > div:nth-child(5) > input'
    );
    let date = new Date(2019, 8);
    let time = await homework.dateToString(date);
    await driver.pause(300);
    //await whenItMustBeShown.setValue(time);
    await driver.pause(300);
    let add = await driver.$(
      '#news-form > div.modal-footer > button.btn.btn-primary.btn-submit'
    );
    await add.click();
  },
  performCreateNews: async function() {
    await firstLogin.firstLoginTeacher();
    await this.gotoNews();
    await this.createNews();
  },
  loginAsPupil: async function() {
    let name= "@newsIsNotVisible";
    let pass= "Schulcloud1!";
    await firstLogin.logout();
    await firstLogin.pupilLogin();
    await firstLogin.firstLoginPupilFullAge(name, pass);
  },
  verifyWhetherVisible: async function() {
    const elements = await driver.$$(
      '#main-content > div.route-news > div > section > div > div > div > article > div.sc-card-header > span > div > span'
    );
    const namePromises = elements.map(async element => await element.getText());
    const newsNames = await Promise.all(namePromises);
    await expect(newsNames).to.include(name);
  }
};
