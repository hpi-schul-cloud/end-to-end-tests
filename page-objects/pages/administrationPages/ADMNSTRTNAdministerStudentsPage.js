/*[url/administration/students]*/
'use strict';

const Admin = require('../../../shared-objects/administrationData');
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');

let eMAIL;
let name;

module.exports = {
goToAdministration: function() {
    let url = Admin.urlAdministration;
    return elementHelpers.loadPage(url, 10);
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
    let addButton = await driver.$('body > div.modal.fade.add-modal.in > div > div > form > div.modal-footer > button.btn.btn-primary.btn-submit');
    await addButton.click();
},
executeScript: async function() {
    await driver.pause(1500);
    await driver.execute('document.querySelector("#create_birthday").value = "13.08.1990"')
}
}
