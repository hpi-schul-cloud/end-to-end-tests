'use strict';

const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const teacherLogin = require('../page-objects/teacherLogin');
const { CLIENT } = require("../shared-objects/servers");
const shared = { loginData };
const course = { courseData };
const firstLogin = require('../shared_steps/firstLogin.js');
const { expect } = require('chai');
const helpers = require('../runtime/helpers.js');
let legiblePassword = "KfHnAnP1!";

module.exports = {
    goToSettings: async function() {
        await firstLogin.firstLoginTeacher();
        await driver.pause(1000);
        let icon = await driver.$(loginData.elem.iconClickable);
        await icon.click();
        let settings = await driver.$(loginData.elem.settings);
        await settings.click();
    },
    setNewPassword: async function() {
        let currentPassword = await driver.$('[data-testid="settings_password_current"]');
        let current_password = "Schulcloud1!";
        await currentPassword.setValue(current_password);

        let passwordField = await driver.$('[data-testid="settings_password_new"]');
        await passwordField.setValue(legiblePassword);

        let passwordControlField = await driver.$('[data-testid="settings_password_control"]');
        await passwordControlField.setValue(legiblePassword);

        let okBtn = await driver.$('[data-testid="submit_new_password_btn"]');
        await okBtn.click();
    },
    tryWithOld: async function() {
        await driver.pause(2000);
        await firstLogin.logout();
        await teacherLogin.performLogin(loginData.defaultTeacherUsername, loginData.defaultTeacherpassword);
        let messageField = await driver.$(loginData.elem.loginNotification);
        let message = await messageField.getText();
        let expectedMessage = "Login fehlgeschlagen.";
        await expect(message).to.equal(expectedMessage);
    },
    tryWithNew: async function() {
        await teacherLogin.performLogin(loginData.defaultTeacherUsername, legiblePassword);
        await helpers.assertUrl(`${CLIENT.URL}/dashboard`);
    }
}
