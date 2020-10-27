'use strict';

const courseListPage = require('../page-objects/pages/coursePages/CRSSCourseListPage');
const addCoursePage = require('../page-objects/pages/coursePages/CRSSAddCoursePage');
const { Then } = require('cucumber');

When(/^.*clicks create course button$/, async function () {
	await courseListPage.clickCreateCourseBtn();
});

When(/^.*creates a course '([^']*)'$/, async function (courseName) {
	coursename = courseName;
	await addCoursePage.setCourseName(courseName);
	await addCoursePage.goToNextSection();
});

When(/^.*adds student '([^']*)' to this course$/, async function (studentName) {
	await addCoursePage.setStudent(studentName);
});

Then(/^.*returns to course list page$/, async function () {
	await addCoursePage.clickCreateCourseAndContinueBtn();
	await addCoursePage.clickGoToCourseListBtn();
});

Then(/^.*sees that number of participants of the course '([^']*)' equals one$/, async function (courseName) {
	await courseListPage.isCountOfCourseMembers(courseName, 1, courseListPage.section.activeCourses);
});

When(
	/^.* clicks the participants icon in the course '([^']*)' and sees the added student '([^']*)' there$/,
	async function (courseName, studentName) {
		await courseListPage.areMembersOnTheListInCourseForSection(
			courseName,
			[studentName],
			courseListPage.section.activeCourses
		);

		await courseListPage.closeMemberModal();
	}
);

Then(/^student goes to course page$/, async function () {
	await courseListPage.goToCourses();
});

Then(/^the course '([^']*)' is visible for the student '([^']*)'$/, async function (courseName, studentName) {
	await courseListPage.isCourseVisible(courseName, courseListPage.section.activeCourses, true);
});
