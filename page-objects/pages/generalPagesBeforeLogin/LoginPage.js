/*[url/login]*/
'use strict';
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');

const loginFailureMessages = ['Login fehlgeschlagen.', 'Login failed.'];
const usernameInput = 'section#loginarea input[data-testid="username"]';
const passwordInput = 'section#loginarea input[data-testid="password"]';
const loginBtn = 'input[data-testid="submit-login"]';
const forgotPasswordBtn = 'a.submit-pwrecovery';
const fillEmailInputResetPassword = '.modal-body input.form-control';
const resetPasswordBtn = '.modal-footer > button.btn-submit';

const nextSectionBtn = '#nextSection';
const wrongLoginNotificationContainer = '.notification-content';

const defaultPassword = 'Schulcloud1qa!';
const defaultNewPassword = 'NewPwSchulcloud1!';
const users = {
	teachers: {
		karlHerzogUsername: 'karl.teacher.qa@schul-cloud.org',
		karlHerzogPassword: defaultPassword,
	},

	admins: {
		kaiPreetzUsername: 'kai.admin.qa@schul-cloud.org',
		kaiPreetzPassword: defaultPassword,
	},

	students: {
		fritzSchmidtUsername: 'demo-schueler@schul-cloud.org',
		fritzSchmidtPassword: 'schulcloud',
		borisWasserUsername: 'boris.wasser.qa@schul-cloud.org',
		borisWasserPassword: defaultPassword,
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

async function clickForgotPasswordBtn() {
	await elementHelpers.clickAndWait(forgotPasswordBtn);
}

async function FillEmailInputAndReset(email) {
	await waitHelpers.waitAndSetValue(fillEmailInputResetPassword, email);
	await elementHelpers.clickAndWait(resetPasswordBtn)
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

async function performLoginActions({shouldAcceptDataProtection, shouldSetOwnPassword, newPassword=defaultPassword})  {
	await clickNextSectionBtn();
	await clickNextSectionBtn();
	if (shouldAcceptDataProtection) await acceptDataProtection();
	if (shouldSetOwnPassword) await setNewPassword(newPassword);
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
	defaultPassword,
	defaultNewPassword,
	users,
	clickForgotPasswordBtn,
	FillEmailInputAndReset,
	performLogin,
	performLoginActions,
	clickOnDataProtectionBoxes,
	setNewPassword,
	isWrongLoginNotification,
	clickNextSectionBtn,
};
