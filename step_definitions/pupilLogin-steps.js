'use strict';

let pupilLogin = require('../page-objects/pupilLogin');
let loginData = require('../shared-objects/loginData');
let performLogin = require('../page-objects/performLogin');
let shared = ({loginData, performLogin});
let page = ({pupilLogin});

Given(/^a pupil arrives on the Schul-Cloud login homepage$/, function () {
    return helpers.loadPage(shared.loginData.url, 10);
});

When(/^a pupil puts in (.*) and (.*) and clicks the login-button$/, function (username, password) {
    return shared.performLogin.performLogin(username,password);
});  

Then(/^a pupil should see the dashboard$/, function () {
    
    return page.pupilLogin.loginResult();
});

Then(/^the pupil-dashboard should look like it looked before for (.*)$/, function(username) {
    let filename = 'pupil-dashboard';
    return page.pupilLogin.compareScreenshots(filename);
  });