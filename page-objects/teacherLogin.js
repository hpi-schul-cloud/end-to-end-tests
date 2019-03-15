'use strict';

const loginData = require('../shared-objects/loginData'),
  imageCompare = require('../runtime/imageCompare'),
  shared = ({loginData});

let log = global.log;
let image;

module.exports = {
  
    
    performLogin: async function (username, password) {
        image = username; 
 
        await driver.setValue(shared.loginData.elem.usernameInput, username);
        await driver.setValue(shared.loginData.elem.passwordInput, password);
        await driver.click(shared.loginData.elem.loginBtn);

    },

    loginResult: async function() {
        expect(await helpers.getElementText('.avatar-circle')).to.equal('EM');
    },
    compareScreenshots: async function(filename) {
      await imageCompare.saveScreenshot(`${filename}.png`, '.timetable');
      
      await helpers.compareImage(`${filename}.png`);
    
    }
    

  };