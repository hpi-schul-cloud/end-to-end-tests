const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");

When(
	/^.*enters course name (.*) into search field$/,
	async function(courseName) {
		return courseListPage.setCourseNameIntoSearchInputField(courseName);
	}
);
Then(/^.*list satisfies the search request (.*)$/, async function(courseName) {
	let a = await courseListPage.getCountOfCoursesWhichTitlesContainTextForSection(courseName, courseListPage.section.allCourses);
	let b = await courseListPage.getCountOfDisplayedCoursesForSection(courseListPage.section.allCourses);
	await expect(a).to.equal(b);
});
