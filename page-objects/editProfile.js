'use strict';

const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const teacherLogin = require('../page-objects/teacherLogin');
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
        let passwordField = await driver.$('#passwordNew');
        await passwordField.setValue(legiblePassword);
        await driver.pause(500);
        let passwordControlField = await driver.$('#password_control');
        await passwordControlField.setValue(legiblePassword);
        await driver.pause(500);
        let currentPassword = await driver.$('#settings_current_password');
        let current_password = "Schulcloud1!";
        await currentPassword.setValue(current_password);
        let okBtn = await driver.$('#submit_new_password_btn');
        await okBtn.click();
        await driver.pause(1000);
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
        await helpers.assertUrl('http://localhost:3100/dashboard');
    }
}
