/*[url/administration]*/
const { CLIENT } = require('../../../shared-objects/servers');
const elementHelpers = require("../../../runtime/helpers/elementHelpers.js");
const urlAdministrationPage = `${CLIENT.URL}/administration`;

const selectors = { 
    
    administrateStudentsBtn: 'div[data-testid=\'administrate_students\']',
    administrateTeachersBtn: 'div[data-testid=\'administrate_teachers\']',
    administrateClassesBtn:'div[data-testid=\'administrate_classes\']',
    administrationsTabs: 'ul.subitems span'}

module.exports = {
    selectors,
    goToAdministration: async function() {
        await elementHelpers.loadPage(urlAdministrationPage, 20)
    }
}
