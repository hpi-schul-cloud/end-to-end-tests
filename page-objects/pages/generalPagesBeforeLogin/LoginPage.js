/*[url/login]*/
'use strict';
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');

const loginFailureMessages = ['Login fehlgeschlagen.', 'Login failed.'];
const usernameInput = 'section#loginarea input[data-testid="username"]';
const passwordInput = 'section#loginarea input[data-testid="password"]';
const loginBtn = 'input[data-testid="submit-login"]';

const nextSectionBtn = '#nextSection';
const wrongLoginNotificationContainer = '.notification-content';

const defaultPassword = 'Schulcloud1!';
const defaultNewPassword = 'NewPwSchulcloud1!';
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

const consent = {
	privacyCheckbox: 'input[name="privacyConsent"]',
	termsOfUseCheckbox: 'input[name="termsOfUseConsent"]',
};

const startUsageOfSchulcloudBtn = 'a[data-testid="btn_schul-cloud_erkunden"]';

const newOwnPassword = {
	setPassword: 'input[data-testid="firstlogin_password"]',
	setPassordConfirmation: 'input[data-testid="firstlogin_password_control"]',
};

async function setUsername(username) {
	await waitHelpers.waitAndSetValue(usernameInput, username);
}

async function setPassword(password) {
	await waitHelpers.waitAndSetValue(passwordInput, password);
}

async function clickNextSectionBtn() {
	await elementHelpers.clickAndWait(nextSectionBtn);
}

async function clickLoginBtn() {
	await elementHelpers.clickAndWait(loginBtn);
}

async function clickStartUsageOfSchulcloudBtn() {
	await elementHelpers.clickAndWait(startUsageOfSchulcloudBtn);
}

async function acceptDataProtection() {
	await clickOnDataProtectionBoxes();
	await clickNextSectionBtn();
}

/* First Login */

async function performLogin(username, password) {
	await setUsername(username);
	await setPassword(password);
	await clickLoginBtn();
}

async function performLoginActions({shouldAcceptDataProtection, shouldSetOwnPassword, newPassword=defaultNewPassword})  {
	await clickNextSectionBtn();
	await clickNextSectionBtn();
	if (shouldAcceptDataProtection) {
		await acceptDataProtection();
	}
	if (shouldSetOwnPassword) {
		await setNewPassword(newPassword);
	}
	await clickStartUsageOfSchulcloudBtn();
}

async function clickOnDataProtectionBoxes() {
	await elementHelpers.click(consent.privacyCheckbox);
	await elementHelpers.click(consent.termsOfUseCheckbox);
}

async function setNewPassword(newPassword) {
	await waitHelpers.waitAndSetValue(newOwnPassword.setPassword, newPassword);
	await waitHelpers.waitAndSetValue(newOwnPassword.setPassordConfirmation, newPassword);
	await clickNextSectionBtn();
}

async function isWrongLoginNotification() {
	const actualLoginNotification = await elementHelpers.getElementText(wrongLoginNotificationContainer);
	const errorMsg = 'Actual login notification: [' + actualLoginNotification + '] is not one of expected ones: ['+ loginFailureMessages +']';
	expect(actualLoginNotification, errorMsg).to.be.oneOf(loginFailureMessages);
}

module.exports = {
	users,
	performLogin,
	performLoginActions,
	clickOnDataProtectionBoxes,
	setNewPassword,
	isWrongLoginNotification,
	clickNextSectionBtn,
};
