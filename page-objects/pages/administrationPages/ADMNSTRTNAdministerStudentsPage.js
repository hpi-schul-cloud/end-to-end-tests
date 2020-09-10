/*[url/administration/students]*/
'use strict';
const startPage = require('../generalPagesBeforeLogin/StartPageBeforeLogin');
const loginPage= require('../generalPagesBeforeLogin/LoginPage');

const waitHelpers= require('../../../runtime/helpers/waitHelpers');
const dateTimeHelpers= require('../../../runtime/helpers/dateTimeHelpers');
let oldPassword;

const selectors = {
    //data test ids need to be created for the following three buttons
    selectorFABBtn:'button.fab.primary.button.is-medium.is-none',
    selectorAddStudentBtn:'a[aria-label="Schüler:in anlegen"]',
    selectorImportStudentBtn:'a[aria-label="Schüler:innen importieren"]',
    selectorSetFirstName: 'input[data-testid=\'input_create-user_firstname\']',
    selectorSetLastName: 'input[data-testid=\'input_create-user_lastname\']',
    selectorSetEmail: 'input[data-testid=\'input_create-user_email\']',
    selectorSetBirthdate: 'input[data-testid=\'input_create-student_birthdate\']',
    selectorSendALinkBox: 'label[data-testid=\'input_create-student_send-registration\']',
    selectorNamesContainer: 'tbody[data-testid=\'table-data-body\']',
    selectorConsentSubmitBtn: 'button[data-testid=\'submit_consent\']',
    submitStudentCreateBtn: 'button[data-testid=\'button_create-user_submit\']',

};
module.exports = {
    selectors, oldPassword,
    createNewPupil: async function(firstname, lastname, email) {
        await waitHelpers.waitAndClick(selectors.selectorFABBtn);
        await waitHelpers.waitAndClick(selectors.selectorAddStudentBtn);
        await waitHelpers.waitAndSetValue(selectors.selectorSetFirstName, firstname);
        await waitHelpers.waitAndSetValue(selectors.selectorSetLastName, lastname);
        await waitHelpers.waitAndSetValue(selectors.selectorSetEmail, email);
        let birthdate = await dateTimeHelpers.setDate(0,0,-15,'.',false);
        await this.setStudentsBirthday(birthdate);
        await waitHelpers.waitAndClick(selectors.selectorSendALinkBox);
        await waitHelpers.waitAndClick(selectors.submitStudentCreateBtn);
    },
    setStudentsBirthday: async function(date) {
        let dateSelector = await driver.$(selectors.selectorSetBirthdate);
        await dateSelector.waitForExist(1000);
        await dateSelector.setValue(date);
    },
    emailsOfThePupils: async function() {
        let names = await driver.$$(selectors.selectorNamesContainer + ' > tr');
        return Promise.all(names.map(async (nameContainer) => {
            const emailContainer = await nameContainer.$("td:nth-child(5)");
            return await emailContainer.getText();
        }))
    },
    verify: async function(email) {
        let emails = await this.emailsOfThePupils();
        await expect(emails).to.contain(email);
    },
    submitConsent: async function(e_mail) {
        let names = await driver.$$(selectors.selectorNamesContainer + ' > tr');
        for (var i = 1; i<= names.length; i++) {
            let emailPromise =  await driver.$(selectors.selectorNamesContainer + ' > tr:nth-child('+i+') > td:nth-child(3)');
            let email = await emailPromise.getText();
            if (email===e_mail){
                let boxConsent = await driver.$(selectors.selectorNamesContainer + ' > tr:nth-child('+i+') > td:nth-child(7) > a:nth-child(2) > i');
                await boxConsent.click();
                let submitBtn = await driver.$(selectors.selectorConsentSubmitBtn);
                let passwordField = await driver.$('#passwd');
                let password_old = await passwordField.getValue();
                oldPassword = password_old;
                await submitBtn.click();
                break;
            }
        }
    },
    studentLogsInWithDefaultPassword: async function(email) {
        await startPage.clickLoginBtn();
	    await loginPage.performLogin(email, this.oldPassword);
    }
}
