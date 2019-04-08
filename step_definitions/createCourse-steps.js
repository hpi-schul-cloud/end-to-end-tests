'use strict';

let createCourse = require('../page-objects/createCourse');
let loginData = require('../shared-objects/loginData');
let performLogin = require('../page-objects/performLogin');
let shared = ({loginData, performLogin});
let page = ({createCourse});

When(/^a teacher logs in his account using (.*) and (.*) in order to create a course$/, function (username, password) {
    helpers.loadPage(shared.loginData.url, 10);
    return shared.performLogin.performLogin(username, password);
  });

  Then(/^he should click the course-button in his dashboard-sidebar$/, function () {
    return page.createCourse.clickSidebarCourseButton();
  });

  Then(/^he should click the create-course-button on the course page$/, function () {
    return page.createCourse.clickCreateCourseButton();
  });

  Then(/^he should put the name (.*) into the name field$/, function (courseName) {
    return page.createCourse.putCourseName(courseName);
  });

  Then(/^he should click the create-course-button on the course-creating-form$/, function () {
    return page.createCourse.clickSubmitCourseButton();
  });

  Then(/^he should see the created course with the name (.*) on the course page$/, function (courseName) {
    return page.createCourse.createCourseResult(courseName);
  });