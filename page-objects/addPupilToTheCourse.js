'use strict';

const createCourse = require('../page-objects/createCourse');
const copyCourse = require('../page-objects/copyCourse');

module.exports = {

	clickPupilIcon: async function() {
		const courses = await driver.$$(
			'#main-content > section > div.course-card > div.sectionsContainer > div > div.section.section-course.active > section > div > div > div'
		);
		await driver.pause(1000);
		let coursesLength = await courses.length;
		let lastCourseIndex = coursesLength - 1;
		let lastCourse = await courses[lastCourseIndex];
		let pupilIcon = await lastCourse.$('.btn-member');
		await pupilIcon.click();
		await driver.pause(500);
	},
	getNamesOfStudents: async function() {
		const elements = await driver.$$('#member-modal-body > ol > li');
		const namePromises = elements.map(async element => await element.getText());
		const memberNames = await Promise.all(namePromises);
		return memberNames;
	},

	verify: async function(courseName, studentName) {
		await createCourse.goToCourses();
		let elementOnThePage = await copyCourse.chooseCourseHelper(courseName);
		let sectionActiveCoursesSelector = await driver.$('div[data-section="js-active"]');
		let container = await sectionActiveCoursesSelector.$('div[data-testid="courses"]');
		let areThereStudentsInCourseContainer  = await container.$('.sc-card-wrapper.col-xl-3.col-lg-4.col-md-6.col-sm-12:nth-child('+elementOnThePage+') .additionalInfo .btn-member');
		let areThereStudentsInCourse = await areThereStudentsInCourseContainer.getText();
		let number = await parseInt(areThereStudentsInCourse);
		await expect(number).not.to.equal(0);
		await areThereStudentsInCourseContainer.click();
		await driver.pause(1000);
		let names = await this.getNamesOfStudents();
		await expect(names).to.include(studentName);
	}
};
