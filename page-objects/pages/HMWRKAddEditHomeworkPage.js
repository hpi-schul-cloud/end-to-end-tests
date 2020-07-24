/*[url/homework/new] | [url/homework/[homeworkId]/edit]*/
'use strict';
const waitHelpers = require('../runtime/helpers/waitHelpers.js');
const dateTimeHelpers = require('../runtime/helpers/dateTimeHelpers.js');
const courseData = require('../shared-objects/courseData');

module.exports = {
setPrivate: async function() {
    await waitHelpers.waitAndClick(courseData.elem.checkbox);
},
setHometaskText: async function() {
    await driver.pause(global.SHORT_WAIT_MILLIS);
    await driver.switchToFrame(0);
    let body = await driver.$('body');
    let message = 'Here is some TEXT!';
    await body.setValue(message);
    await driver.switchToParentFrame();
},
setAccomplishTime: async function() {
    var begin = await dateTimeHelpers.dateToString();
    await driver.execute(`document.querySelector("#availableDate").value="${begin}"`);
    var end = await dateTimeHelpers.randomDate();
    await driver.execute(`document.querySelector("#dueDate").value="${end}"`);
},
clickAdd: async function() {
    let container = await driver.$('#homework-form');
    let addBtn = await container.$('button[type="submit"]');
    await addBtn.click();
    let selectorToBeLoaded = await driver.$('#homeworks');
    await selectorToBeLoaded.waitForExist(2000);
},
}