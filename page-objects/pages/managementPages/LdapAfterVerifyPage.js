const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const submitButton = 'button[data-testid="ldapSubmitButton"]';
const usersTable = 'table[data-testid="ldapUsersActivateTable"]';

async function isButtonPresent() {
	await waitHelpers.waitUntilElementIsPresent(submitButton);
}

async function isUsersTablePresent() {
	await waitHelpers.waitUntilElementIsPresent(usersTable);
}

module.exports = {
	isButtonPresent,
	isUsersTablePresent,
};
