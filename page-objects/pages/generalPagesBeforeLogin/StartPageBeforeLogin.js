'use strict';

module.exports = {

    selectors: {
        frontpageLoginBtn: 'a[data-testid="login-btn"]',

    },

    clickLoginBtn: async function () {
        let frontpageLoginBtn = await driver.$(this.selectors.frontpageLoginBtn);
        await frontpageLoginBtn.click();
    }
}
