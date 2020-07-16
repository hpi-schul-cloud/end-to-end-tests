'use strict';

let loginData = require('../shared-objects/loginData');
const createTeam = require('../page-objects/createTeam');
let teacherLogin = require('../page-objects/teacherLogin');
let newPupil = require('../page-objects/administration');
const Login = require('../shared-objects/loginData');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
let fullname1;
let fullname2;
let teamName;



Given(/^the teacher started on the login page and$/, function() {
    let url = loginData.url;
    return elementHelpers.loadPage(url, 10);
  });
Given(/^teacher successfully logged in$/, function() {
    return teacherLogin.performLogin(Login.defaultTeacherUsername,Login.defaultTeacherpassword);
  });
  When(/^teacher adds a new student with (.*), (.*), (.*)$/,  function(firstname1, lastname1, email1) {
    fullname1 = firstname1+" "+lastname1;
    return newPupil.createNewPupil(firstname1, lastname1, email1);
  });
  When(/^teacher adds one more student with (.*), (.*), (.*)$/,  function(firstname2, lastname2, email2) {
    fullname2 = firstname2+" "+lastname2;
    return newPupil.createNewPupil(firstname2, lastname2, email2);
  });

  When(/^teacher creates a new team with (.*) and$/,  function(teamname) {
    teamName = teamname;
    return createTeam.createTeamAndGoToSettings(teamname);
  });
When(/^teacher adds two students to this team$/, function() {
  return createTeam.addTwoTeamMemebers(fullname1, fullname2)

  });

Then(/^this team should be displayed on the team page$/, async function() {
    let teamNames = await createTeam.getTeamNames();
    await expect(teamNames).to.include(teamName);
  });
