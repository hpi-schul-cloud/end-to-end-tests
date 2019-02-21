'use strict';

const loginData = require('../shared-objects/loginData'),
  verify = require('../runtime/imageCompare'),
  shared = ({loginData});

let log = global.log;
let image;

module.exports = {
  
    
    performLogin: async function (username, password) {
        image = username; 
        await verify.saveScreenshot(`${image}_1-0.png`);

        await driver.setValue(shared.loginData.elem.usernameInput, username);
        await driver.setValue(shared.loginData.elem.passwordInput, password);
        
        await driver.click(shared.loginData.elem.loginBtn);
        await driver.pause(DELAY_3_SECOND);
        await verify.saveScreenshot(`${image}_1-1.png`);
        await helpers.compareImage(`${image}_1-0.png`);
        await helpers.compareImage(`${image}_1-1.png`);
    },

    loginResult: async function(username) {
        image = username;

        let element = await driver.element(shared.loginData.elem.resultInitials);
        log.info(element);

    }

  };