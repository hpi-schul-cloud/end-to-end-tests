/*[url/administration/classes/id/manage]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const submitBtn = 'button[type="submit"]';

async function clickSubmitBtn() {
	await elementHelpers.click(submitBtn);
}

module.exports = {
	clickSubmitBtn,
};
