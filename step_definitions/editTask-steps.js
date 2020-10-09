"use strict";

const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');
const homeworkListPage = require('../page-objects/pages/HMWRKHomeworkListPage.js');
const homeworkPage = require('../page-objects/pages/HMWRKHomeworkPage.js');
const editHomeworkPage = require('../page-objects/pages/HMWRKAddEditHomeworkPage.js');

const { Then } = require('cucumber');
const { expect } = require('chai');


Then(/^he should click the edit-task-button$/, async function(){
   await homeworkListPage.clickEditTaskButton();
});

Then(/^he should change the taskname to (.*) in the name field$/, async function(taskname)
{
    await editHomeworkPage.setHomeworkName(taskname);
});

Then(/^he should change the taskbody to (.*) in the taskbody field$/,async function(taskbody){
    
    await editHomeworkPage.setHomeworkText(taskbody);

});

Then(/^he should change the course to Keine Zuordnung in the dropdown$/,async function(){
    await editHomeworkPage.selectCourse();
});

Then(/^he should toggle the allow groupwork checkbox$/,async function(){
    await editHomeworkPage.clickTeamSubmissionsCheckbox();
});

Then(/^he should change the begin and due date$/,async function(){
    await editHomeworkPage.setAccomplishTime();
});

Then(/^he should toggle the private task checkbox$/,async function(){
    await editHomeworkPage.clickPrivateHomeworkCheckbox();
});

Then(/^he should toggle the public submissions checkbox$/,async function(){
    await editHomeworkPage.clickPublicSubmissionsCheckbox();
});

Then(/^he should save the changes by clicking on the save-button$/,async function(){
    await editHomeworkPage.clickSubmitHomeworkBtn();
});

Then(/^he goes to the tasks page$/,async function() {
	await navigationLeftPage.clickNavItemTasks();
});

Then (/^he checks if the new taskname is (.*)$/, async function(taskname){
    let tasks = await editHomeworkPage.getTaskNames();
    await expect(taskname).to.be.oneOf(tasks);
});


Then (/^he checks if the new taskbody is (.*)$/, async function(taskbody){
    let descriptions = await homeworkListPage.getDescription();
    
    await expect(descriptions.some(x => x.includes(taskbody))).to.be.true;

});
