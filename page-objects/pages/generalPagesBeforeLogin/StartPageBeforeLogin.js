'use strict';

const waitHelpers = require("../../../runtime/helpers/waitHelpers");

const frontpageLoginBtn = "a[data-testid='login-btn']";
const frontpageLoginBtn2 = "a[data-testid='login-btnadsdasd']";


module.exports = {
    clickLoginBtn: async function () {
        await waitHelpers.waitForPageToLoading();
        const element = await driver.$(frontpageLoginBtn);
        const element2 = await driver.$(frontpageLoginBtn2);
    
        await waitHelpers.waitUntilElementIsPresent(element);
        await waitHelpers.waitUntilElementIsPresent(element2);
        await waitHelpers.waitAndClick(frontpageLoginBtn);
    }
}
