'use strict';

const waitHelpers = require("../../../runtime/helpers/waitHelpers");

const frontpageLoginBtn = "a[data-testid='login-btn']";

module.exports = {
    clickLoginBtn: async function () {
        await waitHelpers.waitAndClick(frontpageLoginBtn);
    }
}
