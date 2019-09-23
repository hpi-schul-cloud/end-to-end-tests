'use strict';
let administration = require('../page-objects/administration');
const firstLogin = require('../shared_steps/firstLogin.js');
const teams = require('../page-objects/createTeam');
const { expect } = require('chai');
let newsName1 = "News for Team A";
let newsName2 = "News for Team B";
let length;
const Login = require('../shared-objects/loginData');
const team = require('../shared-objects/teamsData');
let index=[];
const Admin = require('../shared-objects/administrationData');

// User Data:
let firstnameONE = "Team A";
let firstnameTWO = "Team B";
let lastnameONE = "A";
let lastnameTWO = "B";
let fullnameONE = firstnameONE + " " + lastnameONE;
let fullnameTWO = firstnameTWO + " " + lastnameTWO;
let emailONE= "ateam@schul-cloud.org";
let emailTWO = "bteam@schul-cloud.org";
let team_name_one = "A-team";
let team_name_two = "B-team";
let oldPassword;
let oldPassword1;
let oldPassword2;

module.exports = {
  gotoNews: async function() {
    let url = "http://localhost:3100/news/";
    await helpers.loadPage(url, 100);
  
  },
  createNewNews: async function() {
    let url = "http://localhost:3100/news/new";
    await helpers.loadPage(url, 100);
  },
  gotoTeams: async function() {
    let url = "http://localhost:3100/teams/";
    await helpers.loadPage(url, 100);
},
  createNews: async function(name) {
    let nameField = await driver.$('#news_title_id');
    let bodytext = 'Here are some announcements for my pupuils';
    await nameField.waitForExist(10000);
    await nameField.setValue(name);
    await driver.pause(2000);
    await driver.switchToFrame(0);
    await driver.pause(300);
    let body = await driver.$('body');
    await body.setValue(bodytext);
    await driver.switchToParentFrame();
    await driver.pause(300);
    let add = await driver.$(Login.elem.submitNewsBtn);
    await add.click();
    await driver.pause(500);
  },
  performCreateNews: async function(newsName) {
    //await firstLogin.firstLoginTeacher();
    await this.gotoNews();
    await this.createNewNews();
    await this.createNews(newsName);
  },
  executeScript: async function() {
    await driver.execute('document.querySelector("#news_date_to_be_displayed").value = "13.08.2020"');
  },
  performCreateNewsLater: async function(name) {
   // await firstLogin.firstLoginTeacher();
    await this.gotoNews();
    await driver.pause(1000);
    await this.createNewNews();
    await driver.pause(1000);
    let nameField = await driver.$('#news_title_id');
    let bodytext = 'Here are some announcements for my pupuils';
    await nameField.waitForExist(1000);
    await nameField.setValue(name);
    await driver.pause(2000);
    await this.executeScript();
    await driver.switchToFrame(0);
    await driver.pause(300);
    let body = await driver.$('body');
    await body.setValue(bodytext);
    await driver.switchToParentFrame();
    await driver.pause(300);
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
  shouldBeVisible: async function(name) {

    let newsNames = await this.verifyWhetherVisible();
    await expect(newsNames).to.include(name);
  },
  shouldNotBeVisible: async function(name) {
    let newsNames = await this.verifyWhetherVisible();
    await expect(newsNames).to.not.include(name);
  },
  createTeam: async function(firstname, lastname, email, team_name, fullname) {
    await administration.createNewPupil(firstname, lastname, email);
    await this.submitConsent(email);
    await teams.createATeamSTEPS(team_name);
    await teams.addMembersToTheTeamSTEPS();
    await teams.addTeamMemberSTEPS(fullname);
  },
  createTwoTeams: async function() {
    await this.createTeam(firstnameONE, lastnameONE, emailONE, team_name_one, fullnameONE);
    oldPassword1 =oldPassword;
    await teams.addTeamMemberOne();
    await this.gotoTeams();
    await this.createTeamNewsForTeam(team_name_one);
    await this.createTeamNewsForTeamONE();
    await driver.pause(1000);
    await this.createTeam(firstnameTWO, lastnameTWO, emailTWO, team_name_two, fullnameTWO);
    oldPassword2 = oldPassword;
    await teams.addTeamMemberTwo();
    await this.gotoTeams();
    await this.createTeamNewsForTeam(team_name_two);
    await this.createTeamNewsForTeamTWO();
    await driver.pause(1000);
  },
  createTeamNewsForTeam: async function(team_name) {
    let teamElementsArray = await driver.$$('#main-content > section > section > div > div > div');
    for (var i=0; i<=teamElementsArray.length-1; i++) {
      let nameContainer = await driver.$('#main-content > section > section > div > div > div:nth-child('+(i+1)+') > article > div.sc-card-header > span > div > span');
      let name_of_the_team = await nameContainer.getText();
      await driver.pause(1000);
      if (name_of_the_team == team_name) {
        await index.push(i+1)
      }
    }
  },
  createTeamNewsForTeamONE: async function() {
      let teamone = await driver.$('#main-content > section > section > div > div > div:nth-child('+index[0]+') > article > div');
      await teamone.click();
      await this.gotoTeamNews();
      await this.createNews(newsName1);
  },
    createTeamNewsForTeamTWO: async function() {
      let teamone = await driver.$('#main-content > section > section > div > div > div:nth-child('+index[1]+') > article > div');
      await teamone.click();
      await this.gotoTeamNews();
      await this.createNews(newsName2);
      
    },
    gotoTeamNews: async function() {
      let newsTab = await driver.$('#js-news > span');
      await newsTab.click();
      let btn = await driver.$(team.submitBtn);
      await btn.click();
    },
  createTeamNewsSTEPS: async function() {
    let newsTab = await driver.$(team.newsTab);
    await newsTab.click();
    let newsBtn = await driver.$(team.submitBtn);
    await newsBtn.click();
    await this.createNews();
  },
  submitConsent: async function(e_mail) {
    let names = await driver.$$(Admin.namesContainer + ' > tr');
    length = names.length; 
    for (var i = 1; i<= length; i++) {
        let pupil = await driver.$(Admin.namesContainer + ' > tr:nth-child('+i+')');
        let emailPromise =  await driver.$(Admin.namesContainer + ' > tr:nth-child('+i+') > td:nth-child(3)');
        let email = await emailPromise.getText();
        if (email===e_mail){
            let boxConsent = await driver.$(Admin.namesContainer + ' > tr:nth-child('+i+') > td:nth-child(7) > a:nth-child(2) > i');
            await boxConsent.click();
            let submitBtn = await driver.$(Admin.consentSubmitBtn);
            let passwordField = await driver.$('#passwd');
            let password_old = await passwordField.getValue();
            oldPassword = password_old;
            await submitBtn.click();
            break;
        }
    }
  },
  canTeamMemberSeeTheNews: async function() {
    let email = emailTWO;
    let name = email; 
    let password = "Schulcloud1!";
    await firstLogin.logout();
    await firstLogin.pupilLogin(email, oldPassword2);
    await firstLogin.firstLoginPupilFullAge(name, password);
    await this.gotoNews();
    await this.shouldBeVisible(newsName2)
  },
  canNonTeamMemberSeeTheNews: async function() {
    await this.gotoNews();
    await this.shouldNotBeVisible(newsName1)
  },
}



