'use strict';

const Login = require('../shared-objects/loginData');
const helpers = require('../runtime/helpers.js')
var secondCharacter;

module.exports = {
	pupilLogin: async function(name,password) {
		let usernameBox = await driver.$(Login.elem.usernameInput);
		await usernameBox.setValue(name);
		let passwordBox = await driver.$(Login.elem.passwordInput);
		await passwordBox.setValue(password);
		await helpers.waitAndClick(Login.elem.submitBtn);
	},
	firstLoginTeacher: async function() {
		let nextBtn = await driver.$('#nextSection');
		await nextBtn.click();
		await nextBtn.click();
		await driver.pause(1500);
		await this.dataProtection();
		await nextBtn.click();
		await driver.$('.form-submitted');
		let start = await driver.$('a[data-testid="btn_schul-cloud_erkunden"]');
		await start.waitForDisplayed(15000);
		await start.click();
		await driver.pause(1500);
	},
	firstLoginAdmin: async function() {
		let nextBtn = await driver.$('#nextSection');
		await nextBtn.click();
		await nextBtn.click();
		await this.dataProtection();
		await nextBtn.click();
		await driver.$('.form-submitted');
		let start = await driver.$('a[data-testid="btn_schul-cloud_erkunden"]');
		await start.waitForDisplayed(15000);
		await start.click();
	},
	dataProtection: async function() {
	let box1 = await driver.$('input[name=\'privacyConsent\']');
	await box1.waitForExist(2000);
		await box1.click();
		let box2 = await driver.$('input[name=\'termsOfUseConsent\']');
		await box2.waitForExist(2000);
		await box2.click();
	},
	firstLoginPupilFullAge: async function(name, pass) {
		let nextBtn = "#nextSection";
		await helpers.waitAndClick(nextBtn);
		await helpers.waitAndClick(nextBtn);
		// if Data protection is needed
		let section_three_name = await driver.$('.panels.mb-2 > section:nth-child(3) > h2');
		if (await section_three_name.getText()== "Einwilligungserklärung") {
			await this.dataProtection();
			await helpers.waitAndClick(nextBtn)
		}
		let password = await driver.$('input[data-testid=\'firstlogin_password\']');
		let password_control = await driver.$('input[data-testid=\'firstlogin_password_control\']');
		await password.setValue(pass);
		await driver.pause(1000);
		await password_control.setValue(pass);
		await driver.pause(1000);
		await helpers.waitAndClick(nextBtn);
		await driver.$('.form-submitted');
		let start = await driver.$('a[data-testid="btn_schul-cloud_erkunden"]');
		await start.waitForDisplayed(15000);
		await start.click();
		await driver.pause(1500);
	},
	getInitials: async function() {
		let name = await this.getNameAndPosition();
		let firstCharacter = name[0];
		let length = name.length;
		for (var i=1; i<=length; i++) {
			if (name[i] == " ") {
			secondCharacter = name[i+1];
			break;
			}
		}
		let initials = firstCharacter + secondCharacter;
		return initials;
	},
	getNameAndPosition: async function() {
		let userIcon = await driver.$('.btn-avatar > a');
		await userIcon.click();

		let nameBox = await driver.$(
			'.dropdown-name'
		);
		let name = await nameBox.getText();
		return name;
	},
	logout: async function() {
		let icon = await driver.$('[data-testid="initials"]');
		await icon.click();
		let logOut = await driver.$('[data-testid="logout"]');
		await logOut.waitForDisplayed(3000);
		await logOut.click();
		let usernameField = await driver.$('input[data-testid="username"]');
		await usernameField.waitForDisplayed(3000);
	}
};
