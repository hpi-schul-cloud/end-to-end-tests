/*[url/login]*/
'use strict';
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const apiHelpers = require('../../../runtime/helpers/APIhelpers');

const failureMessages = ["Login fehlgeschlagen.", "Login failed."];
const usernameInput = 'section#loginarea input[data-testid="username"]';
const passwordInput = 'section#loginarea input[data-testid="password"]';
const loginBtn = 'input[data-testid="submit-login"]';
const schoolNameSelector = '.nav-item.school-data';

const defaultLoginData = {
	defaultTeacherUsername: 'klara.fall@schul-cloud.org',
	defaultTeacherUsername2: 'lehrer@schul-cloud.org',
	defaultTeacherpassword: 'Schulcloud1!',
	eligiblePupilUsername: 'demo-schueler@schul-cloud.org',
	eligiblePupilPassword: 'schulcloud',
	notEligiblePupilUsername: 'paula.meyer@schul-cloud.org',
	notEligiblePupilPassword: 'Schulcloud1!',
	defaultAdminUsername: 'admin@schul-cloud.org',
	defaultAdminPassword: 'Schulcloud1!',
};
const loginTabs = {
	loginTabs: '#sidebar a > span',
};
const firstLoginSel = {
	dataProtection: {
		box1: 'input[name="privacyConsent"]',
		box2: 'input[name="termsOfUseConsent"]',
	},
	nextBtn: '#nextSection',
	startUsageOfSchulcloudBtn: 'a[data-testid="btn_schul-cloud_erkunden"]',

	setOwnPasswort: {
		passwordSet: 'input[data-testid="firstlogin_password"]',
		passwordSet2: 'input[data-testid="firstlogin_password_control"]',
	},
	sectionNames: {
		sectionOne: '[data-testid="name-section-1"]',
		sectionTwo: '[data-testid="name-section-2"]',
		sectionThree: '[data-testid="name-section-3"]',
	},
	nextSectionBtn: '#nextSection',
}

module.exports = {
	defaultLoginData, loginTabs, schoolNameSelector,
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
		let initials = await apiHelpers.getInitials();
		expect(await elementHelpers.getElementText('.avatar-circle')).to.equal(initials);
	},

	/* First Login */

	firstLoginStudent: async function (newPassword) {

		await waitHelpers.waitAndClick(firstLoginSel.nextSectionBtn);
		await waitHelpers.waitAndClick(firstLoginSel.nextSectionBtn);
		// if Data protection is needed
		let section_three_name = await driver.$('.panels.mb-2 > section:nth-child(3) > h2');
		if (await section_three_name.getText() == "Einwilligungserklärung") {
			await this.clickOnDataProtectionBoxes();
			await waitHelpers.waitAndClick(firstLoginSel.nextSectionBtn);
		};
		await this.setNewPasswordStudent(newPassword);
		await waitHelpers.waitAndClick(firstLoginSel.nextSectionBtn);
		await waitHelpers.waitAndClick(firstLoginSel.startUsageOfSchulcloudBtn);
	},

	firstLoginAdminOrTeacher: async function() {
		await waitHelpers.waitAndClick(firstLoginSel.nextBtn);
		await waitHelpers.waitAndClick(firstLoginSel.nextBtn);
		await waitHelpers.waitAndClick(firstLoginSel.nextBtn);
		await this.clickOnDataProtectionBoxes();
		await waitHelpers.waitAndClick(firstLoginSel.nextBtn);
		await waitHelpers.waitAndClick(firstLoginSel.startUsageOfSchulcloudBtn);
	},
	clickOnDataProtectionBoxes: async function() {
		await waitHelpers.waitAndClick(firstLoginSel.dataProtection.box1);
		await waitHelpers.waitAndClick(firstLoginSel.dataProtection.box2);
	},
	setNewPasswordStudent: async function(newPassword) {
		let passwordSel1 = await driver.$(firstLoginSel.setOwnPasswort.passwordSet);
		let passwordSel2 = await driver.$(firstLoginSel.setOwnPasswort.passwordSet2);
		await passwordSel1.setValue(newPassword);
		await passwordSel2.setValue(newPassword);
	},


	wrongLoginResult: async function () {
		expect(await elementHelpers.getElementText(".notification-content")).to.be.oneOf(failureMessages);
		// let btn = await driver.$(loginBtn);
		// let btnValue = btn.getAttribute('value');
		// await expect(btnValue).to.match(/^Bitte.*Sekunden warten$/);
	},
}
