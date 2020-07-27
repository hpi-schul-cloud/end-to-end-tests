const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const searchCourse = require('../page-objects/searchCourse');
const courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');

Given(/^teacher goes to the login page$/, function() {
	return elementHelpers.loadPage(Login.url, 20);

});
Given(/^the teacher logs in/, async function() {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(Login.defaultTeacherUsername,Login.defaultTeacherpassword);
});
Given(/^the teacher goes to the courses page$/, function() {
	let url = courseData.urlCourses;
	return elementHelpers.loadPage(url, 20);
});
When(
	/^the teacher tipps the name (.*) of the course in the searchfield$/,
	async function(name) {
		return searchCourse.searchOne(name);
	}
);
Then(/^the list satisfies the search request (.*)$/, async function(name) {
	let a = await searchCourse.amountToBeDisplayed(name);
	let b = await searchCourse.isCorrectlyDisplayed();
	await expect(a).to.equal(b);
});
