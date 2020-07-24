'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers.js');

module.exports = {
    selectors: {
        currentPasswordInp: 'input[data-testid="settings_password_current"]',
        newPasswordInpt: 'input[data-testid="settings_password_new"]',
        repeatNewPasswordInp: 'input[data-testid="settings_password_control"]',
        submitAccountDataBtn: '[data-testid="submit_new_password_btn"]',
    },

    setNewPassword: async function (oldPAssword, newPassword) {
        let currentPassword = await driver.$(this.selectors.currentPasswordInp);
        await currentPassword.setValue(oldPAssword);
        let passwordField = await driver.$(this.selectors.newPasswordInpt);
        await passwordField.setValue(newPassword);
        let passwordControlField = await driver.$(this.selectors.repeatNewPasswordInp);
        await passwordControlField.setValue(newPassword);
        await waitHelpers.waitAndClick(this.selectors.submitAccountDataBtn);
    }
}
