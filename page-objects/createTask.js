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
    goToTasks: async function() {
        let url = "http://localhost:3100/homework";
        await helpers.loadPage(url, 100);
        let selectorToBeLoaded = await driver.$('.col-xl-12');
        await selectorToBeLoaded.waitForExist(3000);

    },

    createTaskResult: async function(taskName){
        await this.goToTasks();
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
    },
    getTaskNames: async function() {
        let container = await driver.$('.col-xl-12');
        let tasksArray = await container.$$('li');
        const namesArray=[];
        for (var i=1; i<=tasksArray.length; i++) {
            let task = await container.$('li:nth-child('+i+') > a:nth-child(1)');
            let taskName = (await task.getAttribute('title')).replace("Details der Aufgabe: '", '').replace(/'$/gi, '');
            await namesArray.push(taskName);
        }
        return namesArray;
    }
}
