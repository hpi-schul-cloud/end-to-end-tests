/*[url/administration/students]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');
const ADMNSTRTNAdministrationOverviewPage = require('../../../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');

let eMAIL;
let name;

module.exports = {

selectorAddStudentBtn:'button[data-testid=\'btn_add_student\']',
selectorSetFirstName: 'input[data-testid=\'create_student_input_firstname\']',
selectorSetLastName: 'input[data-testid=\'create_student_input_lastname\']',
selectorSetEmail: 'input[data-testid=\'create_student_input_email\']',
selectorSendALinkBox: 'input[data-testid=\'create_student_input_send_link\']',
selectorNamesContainer: 'tbody[data-testid=\'students_names_container\']',
selectorConsentSubmitBtn: 'button[data-testid=\'submit_consent\']',

goToAdministration: function() {
    let url = ADMNSTRTNAdministrationOverviewPage.urlAdministration;
    return elementHelpers.loadPage(url, 10);
    },
createNewPupil: async function(firstname, lastname, email) {
    name=firstname;
    eMAIL = email;
    await this.goToAdministration();
    let administrateStudentsBtn = await driver.$(ADMNSTRTNAdministrationOverviewPage.administrateStudentsBtn);
    await administrateStudentsBtn.click();
    let addBtn = await driver.$(selectorAddStudentBtn);
    await addBtn.click();
    await driver.pause(1000);
    let firstName= await driver.$(selectorSetFirstName);
    await firstName.setValue(firstname);
    let secondName = await driver.$(selectorSetLastName);
    await secondName.setValue(lastname);
    let eMail = await driver.$(selectorSetEmail);
    await eMail.setValue(email);
    await this.executeScript();
    let sendAMessageBox = await driver.$(selectorSendALinkBox);
    await sendAMessageBox.click();
    let addButton = await driver.$('body > div.modal.fade.add-modal.in > div > div > form > div.modal-footer > button.btn.btn-primary.btn-submit');
    await addButton.click();
},
executeScript: async function() {
    await driver.pause(1500);
    await driver.execute('document.querySelector("#create_birthday").value = "13.08.1990"')
}
}
