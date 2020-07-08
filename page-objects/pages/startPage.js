'use strict';
const selectors = {
    frontpageLoginBtn: 'a[data-testid="login-btn"]',

};

module.exports = {

    clickLoginBtn: async function() {
    let frontpageLoginBtn = await driver.$(this.selectors.frontPage.frontpageLoginBtn);
    await frontpageLoginBtn.click();
    }
  
}
