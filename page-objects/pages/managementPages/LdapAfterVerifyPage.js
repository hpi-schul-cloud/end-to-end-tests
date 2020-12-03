const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const submitButton = 'button[data-testid="ldapSubmitButton"]';

async function isButtonPresent() {
	await waitHelpers.waitUntilElementIsPresent(submitButton);
}

module.exports = {
	isButtonPresent,
};
