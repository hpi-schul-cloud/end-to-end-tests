const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");

When(
	/^.*enters course name (.*) into search field$/,
	async function(courseName) {
		return courseListPage.fillCourseNameIntoSearchInputField(courseName);
	}
);
Then(/^.*list satisfies the search request (.*)$/, async function(courseName) {
	let a = await courseListPage.countAllCoursesWhichTitlesContainText(courseName);
	let b = await courseListPage.countAllDisplayedCourses();
	await expect(a).to.equal(b);
});
