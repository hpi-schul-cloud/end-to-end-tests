'use strict';

const teamData = require('../shared-objects/teamsData');
const { expect } = require('chai');
let team_name;
let indexes = [];
var searchBox;
var numberOFmatches;
let pupilNames;


module.exports = {
    createATeamSTEPS: async function(team_name) {
        let url = teamData.addTeamURL;
        await helpers.loadPage(url, 20);
        let nameField = await driver.$(teamData.teamName);
        await nameField.setValue(team_name);
        let createBtn = await driver.$(teamData.createTeamBtn);
        await createBtn.click();
    },
    addMembersToTheTeamSTEPS: async function() {
        await driver.execute(`document.querySelector('[data-testid="team_settings"]').click()`);
        await driver.$('[data-testid="team_settings"]').then(button=>button.click());
        await driver.execute(`document.querySelector('a[data-testid="administrate_team_members"]').click()`);
        await driver.execute(`document.querySelector('[data-testid="internal_team_members"]').click()`);
        await driver.pause(2000);
        let container = await driver.$('#userIds___chosen > ul');
        searchBox = await container.$('li > input');
        await searchBox.click();
        let arrayNumberOFmatches = await driver.$$(".chosen-results li");
        numberOFmatches = arrayNumberOFmatches.length;
        let pupils = await driver.$$('#userIds___chosen > div > ul > li');
        let promiseNames = pupils.map(async element => await element.getText());
        pupilNames = await Promise.all(promiseNames);
    },
    getTeamNames: async function() {
        let teamsPage = teamData.url;
        await helpers.loadPage(teamsPage, 20);
        let elements = await driver.$$('#main-content > section > section > div > div div');
        const namePromises = elements.map(async element => await element.getText());
        const teamNames = await Promise.all(namePromises);
        return teamNames;
    },
    addTeamMemberSTEPS: async function(fullname) {
        await searchBox.click();
        for (var i=0; i<=numberOFmatches-1; i++) {
            if (pupilNames[i]==fullname) {
                await indexes.push(i+1);
            }
        }
    },
    addTeamMemberOne: async function() {
        let chooseTeammember1 = await driver.$('#userIds___chosen > div > ul > li:nth-child('+indexes[0]+')');
        await chooseTeammember1.click();   
    },
    addTeamMemberTwo: async function() {
        let chooseTeammember1 = await driver.$('#userIds___chosen > div > ul > li:nth-child('+indexes[1]+')');
        await chooseTeammember1.click();
        let submitContainer = await driver.$('.add-member-modal');
        let submitBtn = await submitContainer.$('button[type="submit"]'); 
        await submitBtn.click();
    },
    createTeamWithTwoMembers: async function(nameOne, nameTwo) {
        team_name = "a team";
        await this.createATeamSTEPS(team_name);
        await this.addMembersToTheTeamSTEPS();
        await this.addTeamMemberSTEPS(nameOne);
        await this.addTeamMemberOne();
        await this.addTeamMemberSTEPS(nameTwo);
        await this.addTeamMemberTwo();
    },
    verify: async function() {
        let url = teamData.url;
        await helpers.loadPage(url, 20);
        let names = await this.getTeamNames();
        await expect(names).to.include(team_name);
    }
}
