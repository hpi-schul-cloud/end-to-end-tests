'use strict';
let teacherLogin = require('../page-objects/teacherLogin');
const firstLogin = require('../shared_steps/firstLogin.js');
const homework = require('../page-objects/homework');
const { expect } = require('chai');
const Login = require('../shared-objects/loginData');
const Admin = require('../shared-objects/administrationData');
let emails = [];
var length;



module.exports = {
goToAdministration: function() {
    let url = Admin.urlAdministration;
    return helpers.loadPage(url, 10);
},

createNewPupil: async function(firstname, lastname, email) {
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
    let addButton = await driver.$('body > div.modal.fade.add-modal.in > div > div > form > div.modal-footer > button.btn.btn-primary.btn-submit');
    await addButton.click();
},
executeScript: async function() {
    await driver.pause(1500);
    await driver.execute('document.querySelector("#create_birthday").value = "13.08.1990"')

},
namesOfThePupils: async function() {
    let names = await driver.$$(Admin.namesContainer + ' > tr');
    length = names.length; 
    for (var i = 1; i<= length; i++) {
        let pupil = await driver.$(Admin.namesContainer + ' > tr:nth-child('+i+')');
        let emailPromise =  await driver.$(Admin.namesContainer + ' > tr:nth-child('+i+') > td:nth-child(3)');
        let email = await emailPromise.getText();
        await emails.push(email);
    }
    return emails;
},
verify: async function(email) {
    let names = await this.namesOfThePupils();
    await expect(names).to.contain(email);
},
submitConsent: async function(e_mail) {
    let names = await driver.$$(Admin.namesContainer + ' > tr');
    length = names.length; 
    for (var i = 1; i<= length; i++) {
        let pupil = await driver.$(Admin.namesContainer + ' > tr:nth-child('+i+')');
        let emailPromise =  await driver.$(Admin.namesContainer + ' > tr:nth-child('+i+') > td:nth-child(3)');
        let email = await emailPromise.getText();
        if (email===e_mail){
            let boxConsent = await driver.$(Admin.namesContainer + ' > tr:nth-child('+i+') > td:nth-child(7) > a:nth-child(2) > i');
            await boxConsent.click();
            await driver.pause(2000);
            let submitBtn = await driver.$(Admin.consentSubmitBtn);
            await submitBtn.click();
            break;
        }
    }
}
}
