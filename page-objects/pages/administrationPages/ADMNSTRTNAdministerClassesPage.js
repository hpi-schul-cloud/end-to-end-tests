/*[url/administration/classes]*/
/*[url/administration/classes]/create*/

const elementHelpers = require("../../../runtime/helpers/elementHelpers")
const waitHelpers = require("../../../runtime/helpers/waitHelpers")
const ADMNSTRTNAdministrationOverviewPage = require("./ADMNSTRTNAdministrationOverviewPage")

const addClassBtn = "a[data-testid='createClass']"
const moreOptionsBtn = "a[data-testid='classCreationExtraOptions']"
const classNameInput = "input[data-testid='Klassenbezeichnung']"
const addClassConfirmBtn = "button[data-testId='confirmClassCreate']"
const classListTable = "table [data-testid='students_names_container']"
const titleOfAdministrationClassesPage = "Administration: Klassen"
const titleOfCreateNewClassPage = "Erstelle eine neue Klasse"

//Administration: Classes
async function verifyTitleOfAdministrationClassesPage() {
    await waitHelpers.waitUntilPageTitleContains(titleOfAdministrationClassesPage)
}

async function clickCreateClassBtn() {
    await elementHelpers.clickAndWait(addClassBtn)
}

async function verifyNewEmptyClassCreated(className = "11c", numOfStudents = "0") {
    const allClassesContainer = await waitHelpers.waitUntilElementIsPresent(classListTable)
    const allClassesContent = await allClassesContainer.getText()
    const contentArray = allClassesContent.split(" ")
    const currentYear = new Date().getFullYear().toString().substring(2) // 20

    expect(contentArray.length).to.equal(3) // teacher column should be empty and therefore not 4, but 3
    expect(contentArray[0]).to.equal(className)
    expect(contentArray[1].includes(currentYear)).to.equal(true)
    expect(contentArray[2]).to.equal(numOfStudents)
}

//Course creation page
async function verifyTitleOfCreateClassPage() {
    await waitHelpers.waitUntilPageTitleContains(titleOfCreateNewClassPage)
}

async function clickMoreOptionsBtn() {
    await elementHelpers.clickAndWait(moreOptionsBtn)
}

async function setClassName(className) {
    await waitHelpers.waitAndSetValue(classNameInput, className)
}

async function clickConfirmClassCreation() {
    await elementHelpers.clickAndWait(addClassConfirmBtn)
}

async function createNewClass(className) {
    await ADMNSTRTNAdministrationOverviewPage.clickAdministrateClasses()
    await verifyTitleOfAdministrationClassesPage()
    await clickCreateClassBtn()
    await verifyTitleOfCreateClassPage()
    await clickMoreOptionsBtn()
    await setClassName(className)
    await clickConfirmClassCreation()
}

module.exports = {
    verifyNewEmptyClassCreated,
    createNewClass,
}
