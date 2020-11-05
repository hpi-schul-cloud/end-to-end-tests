const NavigationTopPage = require('../page-objects/pages/NavigationTopPage.js');

Then(/^.* school name is correct$/, function () {
	return NavigationTopPage.isSchoolNameCorrect();
});

Then(/^.* user name and role is correct$/, function () {
	return NavigationTopPage.isUserNameAndRoleCorrect();
});
