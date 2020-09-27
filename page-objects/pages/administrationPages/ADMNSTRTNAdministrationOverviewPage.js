/*[url/administration]*/
'use strict';

const waitHelpers = require('../../../runtime/helpers/waitHelpers');

const navigationLeftPanel = require('../NavigationLeftPage');
const administrateStudentsBtn = "div[data-testid='administrate_students']";
const administrateTeachersBtn = "div[data-testid='administrate_teachers']";
const administrateClassesBtn = "div[data-testid='administrate_classes']";
const administrationsSubItems = "//*[@id='sidebar']/ul/li/ul//*/span";

module.exports = {
    goToAdministrationPage: async function () {
        await navigationLeftPanel.clickNavItemAdministration();
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


