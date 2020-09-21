/*[url/login]*/
'use strict';
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');
const apiHelpers = require('../../../runtime/helpers/APIhelpers');

const failureMessages = ["Login fehlgeschlagen.", "Login failed."];

const selectors = {
	usernameInput: 'section#loginarea input[data-testid="username"]',
	passwordInput: 'section#loginarea input[data-testid="password"]',
	loginBtn: 'input[data-testid="submit-login"]',
	schoolNameSelector: '.nav-item.school-data',
	loginTabs: {
		loginTabs: '#sidebar a > span',
	},
	firstLoginSel: {
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
	},
	sectionNames: {
		sectionOne: '[data-testid="name-section-1"]',
		sectionTwo: '[data-testid="name-section-2"]',
		sectionThree: '[data-testid="name-section-3"]',
		section_three_name: '.panels.mb-2 > section:nth-child(3) > h2',
	},
	nextSectionBtn: '#nextSection',
	avatarCircle: '.avatar-circle',
	notificationIfWrongLogin: '.notification-content',
}

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

module.exports = {

	defaultLoginData, selectors,  
	
	performLogin: async function (username, password) {
		let loginSel = await driver.$(selectors.usernameInput);
		await loginSel.setValue(username);
		let passwordSel = await driver.$(selectors.passwordInput);
		await passwordSel.setValue(password);
		let loginBtnSel = await driver.$(selectors.loginBtn);
		await loginBtnSel.click();
		await driver.pause(1500);
	},
	loginResult: async function () {
		let initials = await apiHelpers.getInitials();
		expect(await elementHelpers.getElementText(selectors.avatarCircle)).to.equal(initials);
	},
	/* First Login */
	firstLoginStudent: async function (newPassword) {
		await waitHelpers.waitAndClick(selectors.firstLoginSel.nextSectionBtn);
		await waitHelpers.waitAndClick(selectors.firstLoginSel.nextSectionBtn);
		// if Data protection is needed
		let section_three_name = await driver.$(selectors.sectionNames.section_three_name);
		if (await section_three_name.getText() == "Einwilligungserklärung") {
			await this.clickOnDataProtectionBoxes();
			await waitHelpers.waitAndClick(selectors.nextSectionBtn);
		};
		await this.setNewPasswordStudent(newPassword);
		await waitHelpers.waitAndClick(selectors.nextSectionBtn);
		await waitHelpers.waitAndClick(selectors.firstLoginSel.startUsageOfSchulcloudBtn);
	},
	firstLoginAdminOrTeacher: async function() {
		await waitHelpers.waitAndClick(selectors.firstLoginSel.nextBtn);
		await waitHelpers.waitAndClick(selectors.firstLoginSel.nextBtn);
		await waitHelpers.waitAndClick(selectors.firstLoginSel.nextBtn);
		await this.clickOnDataProtectionBoxes();
		await waitHelpers.waitAndClick(selectors.firstLoginSel.nextBtn);
		await waitHelpers.waitAndClick(selectors.firstLoginSel.startUsageOfSchulcloudBtn);
	},
	clickOnDataProtectionBoxes: async function() {
		await waitHelpers.waitAndClick(selectors.firstLoginSel.dataProtection.box1);
		await waitHelpers.waitAndClick(selectors.firstLoginSel.dataProtection.box2);
	},
	setNewPasswordStudent: async function(newPassword) {
		let passwordSel1 = await driver.$(selectors.firstLoginSel.setOwnPasswort.passwordSet);
		let passwordSel2 = await driver.$(selectors.firstLoginSel.setOwnPasswort.passwordSet2);
		await passwordSel1.setValue(newPassword);
		await passwordSel2.setValue(newPassword);
	},
	wrongLoginResult: async function () {
		expect(await elementHelpers.getElementText(selectors.notificationIfWrongLogin)).to.be.oneOf(failureMessages);
		// let btn = await driver.$(selectors.loginBtn);
		// let btnValue = btn.getAttribute('value');
		// await expect(btnValue).to.match(/^Bitte.*Sekunden warten$/);
	},
}
