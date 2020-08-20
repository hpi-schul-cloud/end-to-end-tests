/*[url/administration/students]*/
'use strict';


const waitHelpers= require('../../../runtime/helpers/waitHelpers');
let oldPassword = require('../../../step_definitions/administartion-steps');

module.exports = {

selectorAddStudentBtn:'button[data-testid=\'btn_add_student\']',
selectorSetFirstName: 'input[data-testid=\'create_student_input_firstname\']',
selectorSetLastName: 'input[data-testid=\'create_student_input_lastname\']',
selectorSetEmail: 'input[data-testid=\'create_student_input_email\']',
selectorSendALinkBox: 'input[data-testid=\'create_student_input_send_link\']',
selectorNamesContainer: 'tbody[data-testid=\'students_names_container\']',
selectorConsentSubmitBtn: 'button[data-testid=\'submit_consent\']',
submitStudentCreateBtn: 'button.btn.btn-primary.btn-submit',


createNewPupil: async function(firstname, lastname, email) {
    
    await waitHelpers.waitAndClick(selectorAddStudentBtn);
    await waitHelpers.waitAndSetValue(selectorSetFirstName, firstname);
    await waitHelpers.waitAndSetValue(selectorSetLastName, lastname);
    await waitHelpers.waitAndSetValue(selectorSetEmail, email);
    await this.setStudentsBirthdayScript();
    await waitHelpers.waitAndClick(selectorSendALinkBox);
    await waitHelpers.waitAndClick(selectorAddBtn);
},
setStudentsBirthdayScript: async function() {
    await driver.pause(1500);
    await driver.execute('document.querySelector("#create_birthday").value = "13.08.1990"')
},


emailsOfThePupils: async function() {
    let names = await driver.$$(selectorNamesContainer + ' > tr');
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
    let names = await driver.$$(selectorNamesContainer + ' > tr');
    length = names.length;
    for (var i = 1; i<= length; i++) {
        let emailPromise =  await driver.$(selectorNamesContainer + ' > tr:nth-child('+i+') > td:nth-child(3)');
        let email = await emailPromise.getText();
        if (email===e_mail){
            let boxConsent = await driver.$(selectorNamesContainer + ' > tr:nth-child('+i+') > td:nth-child(7) > a:nth-child(2) > i');
            await boxConsent.click();
            let submitBtn = await driver.$(selectorConsentSubmitBtn);
            let passwordField = await driver.$('#passwd');
            oldPassword.oldPassword = await passwordField.getValue();
            await submitBtn.click();
            break;
        }
    }
},
}
