'use strict';

const elementHelpers = require("../../../runtime/helpers/elementHelpers");

const frontpageLoginBtn = "a[data-testid='login-btn']";

module.exports = {
    clickLoginBtn: async function () {
        await elementHelpers.click(frontpageLoginBtn);
    }
}
