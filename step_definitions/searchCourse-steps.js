let teacherLogin = require('../page-objects/teacherLogin');
let createCourse = require('../page-objects/createCourse');

let searchCourse = require('../page-objects/searchCourse');
let courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');

Given(/^teacher goes to the login page$/, function() {
  return helpers.loadPage(courseData.urlLogin, 20);
});
Given(/^the teacher logs in/, function() {
  return teacherLogin.performLogin(
    Login.deafultTeacherUsername,
    Login.defaultTeacherpassword
  );
});
Given(/^the teacher goes to the courses page$/, function() {
  return helpers.loadPage(courseData.url, 20);
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
