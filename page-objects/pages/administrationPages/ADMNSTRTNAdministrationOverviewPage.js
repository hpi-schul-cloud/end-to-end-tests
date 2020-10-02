/*[url/administration]*/
"use strict"
const { CLIENT } = require("../../../shared-objects/servers")
const elementHelpers = require("../../../runtime/helpers/elementHelpers")
const waitHelpers = require("../../../runtime/helpers/waitHelpers")

const urlAdministration = `${CLIENT.URL}/administration`
const administrateStudentsBtn = "div[data-testid='administrate_students']"
const administrateTeachersBtn = "div[data-testid='administrate_teachers']"
const administrateClassesBtn = "div[data-testid='administrate_classes']"
const administrationsSubItems = "//*[@id='sidebar']/ul/li/ul//*/span"

async function goToAdministrationPage() {
    await elementHelpers.loadPage(urlAdministration, 10)
}

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
    goToAdministrationPage,
    clickAdministrateStudents,
    clickAdministrateClasses,
    clickAdministrateTeachers,
    getListOfAdministrationTabs,
}
