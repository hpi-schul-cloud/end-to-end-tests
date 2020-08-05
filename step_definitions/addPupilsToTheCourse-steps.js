const addCoursePage = require("../page-objects/pages/coursePages/CRSSAddCoursePage");
const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");

When(
	/^.*creates a course (.*) and adds student (.*)to this course$/, async function (courseName, studentName) {
		await addCoursePage.createCourseWithStudents(courseName, studentName);
	}
);

Then(
	/^.*sees that participants icon in course with name (.*) has correct number of members (.*)$/, async function (courseName, studentName) {
		await courseListPage.isCorrectNumberOfMembersInCourseForSection(courseName, [studentName], courseListPage.section.activeCourses);
	
	}
);

Then(
	/^.*clicks the participants icon in the course (.*) and sees the added student (.*) there$/, async function (courseName, studentName) {
		await courseListPage.areMembersOnTheListInCourseForSection(courseName, [studentName], courseListPage.section.activeCourses);
	}
);
