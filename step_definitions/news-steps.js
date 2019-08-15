'use strict';
let news = require('../page-objects/news');
let teacherLogin = require('../page-objects/teacherLogin');
let copyCourse = require('../page-objects/copyCourse');
let courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');

Given(/^I am logged in as a teacher$/, function() {
  helpers.loadPage(courseData.url2, 20);
  return teacherLogin.performLogin(
    Login.deafultTeacherUsername,
    Login.defaultTeacherpassword
  );
});
Given(/^I create some news$/, function() {
  return news.performCreateNews();
});

When(/^a user who has permissions to see the news logs in$/, function() {
  return news.loginAsPupil();
});
When(/^he goes to the news page$/, function() {
  return news.gotoNews();
});
Then(/^he can see the news$/, function() {
  return news.verifyWhetherVisible();
});
