'use strict';

const loginData = require('../shared-objects/loginData');
const mailedPin = require('../page-objects/mailTestHelper');
let generatedURL;
let email;
let pin;

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
        let under16 = await driver.$('#reg-u16');
        await under16.click();
        let continueBtn = await driver.$('#showRegistrationForm');
        await continueBtn.click();
        let nameField= await driver.$('input[name="firstName"]');
        await nameField.waitForDisplayed(3000);
    },
    submitThatTheUserIsOver16: async function() {
        let over16 = await driver.$('#reg-16');
        await over16.click();
        let continueButton = await driver.$('#showRegistrationForm');
        await continueButton.click();
        let nameField= await driver.$('input[name="firstName"]');
        await nameField.waitForDisplayed(3000);
    },
    // step 1.2, if parents have to submit a consent
    parentsSetStudentsAge: async function(student_age) {
        await this.setAge(student_age);
        let firstname = "Students name";
        let lastname = "Students Last Name";
        let firstNameField = await driver.$('input[name="firstName"]');
        let lastNameField = await driver.$('input[name="lastName"]');
        await firstNameField.setValue(firstname);
        await lastNameField.setValue(lastname);
        let continueBtn = await driver.$('#nextSection');
        await continueBtn.click();
        let nextPageObject = await driver.$('[name="parent_firstName"]');
        await nextPageObject.waitForDisplayed(1000);
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
        email = "parents@schul-cloud.org";
        let name = "Parent Firstname";
        let lastname = "Parent Lastname";
        let nameField= await driver.$('input[name="parent_firstName"]');
        await nameField.setValue(name);
        let lastnameField = await driver.$('input[name="parent_lastName"]');
        await lastnameField.setValue(lastname);
        let emailField = await driver.$('input[name="parent_email"]');
        await emailField.setValue(email);
        let continueButton = await driver.$('#nextSection');
        await continueButton.click();
        let checkbox1 = await driver.$('input[name="parent_parentalAuthConsent"]');
        await checkbox1.waitForDisplayed(3000);
        // now consent checkboxes:
        await this.setParentConsentHelper();
        let continueBtn = await driver.$('#nextSection');
        await continueBtn.click();
        await driver.pause(2000);
    },
    // mailTestHelper gets the pin from the email
    getPin: async function() {
        pin = await mailedPin.getLastPin(email);
    },
    parentsSetPin: async function() {
        let pinField = await driver.$('input[name="pin"]');
        await pinField.setValue(pin);
        let continueBtn = await driver.$('#nextSection');
        await continueBtn.click();
        let recapMessage = await driver.$('.recap');
        await recapMessage.waitForDisplayed(1500);
    },
    parentsGoToLogin: async function() {
        let logout= "${CLIENT.URL}/logout";
        await helpers.loadPage(logout, 10);
        let dataInput = await driver.$('input[data-testid="username"]');
        await dataInput.waitForDisplayed(3000);
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
        let startYear = await today.substring(6,10);
        let yearToBeSet = startYear - age;
        let dd = await today.substring(0,2);
        let mm = await today.substring(3,5);
        let dateToBeSet = dd + '.' + mm + '.' + yearToBeSet;
        return dateToBeSet;
    },
    setAge: async function(age) {
        let value = await this.generateBirthdayDataByAge(age)
        await driver.execute(`document.querySelector("#birthdateID").value="${value}"`);
        //let ageField = await driver.$('input[name="birthDate"]');
        //await ageField.setValue(value);
    },
}
