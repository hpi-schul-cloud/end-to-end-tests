'use strict';

const teamData = require('../shared-objects/teamsData');
const { expect } = require('chai');
let numberOFmatches;
let pupilNames;

const chosenSearchableSelectHelper = (driver, selectSelector) => ({
    getAvailableOptions: async () => {
        const options = await driver.$$(`${selectSelector} > option`);
        return Promise.all(options.map(async opt => {
            return {
                text: (await opt.getHTML(false)).trim(),
                value: await opt.getAttribute("value")
            }
        }))
    },
    selectOptionByName: async (name) => {
        // TODO search by full name (including spaces) => remove split()
        const searchName = name.split(" ")[0]
        const container = await driver.$(`${selectSelector} + .chosen-container`);
        const searchInput = await container.$(".chosen-search-input");
        await searchInput.setValue(searchName);
        const searchResult = await container.$(`.chosen-results .active-result.highlighted`)
        await searchResult.click();
    }
})

module.exports = {
    goToTeams: async function() {
        let url = teamData.url;
        await helpers.loadPage(url, 20);
    },
    addTeam: async function() {
        let url = teamData.addTeamURL;
        await helpers.loadPage(url, 20);
        await driver.pause(2000);
    },
    setTeamName: async function(name) {
        let nameField = await driver.$(teamData.teamName);
        await nameField.setValue(name);
    },
    confirmTeamCreate: async function() {
        let confirmBtnContainer = await driver.$('.section-course');
        let confirmBtn = await confirmBtnContainer.$('button[type="submit"]');
        await confirmBtn.click();
    },
    //create Team with a certain name:
    createTeamSteps: async function(name) {
        await this.addTeam();
        await this.setTeamName(name);
        await this.confirmTeamCreate();     
    },
    clickSettings: async function() {
        let settingsBtn = await driver.$(teamData.teamSettings);
        await settingsBtn.click();
    },
    clickAdministrateTeammembers: async function() {
        let administrateBtn = await driver.$(teamData.administrateTeamMembers);
        await administrateBtn.click();
    },
    clickAddInternamMembers: async function() {
       let addBtn =  await driver.$(teamData.addInternamMembers);
       await addBtn.click();
       await driver.pause(1500);
    },
    // function that should be called once (steps in browser):
    createTeamAndGoToSettings: async function(teamname) {
        await this.createTeamSteps(teamname);
        await this.clickSettings();
        await this.clickAdministrateTeammembers();
        await this.clickAddInternamMembers();
    
    },
    chooseTeamMembersHelper: async function() {
        const helper = chosenSearchableSelectHelper(driver, '[data-testid="select_team_members_add"]');
        const options = await helper.getAvailableOptions();
        numberOFmatches = options.length;
        pupilNames = options.map(p => p.text);
    },
    addTeamMemberSTEPS: async function(fullname) {
        const helper = chosenSearchableSelectHelper(driver, '[data-testid="select_team_members_add"]');
        await helper.selectOptionByName(fullname);
    },
    // add members to the team: steps in browser
    addTeamMembersSteps: async function(fullname) {
        await this.chooseTeamMembersHelper();
        await this.addTeamMemberSTEPS(fullname);
    },

    submitAddTeammemberAfterAllMemebersWereAdded: async function() {
        let containerBtn = await driver.$('.modal.fade.add-member-modal.in');
        let submitBtn = await containerBtn.$('button[type="submit"]');
        await submitBtn.click();
    },
    addTwoTeamMemebers: async function(teammember1, teammember2) {
        await this.addTeamMembersSteps(teammember1);
        await this.addTeamMembersSteps(teammember2);
        await this.submitAddTeammemberAfterAllMemebersWereAdded();
        await driver.pause(1500);
    },  
    // assertion helper in steps:
    getTeamNames: async function() {
        let teamsPage = teamData.url;
        await helpers.loadPage(teamsPage, 20);
        let container = await driver.$('.row.tasks.card-deck-row');
        let elements = await container.$$('div');
        const namePromises = elements.map(async element => await element.getText());
        const teamNames = await Promise.all(namePromises);
        return teamNames;
    },
  
}
