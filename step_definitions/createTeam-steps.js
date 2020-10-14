'use strict';


const { expect } = require('chai');
const { Then } = require('cucumber');
const newPupil = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage');
const TMSAddEditTeamPage = require('../page-objects/pages/teamsPages/TMSAddEditTeamPage.js');
const TMSTeamListPage = require('../page-objects/pages/teamsPages/TMSTeamListPage.js');
const TMSTeamMembersPage = require('../page-objects/pages/teamsPages/TMSTeamMembersPage.js');
let teamName;
const teacher = "Cord Carl"
const student1 = 'Marla Mathe';
const student2 = 'Waldemar Wunderlich';


When(/^.*adds a new student with (.*), (.*), (.*)$/, function (firstname1, lastname1, email1) {
    fullname1 = firstname1 + " " + lastname1;
    return newPupil.createNewPupil(firstname1, lastname1, email1);
});
When(/^.*adds one more student with (.*), (.*), (.*)$/, function (firstname2, lastname2, email2) {

    return newPupil.createNewPupil(firstname2, lastname2, email2);
});

When(/^.*creates a new team with (.*) and color orange$/, function (teamname) {
    teamName = teamname;
    return TMSAddEditTeamPage.createTeamAndGoToSettings(teamName);
});
When(/^.*adds a student to team with lastname (.*) and firstname (.*)$/, async function (lastname, firstname) {
    await TMSTeamMembersPage.addTeamMember(lastname, firstname);
});

When(/^.*clicks submit add team member button$/, async function () {
	await TMSTeamMembersPage.clickSubmitAddTeamMember();
	await driver.pause(1500);
});

Then(/^.*team should be displayed on the team page$/, async function () {
    let teamNames = await TMSTeamListPage.getTeamNames();
    return expect(teamNames).to.include(teamName);
});

Then(/^.*team should be displayed with the correct color$/, async function(){
    let colorIsOrange = await TMSTeamListPage.getTeamColor();
    return expect(colorIsOrange).to.be.true;
});

Then(/^the correct number of students in the team should be displayed$/, async function(){
    let numberIsCorrect = await TMSTeamListPage.getTeamMemberIcon(teamName);
    return expect(numberIsCorrect).to.be.true;
});

Then(/^by clicking the students icon the popup opens and shows all team members with surname and lastname$/, async function(){
    return TMSTeamListPage.openMemberIcon();
});

