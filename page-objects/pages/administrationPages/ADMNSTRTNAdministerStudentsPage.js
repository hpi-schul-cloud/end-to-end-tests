/*[url/administration/students]*/
'use strict';
const { CLIENT } = require("../../../shared-objects/servers");
const Admin = require('../../../shared-objects/administrationData');
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');
const urlAdministartionStudents= `${CLIENT.URL}/administartion/students`;
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');

selectors = {

    submitBtn: 'button[type=\'submit\']',
    addStudentBtn:'button[data-testid=\'btn_add_student\']',
    setFirstName:'input[id=\'create_firstname\']',
    setFirstName:'input[data-testid=\'create_student_input_firstname\']',
    setLastName:'input[data-testid=\'create_student_input_lastname\']',
    setEmail:'input[data-testid=\'create_student_input_email\']',
    sendALinkBox:'input[data-testid=\'create_student_input_send_link\']',
    namesContainer: 'tbody[data-testid=\'students_names_container\']',
    consentSubmitBtn: 'button[data-testid=\'submit_consent\']',
    birthday_field: 'input[data-testid=\'create_birthday\']',
   
    

}

module.exports = {

goToAdministrateStudents: function() {
    return elementHelpers.loadPage(urlAdministartionStudents, 10);
},

clickCreateNewPupil: async function() {
    await waitHelpers.waitAndClick(addStudentBtn);
},

setFirstName: async function(firstName) {
    await waitHelpers.waitAndSetValue(setFirstName, firstName)

},

setSecondName: async function(secondName) {
    await waitHelpers.waitAndSetValue(setLastName, secondName);
},

setEmail: async function(email) {
    await waitHelpers.waitAndSetValue(setEmail, email);
},
putBirthdayInfoAsScriptOnPage: async function() {
    await driver.pause(1500);
    await driver.execute('document.querySelector("#create_birthday").value = "13.08.1990"')
},

sendAMessageActivate: async function() {
    await waitHelpers.waitAndClick(sendALinkBox);
},

clickApproveCreateNewStudent: async function() {
    await waitHelpers.waitAndClick(submitBtn);

},

createNewPupil: async function(firstname, secondName, email) {
    await this.clickCreateNewPupil();
    await this.setFirstName(firstname);
    await this.setSecondName(secondName);
    await this.setEmail(email);
    await this.putBirthdayInfoAsScriptOnPage();
    await this.sendAMessageActivate();
    await this.clickApproveCreateNewStudent();

},
emailsOfThePupils: async function () {
    let names = await driver.$$(nameContainer + ' > tr');
    return Promise.all(names.map(async (nameContainer) => {
        const emailContainer = await nameContainer.$("td:nth-child(3)");
        return await emailContainer.getText();
    })),
},
verifyStudentWasCreated: async function(email) {
    let emails = await this.emailsOfThePupils();
        await expect(emails).to.contain(email);
},
}
