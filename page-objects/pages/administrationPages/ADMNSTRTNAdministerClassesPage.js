/*[url/administration/classes]*/
/*[url/administration/classes]/create*/

const elementHelpers = require("../../../runtime/helpers/elementHelpers")
const waitHelpers = require("../../../runtime/helpers/waitHelpers")
const ADMNSTRTNAdministrationOverviewPage = require("./ADMNSTRTNAdministrationOverviewPage")
const ADMNSTRTNManageClassPage = require("./ADMNSTRTNManageClassPage")
const ADMNSTRTNEditClassPage = require("./ADMNSTRTNEditClassPage")


const addClassBtn = "a[data-testid='createClass']"
const moreOptionsBtn = "a[data-testid='classCreationExtraOptions']"
const classNameInput = "input[data-testid='Klassenbezeichnung']"
const addClassConfirmBtn = "button[data-testId='confirmClassCreate']"
const switchClassesTab = "[data-tab='js-upcoming']"
const classListTable = "table [data-testid='students_names_container']"
const titleOfAdministrationClassesPage = "Klassen"
const titleOfCreateNewClassPage = "Erstelle eine neue Klasse"

//Administration: Classes
async function isTitleOfAdministrationClassesPage() {
    await waitHelpers.waitUntilPageTitleContains(titleOfAdministrationClassesPage)
}

async function clickCreateClassBtn() {
    await elementHelpers.clickAndWait(addClassBtn)
}

async function isNewEmptyClassCreated(className = "11c", numOfStudents = "0") {
    const allClassesContainer = await waitHelpers.waitUntilElementIsVisible(classListTable)
    const allClassesContent = await allClassesContainer.getText()
    const contentArray = allClassesContent.split(" ")
    const currentYear = new Date().getFullYear().toString().substring(2) // 20

    expect(contentArray.length).to.equal(3) // teacher column should be empty and therefore not 4, but 3
    expect(contentArray[0]).to.equal(className)
    expect(contentArray[1].includes(currentYear)).to.equal(true)
    expect(contentArray[2]).to.equal(numOfStudents)
}

async function isClassEdited(newClassName, teacherLastname) {
    const allClassesContainer = await waitHelpers.waitUntilElementIsVisible(classListTable)
    const allClassesContent = await allClassesContainer.getText()
    const contentArray = allClassesContent.split(" ")

    expect(contentArray.length).to.equal(4) // teacher column should be empty and therefore not 4, but 3
    expect(contentArray[0]).to.equal(newClassName)
    expect(contentArray[1]).to.equal(teacherLastname)
}

//Class creation page
async function isTitleOfCreateClassPage() {
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

 async function changeClassesTab() {
     await elementHelpers.clickAndWait(switchClassesTab)
 }

async function createNewClass(className) {
    await ADMNSTRTNAdministrationOverviewPage.clickAdministrateClasses()
    await isTitleOfAdministrationClassesPage()
    await clickCreateClassBtn()
    await isTitleOfCreateClassPage()
    await clickMoreOptionsBtn()
    await setClassName(className)
    await clickConfirmClassCreation()
}

async function editClass(newClassName) {
    await ADMNSTRTNManageClassPage.clickEditClassBtn()
    await ADMNSTRTNEditClassPage.changeSchoolYear()
    await setClassName(newClassName)
    await ADMNSTRTNEditClassPage.clickSafeChanges()
    await changeClassesTab()
}

module.exports = {
    isNewEmptyClassCreated,
    createNewClass,
    editClass,
    isClassEdited,
}
