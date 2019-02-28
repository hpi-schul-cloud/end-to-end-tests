'use strict';

let adminLogin = require('../page-objects/adminLogin');
let loginData = require('../shared-objects/loginData');
let shared = ({loginData});
let page = ({adminLogin});

Given(/^I arrive on the Schul-Cloud login homepage$/, function () {
    return helpers.loadPage(shared.loginData.url, 10);
});

When(/^I put in (.*) and (.*) and click the login-button$/, function (username, password) {
    return page.adminLogin.performLogin(username,password);
});  

Then(/^I should see my dashboard$/, function () {
    
    return page.adminLogin.loginResult();
});

Then(/^the admin-dashboard should look like it looked before for (.*)$/, function(username) {
    let filename = 'dashboard';
    return page.adminLogin.compareScreenshots(filename);
  });