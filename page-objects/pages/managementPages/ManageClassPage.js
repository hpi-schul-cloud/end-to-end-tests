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
	await elementHelpers.selectOptionByText(classGradeSelect, classGrade);
}

async function setSchoolYear(schoolYear) {
	await elementHelpers.selectOptionByText(schoolYearSelect, schoolYear);
}

async function setTeacher(name) {
	await waitHelpers.waitUntilAjaxIsFinished();
	await elementHelpers.selectOptionByText(teachersMultiSelect, name);
}

async function setStudent(name) {
	await waitHelpers.waitUntilAjaxIsFinished();
	await elementHelpers.selectOptionByText(studentsMultiSelect, name);
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

async function isNewEmptyClassCreated(className, numOfStudents) {
	const allClassesContainer = await waitHelpers.waitUntilElementIsVisible(classListTable);
	const allClassesContent = await allClassesContainer.getText();
	const contentArray = allClassesContent.split(' ');
	const currentYear = new Date().getFullYear().toString().substring(2); // 20

	expect(contentArray.length).to.equal(3); // teacher column should be empty and therefore not 4, but 3
	expect(contentArray[0], 'Classname').to.equal(className);
	expect(contentArray[1].includes(currentYear), 'Year').to.equal(true);
	expect(contentArray[2], 'Num of students').to.equal(numOfStudents);
}

async function isNewClassCreated(className, numOfStudents) {
	const allClassesContainer = await waitHelpers.waitUntilElementIsVisible(classListTable);
	const allClassesContent = await allClassesContainer.getText();
	const contentArray = allClassesContent.split('\n');

	expect(contentArray[0], 'Classname').to.include(className);
	expect(contentArray[0], 'Num Of students').to.include(numOfStudents);
}

module.exports = {
	editClass,
	createNewClass,
	isClassEdited,
	isNewEmptyClassCreated,
	isNewClassCreated,
	deleteClass,
	setStudent,
	setTeacher,
	clickEditClassSaveChangesBtn,
	deleteStudentFromClass,
	deleteTeacherFromClass,
};
