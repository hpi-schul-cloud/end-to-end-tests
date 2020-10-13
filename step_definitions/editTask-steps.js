"use strict";

const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');
const homeworkListPage = require('../page-objects/pages/HMWRKHomeworkListPage.js');
const homeworkPage = require('../page-objects/pages/HMWRKHomeworkPage.js');
const editHomeworkPage = require('../page-objects/pages/HMWRKAddEditHomeworkPage.js');

Then(/^.* should click the edit-task-button$/, async function(){
   await homeworkListPage.clickEditTaskButton();
});

Then(/^.* should change the taskname to (.*) in the name field$/, async function(taskname)
{
    await editHomeworkPage.setHomeworkName(taskname);
});

Then(/^.* should change the taskbody to (.*) in the taskbody field$/,async function(taskbody){
    
    await editHomeworkPage.setHomeworkText(taskbody);

});

Then(/^.* should change the course to Keine Zuordnung in the dropdown$/,async function(){
    await editHomeworkPage.selectCourse();
});

Then(/^.* should toggle the allow groupwork checkbox$/,async function(){
    await editHomeworkPage.clickTeamSubmissionsCheckbox();
});

Then(/^.* should change the begin and due date$/,async function(){
    await editHomeworkPage.setAccomplishTime();
});

Then(/^.* should toggle the private task checkbox$/,async function(){
    await editHomeworkPage.clickPrivateHomeworkCheckbox();
});

Then(/^.* should toggle the public submissions checkbox$/,async function(){
    await editHomeworkPage.clickPublicSubmissionsCheckbox();
});

Then(/^.* should save the changes by clicking on the save-button$/,async function(){
    await editHomeworkPage.clickSubmitHomeworkBtn();
});

Then(/^.* goes to the tasks page$/,async function() {
	await navigationLeftPage.clickNavItemTasks();
});

Then(/^.* checks if the new taskname is (.*)$/, async function(taskname){
    let tasks = await editHomeworkPage.getTaskNames();
    await expect(taskname).to.be.oneOf(tasks);
});


Then(/^.* checks if the new taskbody is (.*)$/, async function(taskbody){
    let descriptions = await homeworkListPage.getDescription();
    
    await expect(descriptions.some(x => x.includes(taskbody))).to.be.true;

});
