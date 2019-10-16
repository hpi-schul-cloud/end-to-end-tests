'use strict';

const loginData = require('../shared-objects/loginData');
const mailedPin = require('../page-objects/mailTestHelper');
const firstLogin = require('../shared_steps/firstLogin.js');
let generatedURL;
let studentsLoginData;



module.exports = {
    generateLink: async function() {
        let generateBtn = await driver.$('button.btn-invitation-link-with-hash');            
        await generateBtn.waitForDisplayed(10000);
        await generateBtn.click();
        await driver.pause(1500);
        let invitationField = await driver.$('#invitation-link');
        generatedURL = await invitationField.getValue();
        
    },
    chooseAPupilFromTheTable: async function(emailSTUDENT) {
        const container = await driver.$('[data-testid="students_names_container"]');
        const numberOfStudents = await container.$$('tr');
        for (var i=1; i<=numberOfStudents.length; i++) {
            let emailField = await container.$('tr:nth-child('+i+') > td:nth-child(3)');
            let email = await emailField.getText();
            if(email===emailSTUDENT) {
                let editBox = await container.$('tr:nth-child('+i+')> td:nth-child(7)>a');
                await editBox.click();
                break;
            }
        };
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
    parentsSetTheirData: async function(firstnamePARENT, lastnamePARENT, emailPARENT) {
        
        let nameField= await driver.$('input[name="parent_firstName"]');
        await nameField.setValue(firstnamePARENT);
        let lastnameField = await driver.$('input[name="parent_lastName"]');
        await lastnameField.setValue(lastnamePARENT);
        let emailField = await driver.$('input[name="parent_email"]');
        await emailField.setValue(emailPARENT);
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
       await mailedPin.getLastPin(email);
    },
    parentsSetPin: async function(emailPARENT) {
        let pin = await mailedPin.getLastPin(emailPARENT);
        await driver.pause(3000);
        let digit1 = await driver.$('#pinverification > div > input:nth-child(2)');
        await digit1.setValue(pin[0]);
        let digit2 = await driver.$('#pinverification > div > input:nth-child(3)');
        await digit2.setValue(pin[1]);
        let digit3 = await driver.$('#pinverification > div > input:nth-child(4)');
        await digit3.setValue(pin[2]);
        let digit4 = await driver.$('#pinverification > div > input:nth-child(5)');
        await digit4.setValue(pin[3]);
        let continueBtn = await driver.$('#nextSection');
        await continueBtn.click();
        let recapMessage = await driver.$('.recap');
        await recapMessage.waitForDisplayed(3500);
        studentsLoginData = await this.saveLoginData();
    },
    saveLoginData: async function() {
        let dataArray = [];
        let loginSelector = await driver.$('.recap > p:nth-child(1) > i');
        let login = await loginSelector.getText();
        await dataArray.push(login);
        let passwordSelector = await driver.$('.recap > p:nth-child(2) > i');
        let password = await passwordSelector.getText();
        await dataArray.push(password);
        return dataArray;
    },
    // student logs in with studentsLoginData
    studentLogsIn: async function() {
        let username = studentsLoginData[0];
        let password = studentsLoginData[1];
        let newpass = "Schulcloud1!";
        await firstLogin.pupilLogin(username, password);
        await firstLogin.firstLoginPupilFullAge(username,newpass)
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
