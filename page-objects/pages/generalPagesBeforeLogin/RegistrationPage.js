const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const mailCatcher = require('../../../runtime/helpers/mailCatcher');
const { expect } = require('chai');
const showAgeSelectionBtn = '#showAgeSelection';
const under16RadioButton = '#reg-u16';
const showRegistrationFormBtn = '#showRegistrationForm';
const parentFirstNameInput = 'input[name="parent_firstName"]';
const parentLastNameInput = 'input[name="parent_lastName"]';
const parentEmailInput = 'input[name="parent_email"]';
const nextSectionBtn = '#nextSection';
const parentalAuthConsent = 'input[name="parent_parentalAuthConsent"]';
const privacyConsent = 'input[name="parent_privacyConsent"]';
const termsOfUseConsent = 'input[name="parent_termsOfUseConsent"]';
const requestPinBtn = '#resend-pin';
const pinDigit1 = '.digit';
const pinDigit2 = '.digit:nth-child(3)';
const pinDigit3 = '.digit:nth-child(4)';
const pinDigit4 = '.digit:nth-child(5)';
const pinField = '.submit-page > div > div > input ';

async function goToAgeSelection() {
	await elementHelpers.click(showAgeSelectionBtn);
}

async function clickUnder16Btn() {
	await elementHelpers.click(under16RadioButton);
	await elementHelpers.click(showRegistrationFormBtn);
}

async function addParentData(parentFirstName, parentLastName, parentEmail) {
	await waitHelpers.waitAndSetValue(parentFirstNameInput, parentFirstName);
	await waitHelpers.waitAndSetValue(parentLastNameInput, parentLastName);
	await waitHelpers.waitAndSetValue(parentEmailInput, parentEmail);
	await elementHelpers.click(nextSectionBtn);
}

async function acceptConsent() {
	await elementHelpers.click(parentalAuthConsent);
	await elementHelpers.click(privacyConsent);
	await elementHelpers.click(termsOfUseConsent);
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
	getTitleText,
	addParentData,
	clickRequestPin,
	goToAgeSelection,
	clickUnder16Btn,
};
