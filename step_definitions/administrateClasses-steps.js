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

When(/^teacher creates a class, chooses a year (.*) and class name (.*)$/, function(grade, className) {
    return classes.createAnewClass(grade, className);
});
When(/^teacher adds student with (.*), (.*) to this class$/, function(firstname, lastname) {
    return classes.addStudentToTheClass(firstname, lastname);
});
Then(/^teacher should see the created class (.*) (.*)$/,async function(grade, className) {
    let gradeString = await grade.toString();
    let classname = gradeString+className;
    let names = await classes.getAllClassNames();
    await expect(names).to.include(classname);

});
// delete 
Then(/^teacher can delete the class (.*) (.*)$/, function(grade, className) {
    return classes.deleteClass(grade, className);
});
Then(/^teacher should not see the created class (.*)(.*)$/,async function(grade, className) {
    let gradeString = await grade.toString();
    let classname = gradeString+className;
    let names = await classes.getAllClassNames();
    await expect(names).not.to.include(classname);

});

// upgrade
Then(/^teacher can upgrade the class (.*) (.*)$/, function(grade, className) {
    return classes.upgradeClass(grade, className);
});
Then(/^teacher should see the upgraded class (.*) (.*) with diffrent school year$/, async function(grade, className) {
 await classes.verifyUpgradeClass(grade, className)
});
