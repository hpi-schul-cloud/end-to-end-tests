'use strict';

const loginData = require('../shared-objects/loginData'),
  imageCompare = require('../runtime/imageCompare'),
  shared = { loginData };
const firstLogin = require('../shared_steps/firstLogin.js');
let generatedURL;

module.exports = {
    generateLink: async function() {
        let generateBtn = await driver.$('button[data-testid="generate_a_link"]');
        await generateBtn.click();
        await driver.pause(1500);
        let invitationField = await driver.$('#invitation-link');
        generatedURL = await invitationField.getValue();
    },
    openTheLink: async function() {
        return helpers.loadPage(generatedURL, 10);
    },


}
