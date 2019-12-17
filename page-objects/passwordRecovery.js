'use strict';
const mailHelper = require('../shared_steps/mailslurper');


module.exports = {

clickOnPasswordRecovery: async function() {
    const pswdRecoverySelector = await driver.$('.submit-pwrecovery');
    await pswdRecoverySelector.click();
    await driver.pause(2000);
    //let selectorToBeLoaded = await driver.$('.window-inline modal-open');
    //await selectorToBeLoaded.waitForExist(2500);
},
submitEmail: async function(registeredEmail) {
    //let emailSelector = await driver.$('input[name="username"]');
    const emailSelector = await driver.$('#username');
    await emailSelector.setValue(registeredEmail);
    const btnConatiner = await driver.$('.pwrecovery-modal.in');
    const submitBtn = await btnConatiner.$('button.btn.btn-primary.btn-submit');
    await submitBtn.click();
    
},
verifySendMail: async function(email) {
    const subjectOfEmail = await mailHelper.getEmailSubject(email)
    const expectedSubject = "Passwort zurücksetzen für die Schul-Cloud";
    await expect(subjectOfEmail).to.equal(expectedSubject);


},




}
