'use strict';

let passwordRecovery = require('../page-objects/passwordRecovery');
let loginData = require('../shared-objects/loginData');



Given(/^user arrives at schulcloud$/, function () {
    return helpers.loadPage(loginData.url, 10);
});
Given(/^user clicks on password recovery request$/, function () {
    return passwordRecovery.clickOnPasswordRecovery();
});
When(/^user submits valid email (.*) for password recovery$/, function (registeredEmail) {
    return passwordRecovery.submitEmail(registeredEmail);
});
Then(/^user should get an email (.*) from schulcloud$/, function (registeredEmail) {
    return passwordRecovery.verifySendMail(registeredEmail);
});


