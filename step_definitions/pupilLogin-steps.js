'use strict';

let pupilLogin = require('../page-objects/pupilLogin');
let loginData = require('../shared-objects/loginData');
let shared = ({loginData});
let page = ({pupilLogin});

Given(/^a pupil arrives on the Schul-Cloud login homepage$/, function () {
    return helpers.loadPage(shared.loginData.url, 10);
});

When(/^a pupil puts in (.*) and (.*) and clicks the login-button$/, function (username, password) {
    return page.pupilLogin.performLogin(username,password);
});  

Then(/^a pupil should see the dashboard$/, function () {
    
    return page.pupilLogin.loginResult();
});

Then(/^the pupil-dashboard should look like it looked before for (.*)$/, function(username) {
    let filename = 'dashboard';
    return page.pupilLogin.compareScreenshots(filename);
  });