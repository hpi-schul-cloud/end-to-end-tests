const courseListPage = require('../page-objects/pages/coursePages/CRSSCourseListPage');

When(/^.*enters course name (.*) into search field$/, async function (courseName) {
	return courseListPage.setCourseNameIntoSearchInputField(courseName);
});

Then(/^.*list satisfies the search request (.*)$/, async function (courseName) {
	await courseListPage.isCorrectNumberOfDisplayedResults(courseListPage.section.allCourses);
});
