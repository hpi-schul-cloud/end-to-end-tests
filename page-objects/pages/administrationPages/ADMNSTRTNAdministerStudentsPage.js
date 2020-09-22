/*[url/administration/students]*/
'use strict';
const startPage = require('../generalPagesBeforeLogin/StartPageBeforeLogin');
const loginPage = require('../generalPagesBeforeLogin/LoginPage');

const waitHelpers = require('../../../runtime/helpers/waitHelpers');
let oldPassword;

const selectorAddStudentBtn = 'button[data-testid=\'btn_add_student\']';
const selectorSetFirstName = 'input[data-testid=\'create_student_input_firstname\']';
const selectorSetLastName = 'input[data-testid=\'create_student_input_lastname\']';
const selectorSetEmail = 'input[data-testid=\'create_student_input_email\']';
const selectorSendALinkBox = 'input[data-testid=\'create_student_input_send_link\']';
const selectorNamesContainer = 'tbody[data-testid=\'students_names_container\']';
const selectorConsentSubmitBtn = 'button[data-testid=\'submit_consent\']';
const submitStudentCreateBtn = 'div.modal.fade.add-modal.in button.btn-submit';
const passwordFieldSel = '#passwd';

module.exports = {
    createNewPupil: async function (firstname, lastname, email) {
        await waitHelpers.waitAndClick(selectorAddStudentBtn);
        await waitHelpers.waitAndSetValue(selectorSetFirstName, firstname);
        await waitHelpers.waitAndSetValue(selectorSetLastName, lastname);
        await waitHelpers.waitAndSetValue(selectorSetEmail, email);
        await this.setStudentsBirthdayScript();
        await waitHelpers.waitAndClick(selectorSendALinkBox);
        await waitHelpers.waitAndClick(submitStudentCreateBtn);
    },
    setStudentsBirthdayScript: async function () {
        await driver.pause(1500);
        await driver.execute('document.querySelector("#create_birthday").value = "13.08.1990"')
    },


    emailsOfThePupils: async function () {
        let names = await driver.$$(selectorNamesContainer + ' > tr');
        return Promise.all(names.map(async (nameContainer) => {
            const emailContainer = await nameContainer.$("td:nth-child(3)");
            return await emailContainer.getText();
        }))
    },
    verify: async function (email) {
        let emails = await this.emailsOfThePupils();
        await expect(emails).to.contain(email);
    },
    submitConsent: async function (e_mail) {
        let names = await driver.$$(selectorNamesContainer + ' > tr');
        for (var i = 1; i <= names.length; i++) {
            let emailPromise = await driver.$(selectorNamesContainer + ' > tr:nth-child(' + i + ') > td:nth-child(3)');
            let email = await emailPromise.getText();
            if (email === e_mail) {
                let boxConsent = await driver.$(selectorNamesContainer + ' > tr:nth-child(' + i + ') > td:nth-child(7) > a:nth-child(2) > i');
                await boxConsent.click();
                let submitBtn = await driver.$(selectorConsentSubmitBtn);
                let passwordField = await driver.$(passwordFieldSel);
                let password_old = await passwordField.getValue();
                oldPassword = password_old;
                await submitBtn.click();
                break;

            }
        }
    },
    studentLogsInWithDefaultPassword: async function (email) {
        await startPage.clickLoginBtn();
        await loginPage.performLogin(email, oldPassword);
    }
}
