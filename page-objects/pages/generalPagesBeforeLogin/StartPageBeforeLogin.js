'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const frontpageLoginBtn = "a[data-testid='login-btn']";

async function clickLoginBtn() {
	await elementHelpers.click(frontpageLoginBtn);
}

module.exports = {
	clickLoginBtn,
};
