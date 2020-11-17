/*[url/administration/teacher[teacherId]/edit]*/

const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const deleteButton = '.btn-delete';
const deleteButtonConfirmation = '.delete-modal.in  button.btn-submit';

async function clickDeleteBtn() {
		await elementHelpers.click(deleteButton);
}

async function clickDeleteInModal() {
	await elementHelpers.clickAndWait(deleteButtonConfirmation);
}

module.exports = {
	clickDeleteBtn,
	clickDeleteInModal,
};
