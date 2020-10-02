/*[url/login]*/
'use strict';
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');
const apiHelpers = require('../../../runtime/helpers/APIhelpers');

const failureMessages = ['Login fehlgeschlagen.', 'Login failed.'];
const usernameInput = 'section#loginarea input[data-testid="username"]';
const passwordInput = 'section#loginarea input[data-testid="password"]';
const loginBtn = 'input[data-testid="submit-login"]';

const sectionNames = {
	sectionOne: '[data-testid="name-section-1"]',
	sectionTwo: '[data-testid="name-section-2"]',
	sectionThree: '[data-testid="name-section-3"]',
	section_three_name: '.panels.mb-2 > section:nth-child(3) > h2',
};
const nextSectionBtn = '#nextSection';
const avatarCircle = '.avatar-circle';
const notificationIfWrongLogin = '.notification-content';

const defaultPassword = 'Schulcloud1!';

const users = {
	teachers: {
		klaraFallUsername: 'klara.fall@schul-cloud.org',
		klaraFallPassword: defaultPassword,
		cordCarlUsername: 'lehrer@schul-cloud.org',
		cordCarlPassword: defaultPassword,
	},

	admins: {
		thorstenTestUsername: 'admin@schul-cloud.org',
		thorstenTestPassword: defaultPassword,
	},

	students: {
		fritzSchmidtUsername: 'demo-schueler@schul-cloud.org',
		fritzSchmidtPassword: 'schulcloud',
		paulaMayerUsername: 'paula.meyer@schul-cloud.org',
		paulaMayerPassword: defaultPassword,
	},
};

const firstLoginSel = {
	dataProtection: {
		box1: 'input[name="privacyConsent"]',
		box2: 'input[name="termsOfUseConsent"]',
	},
	startUsageOfSchulcloudBtn: 'a[data-testid="btn_schul-cloud_erkunden"]',

	setOwnPasswort: {
		passwordSet: 'input[data-testid="firstlogin_password"]',
		passwordSet2: 'input[data-testid="firstlogin_password_control"]',
	},
};

module.exports = {
	users,

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
		expect(await elementHelpers.getElementText(avatarCircle)).to.equal(initials);
	},
	/* First Login */
	firstLoginStudent: async function (newPassword) {
		await elementHelpers.click(nextSectionBtn);
		await elementHelpers.click(nextSectionBtn);
		// if Data protection is needed
		let section_three_name = await driver.$(sectionNames.section_three_name);
		if ((await section_three_name.getText()) == 'Einwilligungserklärung') {
			await this.clickOnDataProtectionBoxes();
			await elementHelpers.click(nextSectionBtn);
		}
		await this.setNewPasswordStudent(newPassword);
		await elementHelpers.click(nextSectionBtn);
		await elementHelpers.click(firstLoginSel.startUsageOfSchulcloudBtn);
	},

	firstLoginAdminOrTeacher: async function () {
		await elementHelpers.clickAndWait(nextSectionBtn);
		await elementHelpers.clickAndWait(nextSectionBtn);
		await elementHelpers.clickAndWait(nextSectionBtn);
		await this.clickOnDataProtectionBoxes();
		await elementHelpers.clickAndWait(nextSectionBtn);
		await elementHelpers.clickAndWait(firstLoginSel.startUsageOfSchulcloudBtn);
	},
	clickOnDataProtectionBoxes: async function () {
		await elementHelpers.click(firstLoginSel.dataProtection.box1);
		await elementHelpers.click(firstLoginSel.dataProtection.box2);
	},
	setNewPasswordStudent: async function (newPassword) {
		let passwordSel1 = await driver.$(firstLoginSel.setOwnPasswort.passwordSet);
		let passwordSel2 = await driver.$(firstLoginSel.setOwnPasswort.passwordSet2);
		await passwordSel1.setValue(newPassword);
		await passwordSel2.setValue(newPassword);
	},
	wrongLoginResult: async function () {
		expect(await elementHelpers.getElementText(notificationIfWrongLogin)).to.be.oneOf(failureMessages);
		// let btn = await driver.$(loginBtn);
		// let btnValue = btn.getAttribute('value');
		// await expect(btnValue).to.match(/^Bitte.*Sekunden warten$/);
	},

	clickNextSelection: async function () {
		await elementHelpers.click(nextSectionBtn);
	},
};
