'use strict';

const loginData = require('../shared-objects/loginData'),
  imageCompare = require('../runtime/imageCompare'),
  shared = { loginData };
const sleep = require('util').promisify(setTimeout);
const firstLogin = require('../shared_steps/firstLogin.js');
let log = global.log;
let image;

module.exports = {
  performLogin: async function(username, password) {
    image = username;

    let loginSel = await driver.$(shared.loginData.elem.usernameInput);
    await loginSel.setValue(username);

    let passwordSel = await driver.$(shared.loginData.elem.passwordInput);
    await passwordSel.setValue(password);

    let loginBtnSel = await driver.$(shared.loginData.elem.submitBtn);
    await loginBtnSel.click();
  },

  loginResult: async function() {
    let initials = await firstLogin.getInitials();
    expect(await helpers.getElementText('.avatar-circle')).to.equal(initials);
  },
  compareScreenshots: async function(filename) {
    await sleep(100);
    await imageCompare.saveScreenshot(`${filename}.png`, '.timetable');

    await helpers.compareImage(`${filename}.png`);
  }
};
