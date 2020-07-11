'use strict';

const loginData = require('../shared-objects/loginData');
const teacherLogin = require('../page-objects/teacherLogin');
const { CLIENT } = require("../shared-objects/servers");
const firstLogin = require('../shared_steps/firstLogin.js');
const { expect } = require('chai');
const helpers = require('../runtime/helpers.js');
const failureMessage = "Login fehlgeschlagen."


module.exports = {
	goToSettings: async function() {
		await firstLogin.firstLoginTeacher();
		await driver.pause(1000);
		let icon = await driver.$(loginData.elem.iconClickable);
		await icon.click();
		let settings = await driver.$(loginData.elem.settings);
		await settings.click();
	},
	setNewPassword: async function(oldPAssword, newPassword) {
		let currentPassword = await driver.$('[data-testid="settings_password_current"]');
		
		await currentPassword.setValue(oldPAssword);

		let passwordField = await driver.$('[data-testid="settings_password_new"]');
		await passwordField.setValue(newPassword);

		let passwordControlField = await driver.$('[data-testid="settings_password_control"]');
		await passwordControlField.setValue(newPassword);

		let okBtn = await driver.$('[data-testid="submit_new_password_btn"]');
		await okBtn.click();
	},
	loginFailed: async function() {
		let messageField = await driver.$(loginData.elem.loginNotification);
		let message = await messageField.getText();
		let loginBtnSel = await driver.$(loginData.elem.submitBtn);
		await expect(message).to.equal(failureMessage);
		let btnValue = await loginBtnSel.getAttribute('value');
		await expect(btnValue).to.match(/^Bitte.*Sekunden warten$/);
		let waitTime = (parseInt(process.env.LOGIN_BLOCK_TIME) || 15)+1;
		await driver.pause(waitTime*1000);

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

}
