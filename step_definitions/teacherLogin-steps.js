'use strict';

let teacherLogin = require('../page-objects/teacherLogin');
let loginData = require('../shared-objects/loginData');
let shared = { loginData };
let page = { teacherLogin };
const firstLogin = require('../shared_steps/firstLogin.js');

Given(/^The teacher arrives on the Schul-Cloud homepage$/, function() {
	return helpers.loadPage(shared.loginData.url, 10);
});

When(/^the teacher puts in (.*) and (.*) and click the login-button$/, function(
	username,
	password
) {
	/** use a method on the page object which also returns a promise */
	return page.teacherLogin.performLogin(username, password);
});

Then(/^the teacher should accept the data protection$/, function() {
	return firstLogin.firstLoginTeacher();
});

Then(
	/^the teacher-dashboard should have an icon with the teacher's initials$/,
	function() {
		return teacherLogin.loginResult();
	}
);
