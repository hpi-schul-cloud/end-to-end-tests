'use strict';

let teacherLogin = require('../page-objects/teacherLogin');
let loginData = require('../shared-objects/loginData');
let shared = ({loginData});
let page = ({teacherLogin});

Given(/^The teacher arrives on the Schul-Cloud homepage$/, function() {
  return helpers.loadPage(shared.loginData.url, 10);
});

When(/^the teacher puts in (.*) and (.*) and click the login-button$/, function(username, password) {
  /** use a method on the page object which also returns a promise */
  return page.teacherLogin.performLogin(username,password);
});

Then(/^the teacher should see their dashboard$/, function() {
  return page.teacherLogin.loginResult();
});

Then(/^the teacher-dashboard should look like it looked before for (.*)$/, function(username) {
  // let filename = `${username}_dashboard`;
  let filename = `dashboard`;
  return page.teacherLogin.compareScreenshots(filename);
});

