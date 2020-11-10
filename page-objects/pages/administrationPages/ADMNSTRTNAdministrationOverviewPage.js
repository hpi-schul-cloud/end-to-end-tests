/*[url/administration]*/
"use strict"

const elementHelpers = require("../../../runtime/helpers/elementHelpers")
const NavigationLeftPage = require("../NavigationLeftPage");

async function goToAdministrateStudents() {
    await NavigationLeftPage.clickNavItemAdminStudents();
}

async function goToAdministrateClasses() {
    await NavigationLeftPage.clickNavItemAdminClasses();
}

async function goToAdministrateTeachers() {
    await elementHelpers.clickAdministrateTeachers();
}

module.exports = {
    goToAdministrateStudents,
    goToAdministrateClasses,
    goToAdministrateTeachers,
}
