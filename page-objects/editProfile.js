'use strict';

const loginData = require('../shared-objects/loginData');
const teacherLogin = require('../page-objects/teacherLogin');
const { CLIENT } = require("../shared-objects/servers");
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
	goToChange: async function(n) {
		let btn = await driver.$(loginData.elem.editUserDataBtn[n]);
		await btn.click();
	},
	setNewPassword: async function() {
		let currentPassword = await driver.$(loginData.elem.currentPassword);
		let current_password = "Schulcloud1!";
		await currentPassword.setValue(current_password);

		let passwordField = await driver.$(loginData.elem.newPassword);
		await passwordField.setValue(legiblePassword);

		let passwordControlField = await driver.$(loginData.elem.repeatNewPassword);
		await passwordControlField.setValue(legiblePassword);

		let formSubmitBtn = await driver.$(loginData.elem.formSubmitBtn);
		await formSubmitBtn.click();

		let modalConfirmationBtn = await driver.$(loginData.elem.modalConfirmationBtn);
		await modalConfirmationBtn.click();
	},
	tryWithOld: async function() {
		await driver.pause(2000);
		await firstLogin.logout();
		let frontpageLoginBtn = await driver.$(loginData.elem.frontpageLoginBtn);
		await frontpageLoginBtn.click();
		await teacherLogin.performLogin(loginData.defaultTeacherUsername, loginData.defaultTeacherpassword);
		let messageField = await driver.$(loginData.elem.loginNotification);
		let message = await messageField.getText();
		let expectedMessage = "Login fehlgeschlagen.";
		let loginBtnSel = await driver.$(loginData.elem.submitBtn);
		await expect(message).to.equal(expectedMessage);
		await driver.pause(1000);
		let btnValue = await loginBtnSel.getAttribute('value');
		await expect(btnValue).to.match(/^Bitte.*Sekunden warten$/);
		//Brute Force Protection disables login for LOGIN_BLOCK_TIME seconds
		let waitTime = (parseInt(process.env.LOGIN_BLOCK_TIME) || 15)+1;
		await driver.pause(waitTime*1000);
	},
	tryWithNew: async function() {
		await teacherLogin.performLogin(loginData.defaultTeacherUsername, legiblePassword);
		await helpers.assertUrl(`${CLIENT.URL}/dashboard`);
	}
}
