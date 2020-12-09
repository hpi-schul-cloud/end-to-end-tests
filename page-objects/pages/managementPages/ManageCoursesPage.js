/*[url/administration/courses]*/ /*[url/administration/courses]*/
'use strict';

const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const teacherSelect = '#teacherId_chosen';
const courseNameContainer = "tbody[data-testid='students_names_container']";
const tableOfCoursesRows = courseNameContainer + ' > tr';
const courseNameCells = courseNameContainer + ' td:nth-child(1)';
const teacherNamesCells = courseNameContainer + ' td:nth-child(3)';
const editElements = courseNameContainer + ' i.fa-edit';

async function setTeacher(teacherUsername) {
	await elementHelpers.selectOptionByText(teacherSelect, teacherUsername);
}

async function clickEditCourseByNameBtn(courseName) {
	await waitHelpers.waitUntilElementIsVisible(tableOfCoursesRows);
	let coursesTable = await getCoursesDetailsList(courseNameCells);
	let editsElements = await elementHelpers.getListOfAllElements(editElements);
	for (let index = 0; index < coursesTable.length; index++) {
		if (coursesTable[index] === courseName) {
			await elementHelpers.clickAndWait(editsElements[index]);
			break;
		}
	}
}

// choose between name, class(es), teachers
async function getCoursesDetailsList(whichCell) {
	let names = await elementHelpers.getTextFromAllElements(whichCell);
	return names;
}

async function areTeacherNamesVisible(courseName, expectedTeacherNames) {
	await waitHelpers.waitUntilElementIsVisible(tableOfCoursesRows);
	let coursesNames = await getCoursesDetailsList(courseNameCells);
	let teacherNames = await getCoursesDetailsList(teacherNamesCells);
	let isTeacherNamesFound = false;
	let courseMsg = `Course with name: ${courseName} not found.`;
	let teacherNamesMsg = '';
	for (let index = 0; index < coursesNames.length; index++) {
		if (coursesNames[index] === courseName) {
			courseMsg = `Course with name: ${courseName} has teacher names. \n`;
			if (teacherNames[index] === expectedTeacherNames) {
				isTeacherNamesFound = true;
				teacherNamesMsg = 'TeacherNames '+expectedTeacherNames +' found';
			}
			else {
				teacherNamesMsg = 'Expected: '+ expectedTeacherNames + ', Actual: '+ teacherNames[index];
			}
		}
	}
	expect(isTeacherNamesFound, courseMsg + teacherNamesMsg).to.equal(true);
}

module.exports = {
	clickEditCourseByNameBtn,
	setTeacher,
	areTeacherNamesVisible,
};
