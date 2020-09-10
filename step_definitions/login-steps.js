
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const DashboardPage = require('../page-objects/pages/DashboardPage');
const common = require('../shared_steps/common-steps.js');
const NavigationTopPage = require('../page-objects/pages/NavigationTopPage.js');

Then(
	/^the admin-dashboard should have the correct school$/, function () {
		//return DashboardPage.loginSchool();
		return NavigationTopPage.checkSchoolname();
	});

Then(
	/^the admin-dashboard should have the admin name and profession$/, function () {
		//return DashboardPage.loginInitials();
		//TODO:	Was the same as checkInitials - new to implement:return NavigationTopPage.checkNameAndProfession();
	});

Then(/^the admin-dashboard should have the following tabs$/, function (LoginTextLabels) {
	return DashboardPage.checkIfTabsAreVisible(LoginTextLabels, DashboardPage.getTabItems());
});


Then(/^a user should see a notification$/, function () {
	return loginPage.wrongLoginResult();
});

