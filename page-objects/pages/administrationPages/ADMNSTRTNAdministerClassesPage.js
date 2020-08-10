/*[url/administration/classes]*/
const { CLIENT } = require("../../../shared-objects/servers");

module.exports = {
    urlKlassenVerwalten: `${CLIENT.URL}/administration/classes`,
    classCreateBtn: 'a[data-testid=\'createClass\']',
    classCreationExtraOptions: 'a[data-testid=\'classCreationExtraOptions\']',
    classNameInputField: 'input[data-testid=\'Klassenbezeichnung\']',
    confirmClassCreate: 'button[data-testId=\'confirmClassCreate\']',
}
