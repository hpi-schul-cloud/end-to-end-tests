
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const DashboardPage = require('../page-objects/pages/DashboardPage');
const common = require('../shared_steps/common-steps.js');
const NavigationTopPage = require('../page-objects/pages/NavigationTopPage.js');

Then(
	/^dashboard should have the correct school$/, function () {
		//return DashboardPage.loginSchool();
		return NavigationTopPage.checkSchoolname();
	});

Then(/^dashboard should have the correct school$/, function () {
	return DashboardPage.loginSchool();
});

Then(
	/^dashboard should have the correct name and profession$/, function () {
		return DashboardPage.loginFullUserInfo();
	});

Then(/^dashboard should have the following tabs$/, function (LoginTextLabels) {
	return DashboardPage.checkIfTabsAreVisible(LoginTextLabels, DashboardPage.getTabItems());
	//return DashboardPage.checkIfTabsAreVisible(LoginTextLabels, loginPage.loginTabs.loginTabs);
});


Then(/^a user should see a notification$/, function () {
	return loginPage.wrongLoginResult();
});
