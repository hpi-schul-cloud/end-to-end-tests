'use strict';

const createTaskData = require('../shared-objects/createTaskData'),
    imageCompare = require('../runtime/imageCompare'),
    shared = ({createTaskData});

let log = global.log;
let image;

module.exports = {

    clickSidebarTaskButton: async function(){
        await helpers.waitAndClick(shared.createTaskData.elem.sidebarTaskButton);
    },

    clickCreateTaskButton: async function(){
        await helpers.waitAndClick(shared.createTaskData.elem.createTaskButton);
    },

    clickSubmitTaskButton: async function() {
        await helpers.waitAndClick(shared.createTaskData.elem.submitTaskButton);
    },

    putTaskName: async function(taskName) {
        let nameField = await driver.$(shared.createTaskData.elem.taskNameField);
        await nameField.setValue(taskName);
    },

    createTaskResult: async function(taskName){
        let taskElements = await driver.$$(shared.createTaskData.elem.taskCardTitle);
        let taskNames = new Array(taskElements.length);
        let elem;
        let text;
        for(var i=0; i<taskElements.length; i++){
            elem = await taskElements[i];
            text = await elem.getText();
            taskNames[i] = text;
        }
        expect(taskName).to.be.oneOf(taskNames);
    }
}