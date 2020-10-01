/*[url/teams/[teamId]/edit]*/
'use strict';
const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const loginPage = require('../generalPagesBeforeLogin/LoginPage');
const navigationTopPage = require('../NavigationTopPage');
const { CLIENT } = require("../../../shared-objects/servers");
const url = `${CLIENT.URL}/teams`;
const TMSTeamListPage = require('../../../page-objects/pages/teamsPages/TMSTeamListPage.js');
const TMSGeneralTeamPage = require('../../../page-objects/pages/teamsPages/TMSGeneralTeamPage.js');
const TMSTeamMembersPage = require('../../../page-objects/pages/teamsPages/TMSTeamMembersPage.js');
let newsName1 = "News for Team A";
let newsName2 = "News for Team B";
let length;
const teamNewsPage = require('../../../page-objects/pages/teamsPages/TMSTeamNewsPage');
let index = [];
const ADMNSTRTNAdministerStudentsPage = require('../../../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage');
const newsListPage = require('../../../page-objects/pages/NWSNewsListPage');

// User Data:
let firstnameONE = "Team A";
let firstnameTWO = "Team B";
let lastnameONE = "A";
let lastnameTWO = "B";
let fullnameONE = firstnameONE + " " + lastnameONE;
let fullnameTWO = firstnameTWO + " " + lastnameTWO;
let emailONE = "ateam@schul-cloud.org";
let emailTWO = "bteam@schul-cloud.org";
let team_name_one = "A-team";
let team_name_two = "B-team";
let oldPassword;
let oldPassword1;
let oldPassword2;

// input fields
const teamName = 'input[data-testid="team_name"]';
const teamDescription = 'textarea[data-testid="description_team"]';

// submit button
const createTeamBtn = 'button[data-testid="create_team_btn"]';


module.exports = {
    gotoTeams: async function () {
        // @Conversion to use a button or link within the Add/Edit mask
        return elementHelpers.loadPage(url, 100);
    },
    createTeam: async function (firstname, lastname, email, team_name, fullname) {
        await ADMNSTRTNAdministerStudentsPage.createNewPupil(firstname, lastname, email);
        await this.submitConsent(email);
        await teams.createATeamSTEPS(team_name);
        await teams.addMembersToTheTeamSTEPS();
        await teams.addTeamMemberSTEPS(fullname);
    },
    createTwoTeams: async function () {
        await this.createTeam(firstnameONE, lastnameONE, emailONE, team_name_one, fullnameONE);
        oldPassword1 = oldPassword;
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
    // function that should be called once (steps in browser):
    createTeamAndGoToSettings: async function (teamname) {
        await this.createTeamSteps(teamname);
        await TMSGeneralTeamPage.clickSettings();
        await TMSGeneralTeamPage.clickAdministrateTeamMembers();
        await TMSTeamMembersPage.clickAddInternalMembers();
    },
    // Steps to create Team with a certain name
    createTeamSteps: async function (name) {
        await TMSTeamListPage.goToAddTeam();
        await this.setTeamName(name);
        await this.clickOnCreateTeamButton();
    },
    // Set certain name in teamname field
    setTeamName: async function (name) {
        let nameField = await driver.$(teamName);
        await nameField.setValue(name);
    },
    clickOnCreateTeamButton: async function () {
        let confirmBtn = await driver.$(createTeamBtn);
        await confirmBtn.click();
    },
    createTeamNewsForTeam: async function (team_name) {
        let teamElementsArray = await driver.$$('#main-content > section > section > div > div > div');
        for (var i = 0; i <= teamElementsArray.length - 1; i++) {
            let nameContainer = await driver.$('#main-content > section > section > div > div > div:nth-child(' + (i + 1) + ') > article > div.sc-card-header > span > div > span');
            let name_of_the_team = await nameContainer.getText();
            await driver.pause(1000);
            if (name_of_the_team == team_name) {
                await index.push(i + 1)
            }
        }
    },
    createTeamNewsForTeamONE: async function () {
        let teamone = await driver.$('#main-content > section > section > div > div > div:nth-child(' + index[0] + ') > article > div');
        await teamone.click();
        await this.gotoTeamNews();
        await this.createNews(newsName1);
    },
    createTeamNewsForTeamTWO: async function () {
        let teamone = await driver.$('#main-content > section > section > div > div > div:nth-child(' + index[1] + ') > article > div');
        await teamone.click();
        await this.gotoTeamNews();
        await this.createNews(newsName2);
    },
    gotoTeamNews: async function () {
        let newsTab = await driver.$(teamNewsPage.newsTab);
        await newsTab.click();
        let btn = await driver.$(teamNewsPage.createNwsBtn);
        await btn.click();
    },
    createTeamNewsSTEPS: async function () {
        let newsTab = await driver.$(teamNewsPage.newsTab);
        await newsTab.click();
        let newsBtn = await driver.$(teamNewsPage.createNwsBtn);
        await newsBtn.click();
        await this.createNews();
    },
    submitConsent: async function (e_mail) {
        let names = await driver.$$(ADMNSTRTNAdministerStudentsPage.selectorNamesContainer + ' > tr');
        length = names.length;
        for (var i = 1; i <= length; i++) {
            let pupil = await driver.$(ADMNSTRTNAdministerStudentsPage.selectorNamesContainer + ' > tr:nth-child(' + i + ')');
            let emailPromise = await driver.$(ADMNSTRTNAdministerStudentsPage.selectorNamesContainer + ' > tr:nth-child(' + i + ') > td:nth-child(3)');
            let email = await emailPromise.getText();
            if (email === e_mail) {
                let boxConsent = await driver.$(ADMNSTRTNAdministerStudentsPage.selectorNamesContainer + ' > tr:nth-child(' + i + ') > td:nth-child(7) > a:nth-child(2) > i');
                await boxConsent.click();
                let submitBtn = await driver.$(ADMNSTRTNAdministerStudentsPage.selectorConsentSubmitBtn);
                let passwordField = await driver.$(ADMNSTRTNAdministerStudentsPage.passwordFieldSel);
                let password_old = await passwordField.getValue();
                oldPassword = password_old;
                await submitBtn.click();
                break;
            }
        }
    },
    studentLogInAndCheckIfSeeNews: async function () {
        let email = emailTWO;
        let name = email;
        let password = "Schulcloud1!";
        await navigationTopPage.clickLogout()
        await loginPage.performLogin(email, oldPassword2);
        await loginPage.firstLoginStudent(name, password);
        await newsListPage.goToNews();
        await newsListPage.isNewsVisible(newsName2)
    },
    isNewsNotVisible: async function () {
        await newsListPage.goToNews();
        await newsListPage.isNewsNotVisible(newsName1)
    },
}
