/*[url/administration/school]*/
const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const addLDAPButton = 'form[action="/administration/ldap/config/"] > button:nth-child(3)';

async function clickAddLDAPButton() {
	await elementHelpers.click(addLDAPButton);
}

module.exports = {
	clickAddLDAPButton,
};
