'use strict';

const loginData = require('../shared-objects/loginData'),
  imageCompare = require('../runtime/imageCompare'),
  shared = { loginData };

let log = global.log;
let image;

module.exports = {
  performLogin: async function(username, password) {
    image = username;

    let loginSel = await driver.$(shared.loginData.elem.usernameInput);
    await loginSel.setValue(username);

    let passwordSel = await driver.$(shared.loginData.elem.passwordInput);
    await passwordSel.setValue(password);

    let loginBtnSel = await driver.$(shared.loginData.elem.loginBtn);
    await loginBtnSel.click();
  },

  loginResult: async function() {
    expect(
      //let initialsSel = await driver.$('.avatar-circle');
      await helpers.getElementText('.avatar-circle')
    ).to.equal('KF');
  },
  compareScreenshots: async function(filename) {
    await imageCompare.saveScreenshot(`${filename}.png`, '.timetable');

    await helpers.compareImage(`${filename}.png`);
  }
};
