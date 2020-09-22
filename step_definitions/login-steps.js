
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const DashboardPage = require('../page-objects/pages/DashboardPage');
const common = require('../shared_steps/common-steps.js');
const NavigationTopPage = require('../page-objects/pages/NavigationTopPage.js');

Then(
	/^dashboard should have the correct school$/, function () {
		return NavigationTopPage.checkSchoolname();
	});

Then(/^dashboard should have the correct name and profession$/, function () {
	return NavigationTopPage.checkFullUserInfo();
});

Then(/^dashboard should have the following tabs$/, async function (LoginTextLabels) {
	let subitems = await DashboardPage.getMenuItems();
	return DashboardPage.checkIfMenuItemsAreVisible(LoginTextLabels, subitems);
});

Then(/^a user should see a notification$/, function () {
	return loginPage.wrongLoginResult();
});
