/*[url/administration]*/
const { CLIENT } = require('../../../shared-objects/servers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');

module.exports = {
    urlAdministration: `${CLIENT.URL}/administration`,
    administrateStudentsBtn: 'div[data-testid=\'administrate_students\']',
    administrateTeachersBtn: 'div[data-testid=\'administrate_teachers\']',
    administrateClassesBtn:'div[data-testid=\'administrate_classes\']',
    administrationsTabs: 'ul.subitems span',

    goToAdministrationPage: async function() {
        await elementHelpers.loadPage(urlAdministration, 20);
    },
    clickAdministrateStudents: async function() {
        await waitHelpers.waitAndClick(administrateStudentsBtn);
    },
    clickAdministrateClasses: async function() {
        await waitHelpers.waitAndClick(administrateClassesBtn);
    },
    clickAdministrateTeachers: async function() {
        await waitHelpers.waitAndClick(administrateTeachersBtn);
    },
}
