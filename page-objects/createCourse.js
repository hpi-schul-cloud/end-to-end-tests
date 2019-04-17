'use strict';

const createCourseData = require('../shared-objects/createCourseData'),
    imageCompare = require('../runtime/imageCompare'),
    shared = ({createCourseData});

let log = global.log;
let image;

module.exports = {

    clickSidebarCourseButton: async function() {
        //let button = await driver.$(shared.createCourseData.elem.courseButtonDashboard);
        await helpers.waitAndClick(shared.createCourseData.elem.courseButtonDashboard);
    },

    clickCreateCourseButton: async function() {
        await helpers.waitAndClick(shared.createCourseData.elem.createCourseButton);
    },

    clickSubmitCourseButton: async function() {
        await helpers.waitAndClick(shared.createCourseData.elem.submitCourseButton);
    },

    putCourseName: async function(coursename) {
        let nameField = await driver.$(shared.createCourseData.elem.courseNameField);
        await nameField.setValue(coursename);
    },

    createCourseResult: async function(coursename) {
        let courseElements = await driver.$$(shared.createCourseData.elem.courseScCardTitle);
        let courseNames = new Array(courseElements.length);
        let elem;
        let text;
        for(var i = 0; i<courseElements.length; i++){
             elem = await courseElements[i];
             text = await elem.getText();
             courseNames[i] = text;
        }
        expect(coursename).to.be.oneOf(courseNames);
    }


}