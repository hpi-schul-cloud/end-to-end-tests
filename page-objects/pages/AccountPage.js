"use strict";

const elementHelpers = require("../../runtime/helpers/elementHelpers.js");

const currentPasswordInp = 'input[data-testid="settings_password_current"]';
const newPasswordInpt = 'input[data-testid="settings_password_new"]';
const repeatNewPasswordInp = 'input[data-testid="settings_password_control"]';
const submitAccountDataBtn = '[data-testid="submit_new_password_btn"]';

module.exports = {
    setNewPassword: async function (oldPAssword, newPassword) {
        let currentPassword = await driver.$(currentPasswordInp);
        await currentPassword.setValue(oldPAssword);
        let passwordField = await driver.$(newPasswordInpt);
        await passwordField.setValue(newPassword);
        let passwordControlField = await driver.$(repeatNewPasswordInp);
        await passwordControlField.setValue(newPassword);
        await elementHelpers.click(submitAccountDataBtn);
    },
};
