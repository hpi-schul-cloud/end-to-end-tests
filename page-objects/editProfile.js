'use strict';

const loginData = require('../shared-objects/loginData');
const { CLIENT } = require("../shared-objects/servers");
const firstLogin = require('../shared_steps/firstLogin.js');
const { expect } = require('chai');
const assertHelpers = require('../runtime/helpers/assertHelpers.js');
let legiblePassword = "KfHnAnP1!";
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
	tryWithNew: async function() {
		await teacherLogin.performLogin(loginData.defaultTeacherUsername, legiblePassword);
		await assertHelpers.assertUrl(`${CLIENT.URL}/dashboard`);
	}
}
