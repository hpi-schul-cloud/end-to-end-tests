'use strict';


const waitHelpers = require('../runtime/helpers/waitHelpers.js');
const navigationTopPage = require('../page-objects/pages/NavigationTopPage');
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage');
var secondCharacter;

module.exports = {
	pupilLogin: async function(name,password) {
		await loginPage.performLogin(name, password)
	},
	firstLoginAdminOrTeacher: async function() {
		let nextBtn = await driver.$('#nextSection');
		await nextBtn.click();
		await driver.pause(1500);
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
	/*now use: firstLoginAdminOrTeacher
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
	},*/
	dataProtection: async function() {
	let box1 = await driver.$('input[name=\'privacyConsent\']');
	await box1.waitForExist(2000);
		await box1.click();
		let box2 = await driver.$('input[name=\'termsOfUseConsent\']');
		await box2.waitForExist(2000);
		await box2.click();
	},
	firstLoginPupilFullAge: async function(pass) {
		let nextBtn = "#nextSection";
		await waitHelpers.waitAndClick(nextBtn);
		await driver.pause(1000);
		await waitHelpers.waitAndClick(nextBtn);
		// if Data protection is needed
		let section_three_name = await driver.$('.panels.mb-2 > section:nth-child(3) > h2');
		if (await section_three_name.getText()== "Einwilligungserklärung") {
			await this.dataProtection();
			await waitHelpers.waitAndClick(nextBtn)
		}
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
		await navigationTopPage.performLogout();
	},
	loginAsPupil: async function(name, pass) {
		await navigationTopPage.performLogout();
		await this.pupilLogin(name,pass);
		await this.firstLoginPupilFullAge(name, pass);
	}
};
