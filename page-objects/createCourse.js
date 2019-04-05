'use strict';

const createCourseData = require('../shared-objects/createCourseData'),
    imageCompare = require('../runtime/imageCompare'),
    shared = ({createCourseData});

let log = global.log;
let image;

module.exports = {

    performLogin: async function (username, password) {
        image = username; 

        let loginSel = await driver.$(shared.createCourseData.elem.usernameInput);
        await loginSel.setValue(username);

        let passwordSel = await driver.$(shared.createCourseData.elem.passwordInput);
        await passwordSel.setValue(password);

        let loginBtnSel = await driver.$(shared.createCourseData.elem.loginBtn);
        await loginBtnSel.click();

    },

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