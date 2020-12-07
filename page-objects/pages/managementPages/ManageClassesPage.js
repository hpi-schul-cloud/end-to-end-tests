/*[url/administration/classes]*/

const elementHelpers = require("../../../runtime/helpers/elementHelpers")
const waitHelpers = require('../../../runtime/helpers/waitHelpers');

const addClassBtn = "a[data-testid='createClass']"
const classesTabs = "a.tab span"
const editClassBtn = "a[title='administration.classes.placeholer.change']"
const tableOfClasses = 'tbody[data-testid="students_names_container"] > tr';
const classNameCell = '[data-testid="students_names_container"] td:nth-child(1)';
const classMembersCell = '[data-testid="students_names_container"] td:nth-child(4)';
const editElements = '.table-actions i.fa-users';
const classNameContainer = "tbody[data-testid='students_names_container']";

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
	let classesTable = await getClassDetailsList(classNameCell);
	let editsElements = await elementHelpers.getListOfAllElements(editElements);
	for (let index = 1; index <= classesTable.length; index++) {
		let classNamePromise = await driver.$('tr:nth-child('+ index +') > td:nth-child(1)');
        let classItem = await classNamePromise.getText();
		if (classItem === className) {
			await elementHelpers.clickAndWait(editsElements[index-1]);
			break;
		}
    }
}

async function checkMembersInClass(className, numberOfMembers) {
	await waitHelpers.waitUntilElementIsVisible(tableOfClasses);
	let classesTable = await getClassDetailsList(classNameCell);
	for (let index = 1; index <= classesTable.length; index++) {
		let classNamePromise = await driver.$('tr:nth-child('+ index +') > td:nth-child(1)');
        let classItem = await classNamePromise.getText();
		if (classItem === className) {
			let numberOfStudents = await elementHelpers.getElementText('tr:nth-child('+ index +') > td:nth-child(4)');
            expect(numberOfMembers).to.equal(numberOfStudents)
			break;
		}
    }
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
    checkMembersInClass
}
