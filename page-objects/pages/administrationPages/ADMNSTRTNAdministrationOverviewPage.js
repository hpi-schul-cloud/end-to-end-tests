/*[url/administration]*/
"use strict"

const elementHelpers = require("../../../runtime/helpers/elementHelpers")
const waitHelpers = require("../../../runtime/helpers/waitHelpers")
const navigationLeftPanel = require("../NavigationLeftPage");
const administrateStudentsBtn = "div[data-testid='administrate_students']"
const administrateTeachersBtn = "div[data-testid='administrate_teachers']"
const administrateClassesBtn = "div[data-testid='administrate_classes']"
const administrationsSubItems = "//*[@id='sidebar']/ul/li/ul//*/span"

async function clickAdministrateStudents() {
    await elementHelpers.clickAndWait(administrateStudentsBtn)
}

async function clickAdministrateClasses() {
    await elementHelpers.clickAndWait(administrateClassesBtn)
}

async function clickAdministrateTeachers() {
    await elementHelpers.clickAndWait(administrateTeachersBtn)
}

async function getListOfAdministrationTabs() {
    await waitHelpers.waitUntilPageLoads();
    let items = await driver.$$(administrationsSubItems)
    return items
}

module.exports = {
    clickAdministrateStudents,
    clickAdministrateClasses,
    clickAdministrateTeachers,
    getListOfAdministrationTabs,
}
