/*[url/administration]*/
const { CLIENT } = require('../../../shared-objects/servers');

module.exports = {
    urlAdministration: `${CLIENT.URL}/administration`,
    administrateStudentsBtn: 'div[data-testid=\'administrate_students\']',
    administrateTeachersBtn: 'div[data-testid=\'administrate_teachers\']',
    administrateClassesBtn:'div[data-testid=\'administrate_classes\']',
    administrationsTabs: 'ul.subitems span'
}
