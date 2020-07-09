'use strict';

const createCourse = require('../page-objects/createCourse');
const loginPage = require('../page-objects/pages/loginPage');
const startPage = require('../page-objects/pages/startPage');
const loginData = require('../shared-objects/loginData');
const shared = { loginData };
const Login = require('../shared-objects/loginData');

Given(/^The teacher arrives on the Schul-Cloud Page$/, function() {
	return helpers.loadPage(shared.loginData.url, 10);
});
Given(/^the teacher with email (.*) and (.*) is logged in successfully$/, async function(email, password) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(email, password);
});
When(/^the teacher goes to courses page$/, function() {
return createCourse.goToCourses()
});
Then(/^the teacher should see 2 buttons: import-course and create-course$/, function() {
	return createCourse.areSelectorsOnThePage();
});

When(/^teacher clicks create-a-course button$/, function() {
	return createCourse.clickCreateCourseBtn();
});

When(/^the teacher enters a (.*)$/, function(coursename) {
	return createCourse.setCourseName(coursename);
});
When(/^the teacher chooses a color (.*) of the course$/, function(colour) {
	return createCourse.setColour(colour);
});
When(/^the teacher clicks the create button$/, function() {
	return createCourse.goToNextSectionCreateCourse();
});
When(/^the teacher clicks to preview$/, function() {
return createCourse.goToNextSectionCreateCourse();
});
Then(/^the teacher sees the created course (.*)$/, async function(courseName) {
	return createCourse.verify(courseName);
});
Then(/^the teacher sees the created course$/, async function(courseName) {
	return createCourse.verify(courseName);
});
When(/^the teacher does not submit any course name and clicks weiter-button$/, async function() {
	return createCourse.goToNextSectionCreateCourse();

});
Then(/^the teacher cannot go to section 2$/, async function() {
	await expect(await createCourse.canProceedToStage(2)).to.equal(false);

});
Then(/^the name of the teacher who is creating is already filled in the teacher's field$/, async function() {
	await createCourse.theTeachersNameisSetAutomatically();

});
Then(/^time span is  already set$/, async function() {
	await createCourse.timeSpanIsSet();

});
Then(/^supply teacher is not set$/, async function() {
	await createCourse.supplyTeacherIsNotSet();

});

Then(/^the second screen is shown$/, async function() {
	await createCourse.nextScreenIsShown(2);

});
Then(/^no class is set$/, async function() {
	await createCourse.noClassIsSet();

});
Then(/^no students are set$/, async function() {
	await createCourse.noStudentsAreSet();

});
When(/^teacher clicks 'Kurs anlegen und Weiter'$/, async function() {
	await createCourse.clickCreateCourseAndNextBtn();
});

Then(/^btns "Einen weiteren Kurs anlegen" and "Zur Kursübersicht" are visible$/, async function() {
	await createCourse.btnsAreVisible();
});
Then(/^the third screen is shown$/, async function() {
	await createCourse.nextScreenIsShown(3);

});
Then(/^the teacher clicks zur-uebersicht-btn$/, async function() {
	await createCourse.goToCoursePreview();
});
Then(/^the name (.*) is displayed correctly$/, async function(courseName) {
	await createCourse.courseNameDisplayedCorrectly(courseName);
});
Then(/^the color of the course is the color (.*) that was selected during the creation process$/, async function(colour) {
	await createCourse.verifyColour(colour);
});

