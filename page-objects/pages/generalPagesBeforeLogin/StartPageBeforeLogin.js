'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers.js');

const frontpageLoginBtn = "a[data-testid='login-btn']";

async function clickLoginBtn() {
	await waitHelpers.waitUntilPageLoads();
	await elementHelpers.click(frontpageLoginBtn);
}

module.exports = {
	clickLoginBtn,
};
