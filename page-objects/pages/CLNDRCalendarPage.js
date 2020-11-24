/*[url/calendar]*/
'use strict';
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const addEventBtn = '#calendar td.fc-day';
const submitEventBtn = 'div.modal.fade.create-event-modal.in button.btn-submit';
const titleField = 'div.modal.fade.create-event-modal.in [data-testid="team_event_name"]';
const contentField = 'div.modal.fade.create-event-modal.in textarea';
const locationField = 'div.modal.fade.create-event-modal.in [data-testid="team_event_location"]';
const eventTitleContainer = '#calendar span.fc-title';

async function clickInsideCalendar () {
    await elementHelpers.clickAndWait(addEventBtn);
}

async function checkNotificationMsg () {
    await waitHelpers.waitUntilElementAttributeEquals("Füllen  dieses Feld aus.");
    //await element.getAttribute("Füllen  dieses Feld aus.")
}

async function setEventTitle (eventTitle) {
    await waitHelpers.waitAndSetValue(titleField, eventTitle);
}

async function setEventPublishStartDateTime (eventStartDateTime) {
    await driver.execute(`document.querySelector("div.modal.fade.create-event-modal.in div:nth-child(3) [data-testid='form-datetime-input-startDate']").value="${eventStartDateTime}"`);
}

async function setEventPublishEndDateTime (eventEndDateTime) {
    await driver.execute(`document.querySelector("div.modal.fade.create-event-modal.in div:nth-child(3) [data-testid='form-datetime-input-endDate']").value="${eventEndDateTime}"`);
}

async function setEventContent (eventContent) {
    await elementHelpers.click(contentField);
    await waitHelpers.waitAndSetValue(contentField, eventContent);
}

async function setEventLocation (eventLocation) {
    await elementHelpers.click(locationField);
    await waitHelpers.waitAndSetValue(locationField, eventLocation);
}

async function clickCreateEventButton () {
    await elementHelpers.clickAndWait(submitEventBtn);
}

async function getListOfEventTitles () {
    await waitHelpers.waitUntilElementIsNotVisible(".loaded #MathJax_Message");
    return elementHelpers.getTextFromAllElements(eventTitleContainer);
}

async function isEventVisible (eventTitle, expectedValue) {
    const allEvents = await getListOfEventTitles();
    const isEventOnList = allEvents.some((element) => element.includes(eventTitle));
    const fillString = !expectedValue ? 'not' : '';
	const msg = `Event with name is ${fillString} visible on the list: \n`;
	const resultMsg = 'Expected: ' + eventTitle + ', Actual: ' + allEvents;

	await expect(isEventOnList, msg + resultMsg).to.equal(expectedValue)
}

module.exports = {
    clickInsideCalendar,
    checkNotificationMsg,
    clickCreateEventButton,
    setEventTitle,
    setEventPublishStartDateTime,
    setEventPublishEndDateTime,
    setEventContent,
    setEventLocation,
    isEventVisible,
}
