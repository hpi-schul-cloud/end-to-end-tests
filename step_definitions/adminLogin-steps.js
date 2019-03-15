'use strict';

let adminLogin = require('../page-objects/adminLogin');
let loginData = require('../shared-objects/loginData');
let shared = ({loginData});
let page = ({adminLogin});

Given(/^an admin arrives on the Schul-Cloud login homepage$/, function () {
    return helpers.loadPage(shared.loginData.url, 10);
});

When(/^an admin puts in (.*) and (.*) and click the login-button$/, function (username, password) {
    return page.adminLogin.performLogin(username,password);
});  

Then(/^an admin should see my dashboard$/, function () {
    
    return page.adminLogin.loginResult();
});

Then(/^the admin-dashboard should look like it looked before for (.*)$/, function(username) {
    let filename = 'dashboard';
    return page.adminLogin.compareScreenshots(filename);
  });