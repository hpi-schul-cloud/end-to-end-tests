/*[url/administration/classes/id/manage]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const studentSelect = 'select:nth-child(3)';
const submitBtn = 'button[type="submit"]';

async function setStudent(studentName) {
	const script = `document.querySelector('${studentSelect}').setAttribute("style", "display: block;");`;
	await driver.execute(script);
	await elementHelpers.selectOptionByText(studentSelect, studentName);
}

async function clickSubmitBtn() {
	await elementHelpers.click(submitBtn);
}

module.exports = {
	setStudent,
	clickSubmitBtn,
};
