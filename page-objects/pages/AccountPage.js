"use strict";

const { click } = require("../../runtime/helpers/elementHelpers.js");
const elementHelpers = require("../../runtime/helpers/elementHelpers.js");
const waitHelpers = require("../../runtime/helpers/waitHelpers.js");
const LoginPage = require("./generalPagesBeforeLogin/LoginPage.js");

const currentPasswordInput = 'input[data-testid="settings_password_current"]';
const newPasswordInput = 'input[data-testid="settings_password_new"]';
const newPasswordConfInput = 'input[data-testid="settings_password_control"]';
const submitAccountDataBtn = '[data-testid="submit_new_password_btn"]';

const languageMenu = {
	german: "//a[@data-testid = 'selected-language-de']",
	english: "//a[@data-testid = 'available-language-en']",
	spanish:"//a[@data-testid = 'available-language-es']",
	ukrainian: "//a[@data-testid = 'available-language-ua']",
};

/*function getLanguageSelector(language) {
	let languageSel = "";
	const action = language.toLowerCase();
	switch (action) {
		case 'german':
			languageSel = languageMenu.german;
			break;
		case 'english':
			languageSel = languageMenu.english;
			break;
		case 'spanish':
			languageSel = languageMenu.spanish;
			break;
		case 'ukrainian':
			languageSel = languageMenu.ukrainian;
			break;
		default:
			console.error(`This language: ${language} does not exist on the list of possible choices`);
			break;
	}
	return languageSel;
}*/

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

async function selectLanguage(language) {
    await elementHelpers.clickAndWait(languageMenu.german);
    if (language === languageMenu.english) {
        await elementHelpers.clickAndWait(languageMenu.english);
        await waitHelpers.waitUntilPageLoads(1500);
    } else if (language === languageMenu.spanish){
        await elementHelpers.clickAndWait(languageMenu.spanish);
        await waitHelpers.waitUntilPageLoads(1500);
    } else if (language === languageMenu.ukrainian){
        await elementHelpers.clickAndWait(languageMenu.ukrainian);
        await waitHelpers.waitUntilPageLoads(1500);
    } else {
        await elementHelpers.clickAndWait(languageMenu.german);
        await waitHelpers.waitUntilPageLoads(1500);
    }
}

async function changePassword(oldPassword, newPassword) {
    await setCurrentPassword(oldPassword);
    await setNewPassword(newPassword);
    await setNewPasswordConfirmation(newPassword);
    await clickSubmitAccountDataBtn();
}

async function fillPassword(password) {
	await setCurrentPassword(password);
}

async function changeLanguage(language) {
	await selectLanguage(language);
}

module.exports = {
	fillPassword,
	changePassword,
	changeLanguage,
};
