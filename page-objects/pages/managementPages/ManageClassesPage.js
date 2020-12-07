/*[url/administration/classes]*/

const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const addClassBtn = 'a[data-testid="createClass"]';
const classesTabs = 'a.tab span';
const editClassBtn = 'a[title="administration.classes.placeholer.change"]';
const manageClassBtn = 'td > a > .fa-users';

async function clickCreateClassBtn() {
	await elementHelpers.clickAndWait(addClassBtn);
}

async function clickManageClassBtn() {
	await elementHelpers.clickAndWait(manageClassBtn);
}

async function clickEditClassBtn() {
	await elementHelpers.clickAndWait(editClassBtn);
}

async function clickOnClassesTab(tabText) {
	const element = await elementHelpers.getElementByText(classesTabs, tabText);
	await elementHelpers.clickAndWait(element);
}

module.exports = {
	clickCreateClassBtn,
	clickEditClassBtn,
	clickOnClassesTab,
	clickManageClassBtn,
};
