'use strict';

const TASKPage = require("../../page-objects/pages/TASKPage");


//WHEN
When(/^.* clicks on Submission tab$/, async function () {
    await TASKPage.clickStudentSubmissionTab();
});

When(/^.* clicks on Submissions tab$/, async function () {
    await TASKPage.clickTeacherSubmissionsTab();
});

When(/^.* sets submission text '(.*)'$/, async function (submissionText) {
    await TASKPage.setTextSubmision(submissionText);
});

When(/^.* clicks Save-and-send submission button$/, async function () {
    await TASKPage.clickSaveAndSendSubmissionBtn();
});

When(/^.* clicks student submission contains '([^']*)'$/, async function (text) {
    await TASKPage.clickOnStudentSubmissionContains(text);
});

When(/^.* clicks on Comment tab$/, async function () {
    await TASKPage.clickCommentBtn();
});

When(/^.* grades task with rate '([^']*)'% and remarks '([^']*)'$/, async function (rating, gradingRemarks) {
    await TASKPage.gradeTask({rating: rating, gradingRemarks: gradingRemarks});
});

When(/^.* clicks Save-and-send grading button$/, async function () {
    await TASKPage.clickSaveAndSendGradingBtn();
});

When(/^.* clicks on Comment-Grading tab$/, async function () {
    await TASKPage.clickOnCommentGradingTab();
});

//THEN
Then(/^.* task rating is '([^']*)'%$/, async function (rating) {
    await TASKPage.isTaskRating(rating);
});

Then(/^.* task remark is '([^']*)'$/, async function (remark) {
    await TASKPage.isTaskRemark(remark);
});