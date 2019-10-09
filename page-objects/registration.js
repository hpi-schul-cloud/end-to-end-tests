'use strict';

const loginData = require('../shared-objects/loginData'),
  imageCompare = require('../runtime/imageCompare'),
  shared = { loginData };
const firstLogin = require('../shared_steps/firstLogin.js');
let generatedURL;

module.exports = {
    generateLink: async function() {
        let generateBtn = await driver.$('button[data-testid="generate_a_link"]');
        await generateBtn.click();
        await driver.pause(1500);
        let invitationField = await driver.$('#invitation-link');
        generatedURL = await invitationField.getValue();
    },
    openTheLink: async function() {
       await helpers.loadPage(generatedURL, 10);
    },
    // step 1.1, choose whether over or under 16:
    submitThatTheUserIsUnder16: async function() {
        let under16 = await driber.$('#reg-u16');
        await under16.click();
        let continueBtn = await driver.$('#showRegistrationForm');
        await continueBtn.click();
        let nameField= await driver.$('input[name="firstName"]');
        await nameField.waitForDisplayed(3000);
    },
    submitThatTheUserIsOver16: async function() {
        let over16 = await driber.$('#reg-16');
        await over16.click();
        let continueBtn = await driver.$('#showRegistrationForm');
        await continueBtn.click();
        let nameField= await driver.$('input[name="firstName"]');
        await nameField.waitForDisplayed(3000);
    },
    // step 1.2, if parents have to submit a consent
    parentsSetStudentsAge: async function(student_age) {
        await this.setAge(student_age);
        let continueBtn = await driver.$('#nextSection');
        await continueBtn.click();
    },
    setParentConsentHelper: async function() {
        let checkbox1 = await driver.$('input[name="parent_parentalAuthConsent"]');
        let checkbox2 = await driver.$('input[name="parent_privacyConsent"]');
        let checkbox3 = await driver.$('input[name="parent_termsOfUseConsent"]');
        await checkbox1.click();
        await checkbox2.click();
        await checkbox3.click();
    },
    parentsSetTheirData: async function() {
        let email = "parents@schul-cloud.org";
        let name = "Parent Firstname";
        let lastname = "Parent Lastname";
        let nameField= await driver.$('input[name="parent_firstName"]');
        await nameField.setValue(name);
        let lastnameField = await driver.$('input[name="parent_lastName"]');
        await lastnameField.setValue(lastname);
        let emailField = await driver.$('input[name="parent_email"]');
        await emailField.setValue(email);
        let continueBtn = await driver.$('#nextSection');
        await continueBtn.click();
        let checkbox1 = await driver.$('input[name="parent_parentalAuthConsent"]');
        await checkbox1.waitForDisplayed(3000);
        // now consent checkboxes:
        await this.setParentConsentHelper();
        let continueBtn = await driver.$('#nextSection');
        await continueBtn.click();
    },
    // helpers for birthday data set
    generateTodayDate: async function() {
        var today = await new Date();
        var dd = await String(today.getDate()).padStart(2, '0');
        var mm = await String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = await today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        return today;

    },
    generateBirthdayDataByAge: async function(age) {
        let today = await this.generateTodayDate();
        let startYear = await today.substring(4,7);
        let yearToBeSet = startYear - age;
        let dd = await today.substring(0,1);
        let mm = await today.substring(2,3);
        let dateToBeSet = dd + '/' + mm + '/' + yearToBeSet;
        return dateToBeSet;
    },
    setAge: async function(age) {
        let value = await generateBirthdayDataByAge(age)
        await driver.execute(`document.querySelector("#create_birthday").value="${value}"`);

    },



}
