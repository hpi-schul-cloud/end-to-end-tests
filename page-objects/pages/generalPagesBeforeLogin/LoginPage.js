/*[url/login]*/
'use strict';
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const firstLogin = require('../../../shared_steps/firstLogin.js');
const failureMessage = "Login fehlgeschlagen.";
const usernameInput = 'section#loginarea input[data-testid="username"]';
const passwordInput = 'section#loginarea input[data-testid="password"]';
const loginBtn = 'input[data-testid="submit-login"]';
const firstLoginSel = {
	dataProtection: {
		box1: 'input[name="privacyConsent"]',
		box2: 'input[name="termsOfUseConsent"]',
	},
	setOwnPasswort: {
		passwordSet: 'input[@data-testid="firstlogin_password"]',
		passwordSet2: 'input[@data-testid="firstlogin_password_control"]',
	},
	sectionNames: {
		sectionOne: '[data-testid="name-section-1"]',
		sectionTwo: '[data-testid="name-section-2"]',
		sectionThree: '[data-testid="name-section-3"]',
	},
	nextSectionBtn: '#nextSection',
}

module.exports = {
	performLogin: async function (username, password) {
		let loginSel = await driver.$(usernameInput);
		await loginSel.setValue(username);
		let passwordSel = await driver.$(passwordInput);
		await passwordSel.setValue(password);
		let loginBtnSel = await driver.$(loginBtn);
		await loginBtnSel.click();
		await driver.pause(1500);
	},

	loginResult: async function () {
		let initials = await firstLogin.getInitials();
		expect(await elementHelpers.getElementText('.avatar-circle')).to.equal(initials);
	},

	/* First Login */

	firstLoginStudent: async function (newPassword) {

		await waitHelpers.waitAndClick(firstLoginSel.nextSectionBtn);
		await waitHelpers.waitAndClick(firstLoginSel.nextSectionBtn);
		// if Data protection is needed
		let section_three_name = await driver.$('.panels.mb-2 > section:nth-child(3) > h2');
		if (await section_three_name.getText() == "Einwilligungserklärung") {
			await firstLogin.dataProtection();
			await waitHelpers.waitAndClick(firstLoginSel.nextSectionBtn);
		};
		let password = await driver.$('input[data-testid=\'firstlogin_password\']');
		let password_control = await driver.$('input[data-testid=\'firstlogin_password_control\']');
		await password.setValue(pass);
		await driver.pause(1000);
		await password_control.setValue(pass);
		await driver.pause(1000);
		await waitHelpers.waitAndClick(nextBtn);
		await driver.$('.form-submitted');
		let start = await driver.$('a[data-testid="btn_schul-cloud_erkunden"]');
		await start.waitForDisplayed(15000);
		await start.click();
		await driver.pause(1500);

	},
	compareScreenshots: async function (filename) {
		await imageCompare.saveScreenshot(`${filename}.png`);
		await imageHelpers.compareImage(`${filename}.png`);
	},

	wrongLoginResult: async function () {
		expect(await elementHelpers.getElementText(".notification-content")).to.equal(failureMessage);
		let btn = await driver.$(loginBtn);
		let btnValue = btn.getAttribute('value');
		await expect(btnValue).to.match(/^Bitte.*Sekunden warten$/);
	},
}
