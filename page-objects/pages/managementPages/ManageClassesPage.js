/*[url/administration/classes]*/

const elementHelpers = require("../../../runtime/helpers/elementHelpers")
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const tableHelpers = require('../../../runtime/helpers/tableHelpers');

const addClassBtn = "a[data-testid='createClass']"
const classesTabs = "a.tab span"
const editClassBtn = "a[title='administration.classes.placeholer.change']"
const tableOfClasses = 'tbody[data-testid="students_names_container"] > tr';
const editElements = '.table-actions i.fa-users';
const classTable = 'table';

async function clickCreateClassBtn() {
    await elementHelpers.clickAndWait(addClassBtn)
}

async function clickEditClassBtn() {
    await elementHelpers.clickAndWait(editClassBtn);
}

 async function clickOnClassesTab(tabText) {
    const element = await elementHelpers.getElementByText(classesTabs, tabText);
     await elementHelpers.clickAndWait(element);
 }

 async function clickManagmentClassByNameBtn(className) {
	await waitHelpers.waitUntilElementIsVisible(tableOfClasses);
	let editsElements = await elementHelpers.getListOfAllElements(editElements);
	let indexNameRow = await tableHelpers.getIndexOfRowContainsText(classTable, className);
	await elementHelpers.clickAndWait(editsElements[indexNameRow]);
}

async function isNumberOfMembersInClass(className, numberOfMembers) {
	await waitHelpers.waitUntilElementIsVisible(tableOfClasses);
	let indexRow = await tableHelpers.getIndexOfRowContainsText(classTable, className);
	let indexColumn = await tableHelpers.getIndexOfHeaderContainsText(classTable, 'Schüler');
	let numberOfStudents = await elementHelpers.getElementText('tr:nth-child('+ (indexRow+1) +') > td:nth-child('+ (indexColumn+1) +')');
    expect(numberOfMembers).to.equal(numberOfStudents)
}
    // choose between className, teachers, students, schoolYear
 async function getClassDetailsList(cell) {
	let names = await elementHelpers.getTextFromAllElements(cell);
	return names;
}



module.exports = {
    clickCreateClassBtn,
    clickEditClassBtn,
    clickOnClassesTab,
    clickManagmentClassByNameBtn,
    isNumberOfMembersInClass
}
