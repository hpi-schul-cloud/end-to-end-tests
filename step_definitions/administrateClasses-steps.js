'use strict';

let classes = require('../page-objects/administrateClasses');
let administration = require('../page-objects/administration');
let loginData = require('../shared-objects/loginData');
let teacherLogin = require('../page-objects/teacherLogin');

Given(/^teacher arrived on the Schul-Cloud page and$/, function() {
    let url = loginData.url;
    return helpers.loadPage(url, 10);
});
Given(/^teacher is logged in and$/, function() {
    return teacherLogin.performLogin(loginData.defaultTeacherUsername, loginData.defaultTeacherpassword);
});

When(/^teacher creates a student with (.*), (.*), (.*) and$/, function(firstname, lastname, email) {
    return administration.createNewPupil(firstname, lastname, email);
});
When(/^teacher goes to administration$/, function() {
    return administration.goToAdministration();
});

When(/^teacher creates a class, chooses a year and class (.*)$/, function(classSuffix) {
    return classes.createAnewClass(classSuffix);
});
When(/^teacher adds student with (.*), (.*) to this class$/, function(firstname, lastname) {
    return classes.addStudentToTheClass(firstname, lastname);
});
Then(/^teacher should see the created class (.*)$/,async function(classSuffix) {
    let classname = "1"+classSuffix;
    let names = await classes.getAllClassNames();
    await expect(names).to.include(classname);

});
