'use strict';
let administration = require('../page-objects/administration');
let pupilLogin = require('../page-objects/pupilLogin');
let firstLogin = require('../page-objects/firstLogin');
let loginData = require('../shared-objects/loginData');
let performLogin = require('../page-objects/performLogin');
let shared = ({loginData, performLogin});
const Login = require('../shared-objects/loginData');
let teacherLogin = require('../page-objects/teacherLogin');


Given(/^teacher has come to schul-cloud home page$/, function () {
    return helpers.loadPage(shared.loginData.url, 10);
});
Given(/^teacher has logged in$/, function () {
    return teacherLogin.performLogin(Login.defaultTeacherUsername, Login.defaultTeacherpassword);
});
// User is under 14
When(/^teacher has created a user with (.*), (.*), (.*) without submitting the age$/, function (firstnameSTUDENT, lastnameSTUDENT, emailSTUDENT) {

    return administration.createNewPupil(firstnameSTUDENT, lastnameSTUDENT, emailSTUDENT)
});
When(/^teacher chooses the student with (.*) from the table$/, function (emailSTUDENT) {
    return firstLogin.chooseAPupilFromTheTable(emailSTUDENT);
});

When(/^teacher has created a link for this student$/, function () {
    return firstLogin.generateLink();
});
When(/^user navigates a Link$/, function () {
    return firstLogin.openTheLink();
});
When(/^user should choose that the user is under 16$/, function () {
    return firstLogin.submitThatTheUserIsUnder16();
});
When(/^user should submit the birthday information$/, function () {
    let student_age = 13;
    return firstLogin.parentsSetStudentsAge(student_age);
});
Then(/^parents of the student should submit their (.*), (.*), (.*) and submit a consent$/, function (firstnamePARENT, lastnamePARENT, emailPARENT) {
    return firstLogin.parentsSetTheirData(firstnamePARENT, lastnamePARENT, emailPARENT);
});
Then(/^parents should submit a code from the email (.*) generated by the system$/, function (emailPARENT) {
    return firstLogin.parentsSetPin(emailPARENT);
});
Then(/^parents press login button$/, function () {
    return helpers.loadPage(shared.loginData.logout, 10);
});
Then(/^user can log in with the data which was set by the parents$/, function () {
    return firstLogin.studentLogsIn();
});
// USER IS BETWEEN 14 and 16
      
When(/^teacher has created a User with (.*), (.*), (.*) without submitting the age$/, function (firstnameSTUDENT, lastnameSTUDENT, emailSTUDENT) {

    return administration.createNewPupil(firstnameSTUDENT, lastnameSTUDENT, emailSTUDENT)
});
When(/^teacher chooses the Student with (.*) from the table$/, function (emailSTUDENT) {
    return firstLogin.chooseAPupilFromTheTable(emailSTUDENT);
});

When(/^teacher has created a link for this Student$/, function () {
    return firstLogin.generateLink();
});
When(/^User navigates a Link$/, function () {
    return firstLogin.openTheLink();
});
When(/^User should choose that the user is under 16$/, function () {
    return firstLogin.submitThatTheUserIsUnder16();
});
When(/^User should submit the birthday information$/, function () {
    let student_age = 13;
    return firstLogin.parentsSetStudentsAge(student_age);
});
Then(/^Parents of the student should submit their (.*), (.*), (.*) and student submits a consent$/, function (firstnamePARENT, lastnamePARENT, emailPARENT) {
    return firstLogin.parentsSetTheirData(firstnamePARENT, lastnamePARENT, emailPARENT);
});
Then(/^Parents should submit a code from the email (.*) generated by the system$/, function (emailPARENT) {
    return firstLogin.parentsSetPin(emailPARENT);
});
Then(/^Parents press login button$/, function () {
    return helpers.loadPage(shared.loginData.logout, 10);
});
Then(/^User can log in with the data which was set by the parents$/, function () {
    return firstLogin.studentLogsIn();
});
