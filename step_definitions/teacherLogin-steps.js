'use strict';

let teacherLogin = require('../page-objects/teacherLogin');
let loginData = require('../shared-objects/loginData');

let shared = ({loginData});
let page = ({teacherLogin});


Given(/^The user arrives on the Schul-Cloud homepage$/, function() {
  return helpers.loadPage(shared.loginData.url, 10);
});

When(/^they put in (.*) and (.*) and click the login-button$/, function(username, password) {
  /** use a method on the page object which also returns a promise */
  return page.teacherLogin.performLogin(username,password);
});

Then(/^they should see their dashboard$/, function() {
  /** return the promise of an element to the following then */
  return page.teacherLogin.loginResult();
});
