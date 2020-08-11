/*[url/administration/students]*/
'use strict';
const { CLIENT } = require("../../../shared-objects/servers");
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const urlAdministartionStudents = `${CLIENT.URL}/administration/students`;

const selectors = {

    submitBtn: '.modal-footer > button[type=\'submit\']',
    addStudentBtn:'button[data-testid=\'btn_add_student\']',
    setFirstName:'input[data-testid=\'create_student_input_firstname\']',
    setLastName:'input[data-testid=\'create_student_input_lastname\']',
    setEmail:'input[data-testid=\'create_student_input_email\']',
    sendALinkBox:'input[data-testid=\'create_student_input_send_link\']',
    namesContainer: 'tbody[data-testid=\'students_names_container\']',
    consentSubmitBtn: 'button[data-testid=\'submit_consent\']',
    birthday_field: 'input[data-testid=\'create_birthday\']',
}

module.exports = {

goToAdministrateStudents: async function() {
    let url = urlAdministartionStudents;
    return elementHelpers.loadPage(url, 20);
},

clickCreateNewPupil: async function() {
    let addStudentBtn = await driver.$(selectors.addStudentBtn);
    await addStudentBtn.click();
    await driver.pause(1500);
},

setFirstName: async function(firstName) {
    let setFirstNameSelector = await driver.$(selectors.setFirstName);
    await setFirstNameSelector.setValue(firstName);

},

setSecondName: async function(secondName) {
    let setSecondNameSelector = await driver.$(selectors.setLastName);
    await setSecondNameSelector.setValue(secondName);
},

setEmail: async function(email) {
    let setEmailSelecrtor = await driver.$(selectors.setEmail);
    await setEmailSelecrtor.setValue(email);
},
putBirthdayInfoAsScriptOnPage: async function() {
    await driver.pause(1500);
    await driver.execute('document.querySelector("#create_birthday").value = "13.08.1990"')
},

sendAMessageActivate: async function() {
    await waitHelpers.waitAndClick(selectors.sendALinkBox);
},

clickApproveCreateNewStudent: async function() {
    let submitBtn = await driver.$(selectors.addStudentBtn);
    await submitBtn.click();
    await driver.pause(1200);
},

createNewPupil: async function(firstname, secondName, email) {
    await this.clickCreateNewPupil();
    await this.setFirstName(firstname);
    await this.setSecondName(secondName);
    await this.setEmail(email);
    await this.putBirthdayInfoAsScriptOnPage();
    //await this.sendAMessageActivate();
    await this.clickApproveCreateNewStudent();

},
emailsOfThePupils: async function () {
    let names = await driver.$$(selectors.nameContainer + ' > tr');
    return Promise.all(names.map(async (nameContainer) => {
        const emailContainer = await selectors.namesContainer.$("td:nth-child(3)");
        return await emailContainer.getText();
    }))
},
verifyStudentWasCreated: async function(email) {
    let emails = await this.emailsOfThePupils();
    await expect(emails).to.contain(email);
},
}
