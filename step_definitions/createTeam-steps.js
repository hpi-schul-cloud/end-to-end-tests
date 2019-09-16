'use strict';

let loginData = require('../shared-objects/loginData');
const createTeam = require('../page-objects/createTeam');
let teacherLogin = require('../page-objects/teacherLogin');
let newPupil = require('../page-objects/administration');
const Login = require('../shared-objects/loginData');
let fullname;
let ownPupil = "Paula Meyer"; // depends on teacher!


Given(/^the teacher starts on the login page and$/, function() {
    let url = loginData.url;
    return helpers.loadPage(url, 10);
  });
Given(/^teacher successfully logs in and$/, function() {
    return teacherLogin.performLogin(Login.defaultTeacherUsername,Login.defaultTeacherpassword);
  });
Given(/^the teacher creates a new pupil$/, function() {
    let firstname = "New";
    let lastname= "Team Member";
    let email = "newTeamMember@schul-cloud.org";
    fullname = firstname + " " + lastname;
    return newPupil.createNewPupil(firstname, lastname, email);
  });
When(/^teacher creates a new team$/, function() {
  let nameOne = fullname;
  let nameTwo = ownPupil;
  return createTeam.createTeamWithTwoMembers(nameOne, nameTwo)
  });
Then(/^this team should be displayed on the team page$/, function() {
    return createTeam.verify();
  });
