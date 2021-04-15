/*[url/administration/classes[classId]/edit]*/
/*[url/administration/classes]/create*/

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const manageClassesPage = require('./ManageClassesPage');

const saveChangesBtn = 'div.modal-footer.mt-1  button';
const moreOptionsBtn = "a[data-testid='classCreationExtraOptions']";
const classNameInput = "input[name='classsuffix']";
const customClassNameInput = "input[name='classcustom']";
const classGradeSelect = "select[name='grade'] + div.chosen-container";
const schoolYearSelect = "select[name='schoolyear'] + div.chosen-container";
const teachersMultiSelect = "select[name='teacherIds[]'] + div.chosen-container";
const studentsMultiSelect = "select[name='userIds'] + div.chosen-container";
const addClassConfirmBtn = "button[data-testId='confirmClassCreate']";
const classListTable = "table [data-testid='students_names_container']";
const deleteClassBtn = '.table-actions .btn-delete';
const deleteButtonConfirmation = '.btn-submit';
const deleteNameStudent = "select[name='userIds'] + div.chosen-container  span";
const deleteStudentIcon = "select[name='userIds'] + div.chosen-container  a";
const deleteTeacherName = "select[name='teacherIds[]'] + div.chosen-container  span";
const deleteTeacherIcon = "select[name='teacherIds[]'] + div.chosen-container  a";

async function clickEditClassSaveChangesBtn() {
	await elementHelpers.clickAndWait(saveChangesBtn);
}

async function clickMoreOptionsBtn() {
	await elementHelpers.clickAndWait(moreOptionsBtn);
}

async function clickAddClassConfirmation() {
	await elementHelpers.clickAndWait(addClassConfirmBtn);
}

async function setClassName(className) {
	await waitHelpers.waitAndSetValue(classNameInput, className);
}

async function deleteStudentFromClass(studentName) {
	await waitHelpers.waitUntilAjaxIsFinished();
	let studentsNames = await elementHelpers.getListOfAllElements(deleteNameStudent);
	let deleteStudentIcons = await elementHelpers.getListOfAllElements(deleteStudentIcon);
	for (let index = 0; index <= studentsNames.length; index++) {
		let name = await elementHelpers.getElementText(studentsNames[index]);
		if (studentName === name) {
			await elementHelpers.clickAndWait(deleteStudentIcons[index]);
			break;
		}
	}
}

async function deleteTeacherFromClass(teacherName) {
	await waitHelpers.waitUntilAjaxIsFinished();
	let teachersNames = await elementHelpers.getListOfAllElements(deleteTeacherName);
	let deleteTeacherIcons = await elementHelpers.getListOfAllElements(deleteTeacherIcon);
	for (let index = 0; index <= teachersNames.length; index++) {
		let name = await elementHelpers.getElementText(teachersNames[index]);
		if (teacherName === name) {
			await elementHelpers.clickAndWait(deleteTeacherIcons[index]);
			break;
		}
	}
}

async function setCustomClassName(customClassName) {
	await waitHelpers.waitAndSetValue(customClassNameInput, customClassName);
}

async function setClassGrade(classGrade) {
	await elementHelpers.selectOptionsByText(classGradeSelect, classGrade);
}

async function setSchoolYear(schoolYear) {
	await elementHelpers.selectOptionsByText(schoolYearSelect, schoolYear);
}

async function setTeacher(name) {
	await waitHelpers.waitUntilAjaxIsFinished();
	await elementHelpers.selectOptionsByText(teachersMultiSelect, name);
}

async function setStudent(name) {
	await waitHelpers.waitUntilAjaxIsFinished();
	await elementHelpers.selectOptionsByText(studentsMultiSelect, name);
}

function createListOfStudents(numberOfStudents, firstname, lastname) {
	let listOfStudentNames = [];
	for (let studentNumber = 1; studentNumber <= numberOfStudents; studentNumber++) {
		listOfStudentNames.push(`${firstname}${studentNumber} ${lastname}${studentNumber}`);
	}
	return listOfStudentNames;
}

async function editClass({ schoolYear, teachers, classGrade, className, customClassName }) {
	await manageClassesPage.clickEditClassBtn();
	if (schoolYear) await setSchoolYear(schoolYear);
	if (teachers) await setTeacher(teachers);
	if (classGrade) await setClassGrade(classGrade);
	if (className) await setClassName(className);
	if (customClassName) await setCustomClassName(customClassName);
	await clickEditClassSaveChangesBtn();
}

async function createNewClass({ schoolYear, teachers, classGrade, className, customClassName }) {
	await manageClassesPage.clickCreateClassBtn();
	await clickMoreOptionsBtn();
	if (schoolYear) await setSchoolYear(schoolYear);
	if (teachers) await setTeachers(teachers);
	if (classGrade) await setClassGrade(classGrade);
	if (className) await setClassName(className);
	if (customClassName) await setCustomClassName(customClassName);
	await clickAddClassConfirmation();
}
async function isClassEdited(newClassName, teacherLastname, expectedResult) {
	if (!expectedResult) {
		try {
			const allClassesContainer = await waitHelpers.waitUntilElementIsVisible(classListTable);
			const allClassesContent = await allClassesContainer.getText();
			const contentArray = allClassesContent.split(' ');
			expect(contentArray[0]).not.to.equal(newClassName);
			expect(contentArray[1]).not.to.equal(teacherLastname);
		} catch (e) {
			return true;
		}
	} else {
		try {
			const allClassesContainer = await waitHelpers.waitUntilElementIsVisible(classListTable);
			const allClassesContent = await allClassesContainer.getText();
			const contentArray = allClassesContent.split(' ');
			expect(contentArray.length).to.equal(4); // teacher is not empty and therefore not 3, but 4
			expect(contentArray[0]).to.equal(newClassName);
			expect(contentArray[1]).to.equal(teacherLastname);
		} catch (e) {
			return false;
		}
	}
}
async function deleteClass() {
	await elementHelpers.click(deleteClassBtn);
	await elementHelpers.clickAndWait(deleteButtonConfirmation);
}

module.exports = {
	editClass,
	createNewClass,
	isClassEdited,
	deleteClass,
	setStudent,
	createListOfStudents,
	setTeacher,
	clickEditClassSaveChangesBtn,
	deleteStudentFromClass,
	deleteTeacherFromClass,
};
