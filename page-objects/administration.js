'use strict';
const firstLogin = require('../shared_steps/firstLogin.js');
const { expect } = require('chai');
const Admin = require('../shared-objects/administrationData');
var length;
let oldPassword;
let eMAIL;
let name;
let newPassword = "Schulcloud1!"

module.exports = {
goToAdministration: function() {
    let url = Admin.urlAdministration;
    return helpers.loadPage(url, 10);
},
createNewPupil: async function(firstname, lastname, email) {
    name=firstname;
    eMAIL = email;
    await this.goToAdministration();
    let administrateStudentsBtn = await driver.$(Admin.administrateStudentsBtn);
    await administrateStudentsBtn.click();
    let addBtn = await driver.$(Admin.addStudentBtn);
    await addBtn.click();
    await driver.pause(1000);
    let firstName= await driver.$(Admin.setFirstName);
    await firstName.setValue(firstname);
    let secondName = await driver.$(Admin.setLastName);
    await secondName.setValue(lastname);
    let eMail = await driver.$(Admin.setEmail);
    await eMail.setValue(email);
    await this.executeScript();
    let sendAMessageBox = await driver.$(Admin.sendALinkBox);
    await sendAMessageBox.click();
    let addButton = await driver.$('body > div.modal.fade.add-modal.show > div > div > form > div.modal-footer > button.btn.btn-primary.btn-submit');
    await addButton.click();
},
executeScript: async function() {
    await driver.pause(1500);
    await driver.execute('document.querySelector("#create_birthday").value = "13.08.1990"')
},
emailsOfThePupils: async function() {
    let names = await driver.$$(Admin.namesContainer + ' > tr');
    return Promise.all(names.map(async (nameContainer) => {
        const emailContainer = await nameContainer.$("td:nth-child(3)");
        return await emailContainer.getText();
    }))
},
verify: async function(email) {
    let emails = await this.emailsOfThePupils();
    await expect(emails).to.contain(email);
},
submitConsent: async function(e_mail) {
    let names = await driver.$$(Admin.namesContainer + ' > tr');
    length = names.length; 
    for (var i = 1; i<= length; i++) {
        let emailPromise =  await driver.$(Admin.namesContainer + ' > tr:nth-child('+i+') > td:nth-child(3)');
        let email = await emailPromise.getText();
        if (email===e_mail){
            let boxConsent = await driver.$(Admin.namesContainer + ' > tr:nth-child('+i+') > td:nth-child(7) > a:nth-child(2) > i');
            await boxConsent.click();
            let submitBtn = await driver.$(Admin.consentSubmitBtn);
            let passwordField = await driver.$('#passwd');
            let password_old = await passwordField.getValue();
            oldPassword = password_old;
            await submitBtn.click();
            break;
        }
    }
},
newPupilLogsIn: async function() {
    await firstLogin.logout();
    await firstLogin.pupilLogin(eMAIL, oldPassword);
},
pupilAcceptsDataProtection: async function() {
    await firstLogin.firstLoginPupilFullAge(name, newPassword);
}
}
