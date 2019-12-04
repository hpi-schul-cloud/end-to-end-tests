'use strict';
let mailHelper = require('../shared_steps/mailslurper');


module.exports = {

clickOnPasswordRecovery: async function() {
    let pswdRecoverySelector = await driver.$('.submit-pwrecovery');
    await pswdRecoverySelector.click();
    await driver.pause(2000);
    //let selectorToBeLoaded = await driver.$('.window-inline modal-open');
    //await selectorToBeLoaded.waitForExist(2500);
},
submitEmail: async function(registeredEmail) {
    //let emailSelector = await driver.$('input[name="username"]');
    let emailSelector = await driver.$('#username');
    await emailSelector.setValue(registeredEmail);
    let btnConatiner = await driver.$('.pwrecovery-modal.in');
    let submitBtn = await btnConatiner.$('button.btn.btn-primary.btn-submit');
    await submitBtn.click();
    
},
verifySendMail: async function(email) {
    let subjectOfEmail = await mailHelper.getEmailSubject(email)
    let expectedSubject = "Passwort zurücksetzen für die Schul-Cloud";
    await expect(subjectOfEmail).to.equal(expectedSubject);


},




}
