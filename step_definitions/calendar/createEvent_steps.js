'use strict';

const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers.js');
const calendarPage = require('../../page-objects/pages/CLNDRCalendarPage');

When(/^.*creates event with title '([^']*)', content '([^']*)' in calendar$/, async function (eventTitle, eventContent) {
	const getDate = dateTimeHelpers.getCurrentDateWithFormat();
	await calendarPage.createEvent({eventTitle: eventTitle, eventContent: eventContent, date: getDate});
});

Then(/^.* event with name '([^']*)' is displayed correctly on the list$/, async function (eventName) {
	await calendarPage.isCourseDisplayedCorrectlyInSection(eventName, courseListPage.section.activeCourses);
});
