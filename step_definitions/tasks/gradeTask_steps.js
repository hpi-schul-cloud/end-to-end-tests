'use strict';

const TASKPage = require("../../page-objects/pages/TASKPage");

const path = require('path');
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

//THEN
When(/^.* can see the file evaluation$/, async function () {
    await TASKPage.checkFileEvaluationTeacher(file)
});

When(/^.* file evaluation is visible$/, async function () {
    await TASKPage.checkFileEvaluationStudent(file)
});