'use strict';

const roomsOverview = require('../page-objects/pages/RoomsOverviewPage');

When(/^.* goes to all-courses$/, async function () {
	await roomsOverview.goToallCourses()
});
