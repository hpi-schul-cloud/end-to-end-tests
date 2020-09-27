/*[url/administration]*/
'use strict';
const { CLIENT } = require('../../../shared-objects/servers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');

const urlAdministration = `${CLIENT.URL}/administration`;
const administrateStudentsBtn = "div[data-testid='administrate_students']";
const administrateTeachersBtn = "div[data-testid='administrate_teachers']";
const administrateClassesBtn = "div[data-testid='administrate_classes']";
const administrationsSubItems = "//*[@id='sidebar']/ul/li/ul//*/span";
const administrationBtnOnLeftNavigationPanel = "[data-testid='Verwaltung']"

module.exports = {
    goToAdministrationPage: async function () {
        await waitHelpers.waitAndClick(administrationBtnOnLeftNavigationPanel);
    },
    clickAdministrateStudents: async function () {
        await waitHelpers.waitAndClick(administrateStudentsBtn);
    },
    clickAdministrateClasses: async function () {
        await waitHelpers.waitAndClick(administrateClassesBtn);
    },
    clickAdministrateTeachers: async function () {
        await waitHelpers.waitAndClick(administrateTeachersBtn);
    },
    getListOfAdministrationTabs: async function () {
        let items = await driver.$$(administrationsSubItems);
        return items;
    }
}


