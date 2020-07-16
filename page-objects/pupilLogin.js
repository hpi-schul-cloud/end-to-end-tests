'use strict';
const imageHelpers = require('../runtime/helpers/imageHelpers.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const loginData = require('../shared-objects/loginData'),
	imageCompare = require('../runtime/imageCompare'),
	shared = { loginData };
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

		let loginBtnSel = await driver.$('input[data-testid="submit-login"');
		await loginBtnSel.waitForExist(5000);
		await loginBtnSel.click();
	},

	loginResult: async function() {
		let initials = await firstLogin.getInitials();
		expect(await elementHelpers.getElementText('.avatar-circle')).to.equal(initials);
	},
	compareScreenshots: async function(filename) {
		await imageCompare.saveScreenshot(`${filename}.png`, '.timetable');
		await imageHelpers.compareImage(`${filename}.png`);
	}
};
