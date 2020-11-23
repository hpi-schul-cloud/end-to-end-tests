/*[url/calendar]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const addEventBtn = '#calendar td.fc-day';
const submitNewsBtn = 'div.modal.fade.create-event-modal.in button.btn-submit';
const titleField = 'div.modal.fade.create-event-modal.in [data-testid="team_event_name"]';
const contentField = 'div.modal.fade.create-event-modal.in textarea';
const dateTimeStartSelector = 'div.modal.fade.create-event-modal.in div:nth-child(3) [data-testid="form-datetime-input-startDate"]';
//const dateTimeStartSelector = '[data-testid="form-datetime-input-startDate"]';
const dateTimeEndSelector = '[data-testid="form-datetime-input-endDate"]';

async function clickInsideCalendar () {
    await elementHelpers.clickAndWait(addEventBtn);
}

async function setEventTitle (eventTitle) {
    await waitHelpers.waitAndSetValue(titleField, eventTitle);
}

async function setEventPublishStartDate (eventStartDate) {
    await waitHelpers.waitAndSetValue(dateTimeStartSelector, eventStartDate);
}

async function setEventPublishStartTime (eventStartTime) {
    await waitHelpers.waitAndSetValue(dateTimeStartSelector, eventStartTime);
}

async function setEventContent (eventContent) {
    await elementHelpers.click(contentField);
    await waitHelpers.waitAndSetValue(contentField, eventContent);
}

async function clickCreateEventButton () {
    await elementHelpers.clickAndWait(submitNewsBtn);
}

async function createEvent ({ eventTitle, eventContent, date, time}) {
    await clickInsideCalendar();
    if (eventTitle) await setEventTitle(eventTitle);
    if (date) await setEventPublishStartDate(date);
    //if (time) await setEventPublishStartTime(time);
    if (eventContent) await setEventContent(eventContent);
    await clickCreateEventButton();
}

module.exports = {
    createEvent,
}