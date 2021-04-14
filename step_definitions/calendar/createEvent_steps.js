'use strict';

const dateTimeHelpers = require('../../runtime/helpers/dateTimeHelpers.js');
const calendarPage = require('../../page-objects/pages/CLNDRCalendarPage');
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');

When(/^.*clicks inside event table$/, async function () {
	await calendarPage.clickInsideCalendar();
});

When(/^.*clicks create event button$/, async function () {
	await calendarPage.clickCreateEventButton();
});

Then(/^.*can see the notification message$/, async function () {
	await calendarPage.checkNotificationMsg();
});

When(/^.*adds title '([^']*)' in calendar$/, async function (eventTitle) {
	await calendarPage.setEventTitle(eventTitle);
});

When(/^.*adds start date in calendar: today, 09:00$/, async function () {
	var startDate = (await dateTimeHelpers.getCurrentFormattedDateWithOffset({ format: 'dd/MM/yyyy' })) + ' 09:00';
	await calendarPage.setEventPublishStartDateTime(startDate);
});

When(/^.*adds end date in calendar: today .14 days, 08:00$/, async function () {
	var endDate = (await dateTimeHelpers.getCurrentFormattedDateWithOffset({ days: +14, format: 'dd/MM/yyyy' })) + ' 08:00';
	await calendarPage.setEventPublishEndDateTime(endDate);
});

When(/^.*adds content '([^']*)' in calendar$/, async function (eventContent) {
	await calendarPage.setEventContent(eventContent);
});

When(/^.*adds location '([^']*)' in calendar$/, async function (eventLocation) {
	await calendarPage.setEventLocation(eventLocation);
});

Then(/^.*should see monthly calendar$/, async function () {
	await waitHelpers.waitUntilPageTitleContains("Kalender");
});

Then(/^.*event with title '([^']*)' is displayed in the calendar$/, async function (eventTitle) {
	await calendarPage.isEventVisible(eventTitle, true);
});
