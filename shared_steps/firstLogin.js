'use strict';
const Login = require('../shared-objects/loginData');

module.exports = {
  pupilLogin: async function() {
    // Paula Meyer Daten:
    let usernameBox = await driver.$(
      '#loginarea > div > div.card-text.form-wrapper > form > div:nth-child(2) > input:nth-child(1)'
    );
    await usernameBox.setValue(Login.notEligiblePupilUsername);
    let passwordBox = await driver.$(
      '#loginarea > div > div.card-text.form-wrapper > form > div:nth-child(2) > input:nth-child(2)'
    );
    await passwordBox.setValue(Login.notEligiblePupilPassword);
    let loginBtn = await driver.$(
      '#loginarea > div > div.card-text.form-wrapper > form > div:nth-child(5) > input'
    );
    await loginBtn.click();
  },
  firstLoginTeacher: async function() {
    let nextBtn = await driver.$('#nextSection');
    await nextBtn.click();
    await nextBtn.click();
    await this.dataProtection();
    await nextBtn.click();
    let start = await driver.$(
      'body > main > div > div > form > div.panels.mb-2 > section:nth-child(4) > p > a'
    );
    await start.click();
  },
  firstLoginAdmin: async function() {
    let nextBtn = await driver.$('#nextSection');
    await nextBtn.click();
    await nextBtn.click();
    await this.dataProtection();
    await nextBtn.click();
    let start = await driver.$(
      'body > main > div > div > form > div.panels.mb-2 > section:nth-child(4) > p > a'
    );
    await start.click();
  },
  dataProtection: async function() {
    let box1 = await driver.$(
      'body > main > div > div > form > div.panels.mb-2 > section.submit-page > label:nth-child(4) > input[type=checkbox]'
    );
    await box1.click();
    let box2 = await driver.$(
      'body > main > div > div > form > div.panels.mb-2 > section.submit-page > label:nth-child(6) > input[type=checkbox]'
    );
    await box2.click();
  },
  firstLoginPupilFullAge: async function() {
    let nextBtn = await driver.$('#nextSection');
    await nextBtn.click();
    await nextBtn.click();
    let box1 = await driver.$(
      'body > main > div > div > form > div.panels.mb-2 > section:nth-child(3) > label:nth-child(4) > input[type=checkbox]'
    );
    let box2 = await driver.$(
      'body > main > div > div > form > div.panels.mb-2 > section:nth-child(3) > label:nth-child(6) > input[type=checkbox]'
    );
    await box1.click();
    await box2.click();
    await nextBtn.click();
    let password = 'Schulcloud1!';
    let pass1 = await driver.$('#password');
    let pass2 = await driver.$('#password_control');
    await pass1.setValue(password);
    await pass2.setValue(password);
    await nextBtn.click();
    await driver.url('http://localhost:3100/dashboard');
  },
  getInitials: async function() {
    let userIcon = await driver.$(
      'body > section > div.content-min-height > nav > ul > li:nth-child(5) > div > div > a > div > span'
    );
    await userIcon.click();
    let settings = await driver.$(
      'body > section > div.content-min-height > nav > ul > li:nth-child(5) > div > div > div > a:nth-child(2)'
    );
    await settings.click();
    let firstNameBox = await driver.$(
      '#main-content > div.route-account > form > div:nth-child(1) > input'
    );
    let firstName = await firstNameBox.getValue();
    let firstCharacter = firstName[0];
    let secondNameBox = await driver.$(
      '#main-content > div.route-account > form > div:nth-child(2) > input'
    );
    let secondName = await secondNameBox.getValue();
    let secondChacter = secondName[0];
    let initials = firstCharacter + secondChacter;
    return initials;
  },
  logout: async function() {
    let icon = await driver.$(
      'body > section > div.content-min-height > nav > ul > li:nth-child(5) > div > div > a > div > span'
    );
    await icon.click();
    let logOut = await driver.$(
      'body > section > div.content-min-height > nav > ul > li:nth-child(5) > div > div > div > a:nth-child(3)'
    );
    await logOut.click();
  }
};
