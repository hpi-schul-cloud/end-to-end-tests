/*[url/administration/classes]*/

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const tableHelpers = require('../../../runtime/helpers/tableHelpers');

const addClassBtn = "a[data-testid='createClass']";
const classesTabs = 'a.tab span';
const editClassBtn = "a[title='administration.classes.placeholer.change']";
const tableOfClasses = 'tbody[data-testid="students_names_container"] > tr';
//not needed anymore?
const classNameCell = '[data-testid="students_names_container"] td:nth-child(1)';
const classTeacherCell = 'tbody[data-testid="students_names_container"] td:nth-child(2)';
//not needed anymore?
const classMembersCell = '[data-testid="students_names_container"] td:nth-child(4)';
const editElements = '.table-actions i.fa-users';
//not needed anymore?
const classNameContainer = "tbody[data-testid='students_names_container']";
const classTable = 'table';

async function clickCreateClassBtn() {
	await elementHelpers.clickAndWait(addClassBtn);
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
	let indexColumn = await tableHelpers.getIndexOfHeaderContainsText(classTable, 'Schüler:innen');
	let numberOfStudents = await elementHelpers.getElementText(
		'tr:nth-child(' + (indexRow + 1) + ') > td:nth-child(' + (indexColumn + 1) + ')'
	);
	expect(numberOfMembers).to.equal(numberOfStudents);
}
// choose between className, teachers, students, schoolYear
async function getClassDetailsList(cell) {
	let names = await elementHelpers.getTextFromAllElements(cell);
	return names;
}

async function areTeacherNamesEmpty(className) {
	await waitHelpers.waitUntilElementIsVisible(tableOfClasses);
	let classesNames = await getClassDetailsList(classNameCell);
	let teacherNames = await getClassDetailsList(classTeacherCell);
	let isTeacherNamesEmpty = false;
	let classMsg = `Class with name: ${className} not found.`;
	let teacherNamesMsg = '';
	for (let index = 0; index < classesNames.length; index++) {
		if (classesNames[index] === className) {
			classMsg = `Class with name: ${className} found. \n`;
			teacherNamesMsg = 'Expected: "", Actual: "' + teacherNames[index] + '"';
			if (teacherNames[index] === '') {
				isTeacherNamesEmpty = true;
				teacherNamesMsg = 'TeacherNames is empty (that´s right)';
			}
		}
	}
	expect(isTeacherNamesEmpty, classMsg + teacherNamesMsg).to.equal(true);
}

async function isTeacherAssigned(teacherName) {
	const teacherCell = await getClassDetailsList(classTeacherCell);
	if (teacherCell[0] === '') {
		expect(teacherCell[0]).to.equal('');
	} else {
		expect(teacherCell[0]).to.equal(teacherName);
	}
}

module.exports = {
	clickCreateClassBtn,
	clickEditClassBtn,
	clickOnClassesTab,
	clickManagmentClassByNameBtn,
	isNumberOfMembersInClass,
	isTeacherAssigned,
	areTeacherNamesEmpty,
};
