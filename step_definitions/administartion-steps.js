'use strict';

let addPupilToTheCourse = require('../page-objects/addPupilToTheCourse');
let administration = require('../page-objects/administration');
let teacherLogin = require('../page-objects/teacherLogin');
let copyCourse = require('../page-objects/copyCourse');
let loginData = require('../shared-objects/loginData');
let courseData = require('../shared-objects/courseData');
let shared = { loginData };


Given(/^admin arrives on the Schul-Cloud login homepage$/, function() {
    let url = loginData.url;
    return helpers.loadPage(url, 10);
  });
Given(/^this admin logs in successfully$/, function() {
    return teacherLogin.performLogin(
        loginData.defaultTeacherUsername,
        loginData.defaultTeacherpassword
    );});

When(/^an admin puts in (.*) and (.*) and (.*) of the new pupil$/, function(firstname, secondname, email) {
        return administration.createNewPupil(firstname, secondname, email)
});
Then(/^the admin should see new pupil with email (.*) among his pupils$/, function(email) {
    return administration.verify(email);
  });
  Then(/^the teacher can manually submit a consent (.*)$/, function(e_mail) {
    return administration.submitConsent(e_mail);
  });
 Then(/^new pupil can log in$/, function() {
    return administration.newPupilLogsIn() ;
  });
  Then(/^new pupil accepts data protection policy and sets new password for the profile$/, function() {

    return administration.pupilAcceptsDataProtection();
  });



