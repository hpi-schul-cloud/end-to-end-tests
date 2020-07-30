'use strict';

const frontpageLoginBtn = 'a[data-testid="login-btn"]';

module.exports = {
    clickLoginBtn: async function () {
        let fpLoginBtn = await driver.$(frontpageLoginBtn);
        await fpLoginBtn.click();
    }
}
