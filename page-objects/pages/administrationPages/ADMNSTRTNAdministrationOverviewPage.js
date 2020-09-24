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

async function goToAdministrationPage() {
    await elementHelpers.loadPage(urlAdministration, 10)
};
async function clickAdministrateStudents() {
    await waitHelpers.waitAndClick(administrateStudentsBtn);
};
async function clickAdministrateClasses() {
    await waitHelpers.waitAndClick(administrateClassesBtn);
};
async function clickAdministrateTeachers() {
    await waitHelpers.waitAndClick(administrateTeachersBtn);
};
async function getListOfAdministrationTabs() {
    let items = await driver.$$(administrationsSubItems);
    return items;
};

module.exports = {
    goToAdministrationPage,
    clickAdministrateStudents,
    clickAdministrateClasses,
    clickAdministrateTeachers,
    getListOfAdministrationTabs,
}


