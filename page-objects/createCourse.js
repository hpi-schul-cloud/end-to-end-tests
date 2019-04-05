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
        expect(
            await helpers.getElementText(shared.createCourseData.elem.courseScCardTitle)).to.equal(coursename);
        
    }


}