'use strict';

const loginData = require('../shared-objects/loginData'),
	imageCompare = require('../runtime/imageCompare'),
	shared = ({loginData});

let log = global.log;

module.exports = {

	performLogin: async function() {

		let loginSel = await driver.$(shared.loginData.elem.usernameInput);
		await loginSel.setValue("username");

		let passwordSel = await driver.$(shared.loginData.elem.passwordInput);
		await passwordSel.setValue("password");

		let loginBtnSel = await driver.$(loginData.elem.submitBtn);
		await loginBtnSel.click();
	},

	loginResult: async function() {
			expect(await helpers.getElementText(".notification-content")).to.equal('Login fehlgeschlagen.');
	},

	compareScreenshots: async function(filename) {

		await imageCompare.saveScreenshot(`${filename}.png`);

		await helpers.compareImage(`${filename}.png`);

	}

};
