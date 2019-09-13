'use strict';

const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const teacherLogin = require('../page-objects/teacherLogin');
const shared = { loginData };
const course = { courseData };
const firstLogin = require('../shared_steps/firstLogin.js');
const { expect } = require('chai');
const helpers = require('../runtime/helpers.js');
let legiblePassword;

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
        /*legiblePassword = "KfHnAnP1!"
        let newPassword = await driver.$(loginData.elem.newPassword);
        await newPassword.setValue(legiblePassword);
        let repeatNewPassword = await driver.$(loginData.elem.repeatNewPassword);
        await repeatNewPassword.setValue(legiblePassword); */
        await driver.pause(1000);
        await driver.execute('document.querySelector("#passwordNew").value="KfHnAnP1!"');
        await driver.execute('document.querySelector("#password_control").value="KfHnAnP1!"');
        await driver.execute('document.querySelector("#submit_new_password_btn").click()');
    },
    tryWithOld: async function() {
        await firstLogin.logout();
        await teacherLogin.performLogin(loginData.defaultTeacherUsername, loginData.defaultTeacherpassword);
        let messageField = await driver.$(loginData.elem.loginNotification);
        let message = await messageField.getText();
        let expectedMessage = "Login fehlgeschlagen.";
        await expect(message).to.equal(expectedMessage);
    },
    tryWithNew: async function() {
        await teacherLogin.performLogin(loginData.defaultTeacherUsername, legiblePassword);
        /* let url = await driver.getUrl();
        let expectedUrl = loginData.urlDashboard;
        await expect(url).to.equal(expectedUrl);*/
        await helpers.assertUrl('http://localhost:3100/dashboard');
    }
}
