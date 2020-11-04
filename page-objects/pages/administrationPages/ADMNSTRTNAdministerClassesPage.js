/*[url/administration/classes]*/
/*[url/administration/classes]/create*/

const elementHelpers = require("../../../runtime/helpers/elementHelpers")
const waitHelpers = require("../../../runtime/helpers/waitHelpers")
const ADMNSTRTNManageClassPage = require("./ADMNSTRTNManageClassPage")
const ADMNSTRTNEditClassPage = require("./ADMNSTRTNEditClassPage")

const addClassBtn = "a[data-testid='createClass']"
const moreOptionsBtn = "a[data-testid='classCreationExtraOptions']"
const classNameInput = "input[name='classsuffix']"
const customClassNameInput = "input[name='classcustom']"
const classGradeSelect = "select[name='grade']"
const schoolYearSelect = "select[name='schoolyear']"
const teachersMultiSelect = "select[name='teacherIds[]']"
const addClassConfirmBtn = "button[data-testId='confirmClassCreate']"
const classesTabs = "a.tab span"
const classListTable = "table [data-testid='students_names_container']"

//Administration: Classes
async function clickCreateClassBtn() {
    await elementHelpers.clickAndWait(addClassBtn)
}

async function isNewEmptyClassCreated(className, numOfStudents) {
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

    expect(contentArray.length).to.equal(4) // teacher is not empty and therefore not 3, but 4
    expect(contentArray[0]).to.equal(newClassName)
    expect(contentArray[1]).to.equal(teacherLastname)
}

//Class creation page
async function clickMoreOptionsBtn() {
    await elementHelpers.clickAndWait(moreOptionsBtn)
}

async function setClassName(className) {
    await waitHelpers.waitAndSetValue(classNameInput, className)
}

async function setCustomClassName(customClassName) {
    await waitHelpers.waitAndSetValue(customClassNameInput, customClassName)
}

async function setClassGrade(classGrade) {
    await elementHelpers.selectOptionByText(classGradeSelect, classGrade)
}

async function setSchoolYear(schoolYear) {
    await elementHelpers.selectOptionByText(schoolYearSelect, schoolYear)
}

async function setTeachers(listOfTeachers) {
    await elementHelpers.selectOptionByText(teachersMultiSelect, listOfTeachers)
}

async function clickAddClassConfirmation() {
    await elementHelpers.clickAndWait(addClassConfirmBtn)
}

 async function clickOnClassesTab(tabText) {
     const element = await elementHelpers.getElementByText(classesTabs, tabText);
     await elementHelpers.clickAndWait(element);
 }

async function createNewClass({schoolYear, teachers, classGrade, className, customClassName}) {
    await clickCreateClassBtn();
    await clickMoreOptionsBtn();
    if (schoolYear) await setSchoolYear(schoolYear);
    if (teachers) await setTeachers(teachers);
    if (classGrade) await setClassGrade(classGrade);
    if (className) await setClassName(className);
    if (customClassName) await setCustomClassName(customClassName);
    await clickAddClassConfirmation();
}

async function editClass({schoolYear, teachers, classGrade, className, customClassName}) {
    await ADMNSTRTNManageClassPage.clickEditClassBtn()
    if (schoolYear) await setSchoolYear(schoolYear);
    if (teachers) await setTeachers(teachers);
    if (classGrade) await setClassGrade(classGrade);
    if (className) await setClassName(className);
    if (customClassName) await setCustomClassName(customClassName);
    await ADMNSTRTNEditClassPage.clickSafeChanges()
}

module.exports = {
    isNewEmptyClassCreated,
    createNewClass,
    clickOnClassesTab,
    editClass,
    isClassEdited,
}
