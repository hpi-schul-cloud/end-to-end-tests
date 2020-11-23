'use strict';

const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers.js');
const calendarPage = require('../../page-objects/pages/CLNDRCalendarPage');

When(/^.*clicks inside event table$/, async function () {
	await calendarPage.clickInsideCalendar();
});

When(/^.*clicks create event button$/, async function () {
	await calendarPage.clickCreateEventButton();
});

When(/^.*adds title '([^']*)' in calendar$/, async function (eventTitle) {
	await calendarPage.setEventTitle(eventTitle);
});

When(/^.*adds start date in calendar$/, async function () {
	//const getDate = dateTimeHelpers.getCurrentFormattedDateWithOffset({format: "dd.mm.yyyy hh:mm"});
	var startDate = (await dateTimeHelpers.getCurrentFormattedDateWithOffset({ format: 'dd.MM.yyyy hh:mm' }));
	await calendarPage.setEventPublishStartDate(startDate);
});

When(/^.*adds content '([^']*)' in calendar$/, async function (eventContent) {
	await calendarPage.setEventContent(eventContent);
});

Then(/^.* event with name '([^']*)' is displayed correctly on the list$/, async function (eventName) {
	await calendarPage.isCourseDisplayedCorrectlyInSection(eventName, courseListPage.section.activeCourses);
});
