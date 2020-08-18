'use strict';
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const DashboardPage = require('../page-objects/pages/DashboardPage');
const common = require('../shared_steps/common-steps.js');

When(/^an admin puts in (.*) and (.*) and click the login-button$/, async function(username,password) {
	await startPage.clickLoginBtn();
	await  loginPage.performLogin(username, password);
});

Then(
	/^the user is supposed to accept the data protection agreement$/,
	function() {
		return firstLogin.firstLoginAdmin();
	}
);

Then(
	/^the admin-dashboard should have the admin initials$/,
	function() {
		return loginPage.loginResult();
	}
);

Then(
	/^the admin-dashboard should have the correct school$/,
	function() {
		return DashboardPage.loginSchool();
	}
);

Then(
	/^the admin-dashboard should have the admin name and profession$/,
	function() {
		return DashboardPage.loginFullUserInfo();
	}
);

Then(/^the admin-dashboard should have the following tabs$/, function (LoginTextLabels) {
    return DashboardPage.checkIfTabsAreVisible(LoginTextLabels, loginPage.loginTabs.loginTabs);
	}
);
