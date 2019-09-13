'use strict';


const teamData = require('../shared-objects/teamsData');
const { expect } = require('chai');
let name;
let indexes = [];

module.exports = {
    createATeam: async function(fullname) {
        let url = teamData.addTeamURL;
        await helpers.loadPage(url, 20);
        name= "a team";
        let nameField = await driver.$(teamData.teamName);
        await nameField.setValue(name);
        let createBtn = await driver.$(teamData.createTeamBtn);
        await createBtn.click();
        await this.addTeamMembers(fullname);
    },
    getTeamNames: async function() {
        let teamsPage = teamData.url;
        await helpers.loadPage(teamsPage, 20);
        let elements = await driver.$$('#main-content > section > section > div > div div');
        const namePromises = elements.map(async element => await element.getText());
        const teamNames = await Promise.all(namePromises);
        return teamNames;
    },
    addTeamMembers: async function(fullname) {
        await driver.execute('document.querySelector("#team_settings").click()');
        await driver.$('#team_settings').then(button=>button.click());
        await driver.execute('document.querySelector("#administrate_team_members").click()');
        await driver.execute('document.querySelector("#internal_team_members").click()');
        await driver.pause(2000);
        let container = await driver.$('#userIds___chosen > ul');
        const searchBox = await container.$('li > input');
        await searchBox.click();

        let arrayNumberOFmatches = await driver.$$(".chosen-results li");
        let numberOFmatches = arrayNumberOFmatches.length;
        let pupils = await driver.$$('#userIds___chosen > div > ul > li');
        let promiseNames = pupils.map(async element => await element.getText());
        const pupilNames = await Promise.all(promiseNames);
        for (var i=0; i<=numberOFmatches; i++) {
            if (pupilNames[i]=="Paula Meyer") {
                await indexes.push(i+1);
            }
            else if (pupilNames[i]==fullname) {
                await indexes.push(i+1);
            }
        }
        let chooseTeammember1 = await driver.$('#userIds___chosen > div > ul > li:nth-child('+indexes[0]+')');
        await chooseTeammember1.click();
        await searchBox.click();
        let chooseTeammember2 = await driver.$('#userIds___chosen > div > ul > li:nth-child('+indexes[1]+')');
        await chooseTeammember2.click();
      },
    verify: async function() {
        let url = teamData.url;
        await helpers.loadPage(url, 20);
        let names = await this.getTeamNames();
        await expect(names).to.include(name);
    }
}
