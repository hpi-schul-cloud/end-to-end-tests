'use strict';

const TASKPage = require("../../page-objects/pages/TASKPage");
const TASKListPage = require("../../page-objects/pages/TASKListPage");
const path = require('path');
const { When } = require("@cucumber/cucumber");
const file = {
    path: path.join(__dirname, '../shared-objects/fileUpldFolder/upload.txt'),
    name: 'upload.txt'
};

When(/^.* teacher uploads file feedback$/, async function () {
    await TASKPage.submitFileFeedback(file);
});

When(/^.* goes to evaluation tab$/, async function () {
    await TASKPage.clickEvaluationTab();
});

When(/^.* clicks on student submitted the task$/, async function (){
    await TASKListPage.studentSubmittedTask();
});

//Then
Then(/^.* can see the file evaluation$/, async function () {
    await TASKPage.checkFileEvaluationTeacher(file)
});

Then(/^.* file evaluation is visible$/, async function () {
    await TASKPage.checkFileEvaluationStudent(file)
});

Then(/^.* sees that the task '([^']*)' is graded$/, async function(taskName){
    await TASKListPage.isTaskGraded(taskName);
});
