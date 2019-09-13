'use strict';

let loginData = require('../shared-objects/loginData');
const createTeam = require('../page-objects/createTeam');
let teacherLogin = require('../page-objects/teacherLogin');
let newPupil = require('../page-objects/administration');
const Login = require('../shared-objects/loginData');
let fullname;


Given(/^the teacher starts on the login page and$/, function() {
    let url = loginData.url;
    return helpers.loadPage(url, 10);
  });
Given(/^teacher successfully logs in and$/, function() {
    return teacherLogin.performLogin(Login.deafultTeacherUsername,Login.defaultTeacherpassword);
  });
Given(/^the teacher creates a new pupil$/, function() {
    let firstname = "New";
    let lastname= "Team Member";
    fullname = firstname+" "+ lastname;
    let email = "newTeamMember@schul-cloud.org";
    return newPupil.createNewPupil(firstname, lastname, email);
  });
When(/^teacher creates a new team$/, function() {
    return createTeam.createATeam(fullname);
  });
Then(/^this team should be displayed on the team page$/, function() {
    return createTeam.verify();
  });
