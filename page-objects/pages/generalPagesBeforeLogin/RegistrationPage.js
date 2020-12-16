const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const mailCatcher = require('../../../runtime/helpers/mailCatcher');
const showAgeSelectionBtn = '#showAgeSelection';
const under16RadioButton = '#reg-u16';
const over16RadioButton = '#reg-16';
const showRegistrationFormBtn = '#showRegistrationForm';
const parentFirstNameInput = 'input[name="parent_firstName"]';
const parentLastNameInput = 'input[name="parent_lastName"]';
const parentEmailInput = 'input[name="parent_email"]';
const nextSectionBtn = '#nextSection';
const parentalAuthConsent = 'input[name="parent_parentalAuthConsent"]';
const studentPrivacyCosent = 'input[name="privacyConsent"]';
const privacyConsent = 'input[name="parent_privacyConsent"]';
const termsOfUseConsent = 'input[name="parent_termsOfUseConsent"]';
const studentTermsOfUseConsent = 'input[name="termsOfUseConsent"]';
const requestPinBtn = '#resend-pin';
const pinDigit1 = '.digit';
const pinDigit2 = '.digit:nth-child(3)';
const pinDigit3 = '.digit:nth-child(4)';
const pinDigit4 = '.digit:nth-child(5)';
const pinField = '.submit-page > div > div > input ';
const generatedPassword = '.student-password';
const loginButton = '.btn-primary';

async function goToAgeSelection() {
	await elementHelpers.click(showAgeSelectionBtn);
}

async function getGeneratedPassword() {
	return await elementHelpers.getElementText(generatedPassword);
}

async function clickLoginButton() {
	await elementHelpers.click(loginButton);
}

async function clickUnder16Btn() {
	await elementHelpers.click(under16RadioButton);
	await elementHelpers.click(showRegistrationFormBtn);
}

async function clickOver16Btn() {
	await elementHelpers.click(over16RadioButton);
	await elementHelpers.click(showRegistrationFormBtn);
}

async function addParentData(parentFirstName, parentLastName, parentEmail) {
	await waitHelpers.waitAndSetValue(parentFirstNameInput, parentFirstName);
	await waitHelpers.waitAndSetValue(parentLastNameInput, parentLastName);
	await waitHelpers.waitAndSetValue(parentEmailInput, parentEmail);
	await elementHelpers.click(nextSectionBtn);
}

async function acceptConsent(under16) {
	if (under16) {
		await elementHelpers.click(parentalAuthConsent);
		await elementHelpers.click(privacyConsent);
		await elementHelpers.click(termsOfUseConsent);
	} else {
		await elementHelpers.click(studentPrivacyCosent);
		await elementHelpers.click(studentTermsOfUseConsent);
	}
	await elementHelpers.click(nextSectionBtn);
}

async function clickRequestPin() {
	await elementHelpers.click(requestPinBtn);
}

async function getTitleText() {
	const isPasswortSent = await mailCatcher.isPasswordSent();
	return isPasswortSent;
}

async function addPin(pin) {
	await elementHelpers.clickAndWait(pinDigit1);
	await waitHelpers.waitAndSetValue(pinDigit1, pin[0]);
	await elementHelpers.clickAndWait(pinDigit2);
	await waitHelpers.waitAndSetValue(pinDigit2, pin[1]);
	await elementHelpers.clickAndWait(pinDigit3);
	await waitHelpers.waitAndSetValue(pinDigit3, pin[2]);
	await elementHelpers.clickAndWait(pinDigit4);
	await waitHelpers.waitAndSetValue(pinDigit4, pin[3]);
	await elementHelpers.clickAndWait(nextSectionBtn);
}

module.exports = {
	addPin,
	acceptConsent,
	getGeneratedPassword,
	getTitleText,
	addParentData,
	clickLoginButton,
	clickRequestPin,
	goToAgeSelection,
	clickUnder16Btn,
	clickOver16Btn,
};
