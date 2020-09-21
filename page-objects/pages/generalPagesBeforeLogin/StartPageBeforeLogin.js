'use strict';

const waitHelpers = require("../../../runtime/helpers/waitHelpers");

const selectors = {
    frontpageLoginBtn: "a[data-testid='login-btn']",
};

module.exports = {
    clickLoginBtn: async function () {
        await waitHelpers.waitAndClick(selectors.frontpageLoginBtn);
    }
}
