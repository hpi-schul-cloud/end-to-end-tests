"use strict";

const elementHelpers = require("../../runtime/helpers/elementHelpers.js");
const waitHelpers = require("../../runtime/helpers/waitHelpers.js");
const LoginPage = require("./generalPagesBeforeLogin/LoginPage.js");

const currentPasswordInput = 'input[data-testid="settings_password_current"]';
const newPasswordInput = 'input[data-testid="settings_password_new"]';
const newPasswordConfInput = 'input[data-testid="settings_password_control"]';
const submitAccountDataBtn = '[data-testid="submit_new_password_btn"]';

const languageSelect = 'select#language';
const languageOptions = 'option';

async function clickSubmitAccountDataBtn() {
    await elementHelpers.clickAndWait(submitAccountDataBtn);
}

async function setCurrentPassword(currentPassword = LoginPage.defaultPassword) {
    await waitHelpers.waitAndSetValue(currentPasswordInput, currentPassword);
}

async function setNewPassword(newPassword = LoginPage.defaultNewPassword) {
    await waitHelpers.waitAndSetValue(newPasswordInput, newPassword);
}

async function setNewPasswordConfirmation(newPassword = LoginPage.defaultNewPassword) {
    await waitHelpers.waitAndSetValue(newPasswordConfInput, newPassword);
}

async function setLanguage(language) {
    await elementHelpers.selectOptionByText(languageSelect, language);
}

async function changePassword(oldPassword, newPassword) {
    await setCurrentPassword(oldPassword);
    await setNewPassword(newPassword);
    await setNewPasswordConfirmation(newPassword);
    await clickSubmitAccountDataBtn();
}

async function changeLanguage(language) {
	await setLanguage(language);
    await clickSubmitAccountDataBtn();
}

module.exports = {
	changePassword,
	changeLanguage,
};
