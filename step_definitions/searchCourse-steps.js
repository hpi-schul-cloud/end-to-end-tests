const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");
const { countDisplayedCoursesForSection } = require("../page-objects/pages/coursePages/CRSSCourseListPage");

When(
	/^.*enters course name (.*) into search field$/,
	async function(courseName) {
		return courseListPage.fillCourseNameIntoSearchInputField(courseName);
	}
);
Then(/^.*list satisfies the search request (.*)$/, async function(courseName) {
	let a = await courseListPage.countCoursesWhichTitlesContainTextInSection(courseName, courseListPage.section.allCourses);
	let b = await courseListPage.countDisplayedCoursesForSection(courseListPage.section.allCourses);
	await expect(a).to.equal(b);
});
