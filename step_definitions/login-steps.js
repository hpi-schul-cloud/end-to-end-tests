const NavigationTopPage = require('../page-objects/pages/NavigationTopPage.js');

Then(/^dashboard should have the correct school$/, function () {
	return NavigationTopPage.isSchoolNameCorrect();
});

Then(/^dashboard should have the correct name and profession$/, function () {
	return NavigationTopPage.isUserNameAndRoleCorrect();
});
