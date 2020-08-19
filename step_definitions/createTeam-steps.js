'use strict';


const newPupil = require('../page-objects/administration');
const TMSAddEditTeamPage = require('../page-objects/pages/teamsPages/TMSAddEditTeamPage.js');
const TMSTeamListPage = require('../page-objects/pages/teamsPages/TMSTeamListPage.js');
const TMSTeamMembersPage = require('../page-objects/pages/teamsPages/TMSTeamMembersPage.js');
let teamName;
const student1 = 'Marla Mathe';
const student2 = 'Waldemar Wunderlich';


When(/^teacher adds a new student with (.*), (.*), (.*)$/, function (firstname1, lastname1, email1) {
    fullname1 = firstname1 + " " + lastname1;
    return newPupil.createNewPupil(firstname1, lastname1, email1);
});
When(/^teacher adds one more student with (.*), (.*), (.*)$/, function (firstname2, lastname2, email2) {
    fullname2 = firstname2 + " " + lastname2;
    return newPupil.createNewPupil(firstname2, lastname2, email2);
});

When(/^teacher creates a new team with (.*) and$/, function (teamname) {
    teamName = teamname;
    return TMSAddEditTeamPage.createTeamAndGoToSettings(teamname);
});
When(/^teacher adds two students to this team$/, function () {
    return TMSTeamMembersPage.addTwoTeamMemebers(student1, student2)
});

Then(/^this team should be displayed on the team page$/, async function () {
    let teamNames = await TMSTeamListPage.getTeamNames();
    await expect(teamNames).to.include(teamName);
});
